"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarCommittee from "../../../components/SidebarCommittee";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { CandidatesFormSchema } from "@/Data/DataCommittee";

import "../../css/Pages.css";

const Candidate2 = () => {
  const [candidatesList, setCandidatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Status Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // ==========================================================
  // IMPORTANT
  // Committee panel identifier
  // ==========================================================

  const CURRENT_PANEL = "committee";

  useEffect(() => {
    loadCandidates();
  }, []);

  // ==========================================================
  // LOAD ONLY COMMITTEE CANDIDATES
  // ==========================================================

  const loadCandidates = async () => {
    setLoading(true);

    try {

      // IMPORTANT:
      // The backend scopes candidates by PATH, not a query param:
      //   GET /api/candidates/committee -> only Committee-added
      //   GET /api/candidates/admin     -> all candidates
      //
      // There is no GET /api/candidates (no root route), so calling
      // that would 404 and return an HTML page instead of JSON.

      const response = await fetch(
        `http://localhost:5000/api/candidates/${CURRENT_PANEL}`
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Candidates API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Candidates API returned ${response.status} (non-JSON response). Check candidateRoutes.js.`
        );

      }

      const result = await response.json();

      const data =
        result?.data ||
        (Array.isArray(result) ? result : []);

      setCandidatesList(data);

    } catch (error) {

      console.error("Failed to fetch Committee candidates:", error);

      setCandidatesList([]);

    } finally {

      setLoading(false);

    }
  };

  // ==========================================================
  // ADD COMMITTEE CANDIDATE
  // ==========================================================

  const handleAddCandidate = async (formData) => {

    const payload = {

      // NOTE:
      // We do NOT send a "source" field here. The backend sets
      // it automatically based on which endpoint we POST to
      // (/api/candidates/committee marks the record as
      // Committee-added).

      candidateId:
        formData?.candidateId ||
        formData?.["Candidate ID"] ||
        `CND-${Math.floor(1000 + Math.random() * 9000)}`,

      candidateName:
        formData?.candidateName ||
        formData?.["Candidate Name"] ||
        "",

      position:
        formData?.position ||
        formData?.["Position"] ||
        "Member",

      election:
        formData?.election ||
        formData?.["Election"] ||
        "General Election",

      totalVotes: Number(
        formData?.totalVotes ||
        formData?.["Total Votes"] ||
        0
      ),

      votePercentage:
        formData?.votePercentage ||
        formData?.["Vote %"] ||
        formData?.["Vote Percentage"] ||
        "0%",

      status:
        formData?.status ||
        formData?.["Status"] ||
        "Nominated",
    };

    try {

      const response = await fetch(
        `http://localhost:5000/api/candidates/${CURRENT_PANEL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Candidates API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Candidates API returned ${response.status} (non-JSON response). Check candidateRoutes.js.`
        );

      }

      const result = await response.json();

      if (result.success) {

        alert("Candidate added successfully!");

        setIsModalOpen(false);

        loadCandidates();

      } else {

        alert("Error saving candidate: " + (result.error || "Unknown error"));

      }

    } catch (error) {

      console.error("Candidate submission error:", error);

      alert("Failed to connect to server.");

    }
  };

  const handleViewCandidate = (id) => {
    // NOTE: unified onto the one PDF/export route the backend
    // actually exposes — there is no separate "/profile" route.
    window.open(`http://localhost:5000/api/candidates/${id}/pdf`, "_blank");
  };

  // Filter & Search Logic
  const filteredCandidates = candidatesList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.candidateName && item.candidateName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.candidateId && item.candidateId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.position && item.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.election && item.election.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      selectedStatusFilter === "All" || 
      (item.status && item.status.toLowerCase() === selectedStatusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Trigger Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px" }}>
            <PageHeader title="Committee Panel - Candidate Management" />

            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#10b981",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              <Plus size={18} /> Add Candidate
            </button>
          </div>

          <div className="donation-info-box">
            Committee panel: Add candidate profiles, assign them to
            elections and track voting performance with vote counts
            and percentages. These records are automatically visible
            in the Admin master panel.
          </div>

          {/* Search & Status Filters */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Candidate ID, Name, Position..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            <select 
              className="filter-select"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Nominated">Nominated</option>
              <option value="Leading">Leading</option>
              <option value="Winner">Winner</option>
              <option value="Disqualified">Disqualified</option>
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
                  No candidate records found.
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
                          item.status === "Winner"
                            ? "#dcfce7"
                            : item.status === "Leading"
                            ? "#dbeafe"
                            : item.status === "Disqualified"
                            ? "#fee2e2"
                            : "#fef3c7",
                        color:
                          item.status === "Winner"
                            ? "#166534"
                            : item.status === "Leading"
                            ? "#1d4ed8"
                            : item.status === "Disqualified"
                            ? "#991b1b"
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
                      onClick={() => handleViewCandidate(item._id)}
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

      {/* Modal Wrapper for Form */}
      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add Candidate Profile"
      >
        <AddClassForm fields={CandidatesFormSchema} onSubmit={handleAddCandidate} />
      </ModalWrapper>
    </div>
  );
};

export default Candidate2;