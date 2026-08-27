"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { CandidatesFormSchema } from "@/Data/Data";
import { fetchCandidates, createCandidate } from "@/utils/api";

import "../../css/Pages.css";

const Candidates = () => {
  const [candidatesList, setCandidatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    setLoading(true);
    const data = await fetchCandidates();
    setCandidatesList(Array.isArray(data) ? data : []);
    setLoading(false);
  };
const handleAddCandidate = async (formData) => {
  const payload = {
    candidateId: formData?.candidateId || formData?.["Candidate ID"] || `CAND-${Math.floor(100 + Math.random() * 900)}`,
    candidateName: formData?.candidateName || formData?.["Candidate Name"] || "",
    position: formData?.position || formData?.["Position"] || "Member",
    election: formData?.election || formData?.["Election"] || "General Election",
    totalVotes: Number(formData?.totalVotes || formData?.["Total Votes"] || 0),
    
    // --> ENSURE THIS LINE PROPERLY READS THE FIELD FROM THE FORM DATA <--
    votePercentage: formData?.votePercentage || formData?.["Vote %"] || formData?.["Vote Percentage"] || "0%",
    
    status: formData?.status || formData?.["Status"] || "Active",
  };

  const result = await createCandidate(payload);
  if (result && result.success) {
    alert("Candidate added successfully!");
    setIsModalOpen(false);
    loadCandidates(); // Refresh list from database
  } else {
    alert("Error saving candidate: " + (result?.error || "Unknown error"));
  }
};
  const handleDownloadPdf = (id) => {
    window.open(`http://localhost:5000/api/candidates/${id}/pdf`, "_blank");
  };

  // Filtering and Searching Logic
  const filteredCandidates = candidatesList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.candidateName && item.candidateName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.candidateId && item.candidateId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.position && item.position.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      selectedStatusFilter === "All" || 
      (item.status && item.status.toLowerCase() === selectedStatusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Right-End Trigger Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px" }}>
            <PageHeader title="Candidate Management" />

            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--primary-color, #10b981)",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <Plus size={18} /> Add New Candidate
            </button>
          </div>

          <div className="donation-info-box">
            Add candidate profiles, assign them to election type and show results per candidate.
          </div>

          {/* ================= SEARCH & FILTERS ROW ================= */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Candidate ID, Name or Position..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            {/* Status Filter */}
            <select 
              className="filter-select"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Leading">Leading</option>
              <option value="Active">Active</option>
              <option value="Nominated">Nominated</option>
            </select>
          </div>

          <DataTable
            headers={[
              "#",
              "Candidate ID",
              "Candidate Name",
              "Position",
              "Election",
              "Total Votes",
              "Vote %",
              "Status",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No matching candidate records found in database.
                </td>
              </tr>
            ) : (
              filteredCandidates.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.id || index + 1}</td>

                  <td>
                    <strong>{item.candidateId}</strong>
                  </td>

                  <td>{item.candidateName}</td>

                  <td>{item.position}</td>

                  <td>{item.election}</td>

                  <td>{item.totalVotes}</td>

                  <td>{item.votePercentage}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Leading"
                            ? "#dcfce7"
                            : item.status === "Active"
                            ? "#dbeafe"
                            : "#fef3c7",
                        color:
                          item.status === "Leading"
                            ? "#166534"
                            : item.status === "Active"
                            ? "#1d4ed8"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(item._id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#f3f4f6",
                        border: "1px solid #d1d5db",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: "#dc2626",
                        fontWeight: "600",
                      }}
                    >
                      <FileText size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </DataTable>
        </div>
      </div>

      {/* Modal Wrapper Containing Form */}
      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Candidate"
      >
        <AddClassForm fields={CandidatesFormSchema} onSubmit={handleAddCandidate} />
      </ModalWrapper>
    </div>
  );
};

export default Candidates;