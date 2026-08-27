"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { VotersFormSchema } from "@/Data/Data";
import { fetchVoters, createVoter } from "@/utils/api";

import "../../css/Pages.css";

const Voters = () => {
  const [votersList, setVotersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  useEffect(() => {
    loadVoters();
  }, []);

  const loadVoters = async () => {
    setLoading(true);
    const data = await fetchVoters();
    setVotersList(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleAddVoter = async (formData) => {
    console.log("Raw Voter Form Data Received:", formData);

    const payload = {
      voterId: formData?.voterId || formData?.["Voter ID"] || `VOT-${Math.floor(100 + Math.random() * 900)}`,
      voterName: formData?.voterName || formData?.["Voter Name"] || "Unnamed Voter",
      cnic: formData?.cnic || formData?.["CNIC"] || "",
      verificationMethod: formData?.verificationMethod || formData?.["Verification Method"] || "CNIC",
      votingStatus: formData?.votingStatus || formData?.["Voting Status"] || "Eligible",
    };

    console.log("Processed Voter Payload Sent to Database:", payload);

    const result = await createVoter(payload);
    if (result && result.success) {
      alert("Voter registered successfully!");
      setIsModalOpen(false);
      loadVoters();
    } else {
      alert("Error saving voter: " + (result?.error || "Unknown error"));
    }
  };

  const handleDownloadPdf = (id) => {
    window.open(`http://localhost:5000/api/voters/${id}/pdf`, "_blank");
  };

  // Filtering and Searching Logic
  const filteredVoters = votersList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.voterName && item.voterName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.voterId && item.voterId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.cnic && item.cnic.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      selectedStatusFilter === "All" || 
      (item.votingStatus && item.votingStatus.toLowerCase() === selectedStatusFilter.toLowerCase());

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
            <PageHeader title="Voter Management" />

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
              <Plus size={18} /> Register New Voter
            </button>
          </div>

          <div className="donation-info-box">
            Register voters, assign unique voter IDs using CNIC, phone or email and prevent duplicate votes.
          </div>

          {/* ================= SEARCH & FILTERS ROW ================= */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Voter ID, Name or CNIC..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            {/* Voting Status Filter */}
            <select 
              className="filter-select"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            >
              <option value="All">All Voting Statuses</option>
              <option value="Eligible">Eligible</option>
              <option value="Voted">Voted</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <DataTable
            headers={[
              "#",
              "Voter ID",
              "Voter Name",
              "CNIC",
              "Verification",
              "Voting Status",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredVoters.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No matching voter records found in database.
                </td>
              </tr>
            ) : (
              filteredVoters.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.id || index + 1}</td>

                  <td>
                    <strong>{item.voterId}</strong>
                  </td>

                  <td>{item.voterName}</td>

                  <td>{item.cnic}</td>

                  <td>{item.verificationMethod}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.votingStatus === "Voted"
                            ? "#dcfce7"
                            : item.votingStatus === "Eligible"
                            ? "#dbeafe"
                            : "#fef3c7",
                        color:
                          item.votingStatus === "Voted"
                            ? "#166534"
                            : item.votingStatus === "Eligible"
                            ? "#1d4ed8"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.votingStatus}
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
        title="Register New Voter"
      >
        <AddClassForm fields={VotersFormSchema} onSubmit={handleAddVoter} />
      </ModalWrapper>
    </div>
  );
};

export default Voters;