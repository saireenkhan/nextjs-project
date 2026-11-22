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
import { authorizedRequest } from "@/utils/api";

import "../../css/Pages.css";

const Candidate2 = () => {
  const [candidatesList, setCandidatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Status Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // ==========================================================
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
      const result = await authorizedRequest(
        "/candidates/committee"
      );

      const data = Array.isArray(result)
        ? result
        : result?.success
        ? result.data || []
        : [];

      setCandidatesList(data);
    } catch (error) {
      console.error(
        "Failed to fetch Committee candidates:",
        error
      );

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
      const result = await authorizedRequest(
        `/candidates/${CURRENT_PANEL}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (result.success) {
        alert("Candidate added successfully!");

        setIsModalOpen(false);

        await loadCandidates();
      } else {
        alert(
          "Error saving candidate: " +
            (result.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error(
        "Candidate submission error:",
        error
      );

      alert(
        error?.message ||
          "Failed to connect to server."
      );
    }
  };

  // ==========================================================
  // VIEW CANDIDATE PDF
  // ==========================================================

  const handleViewCandidate = (id) => {
    window.open(
      `http://localhost:5002/api/candidates/${id}/pdf`,
      "_blank"
    );
  };

  // ==========================================================
  // FILTER & SEARCH LOGIC
  // ==========================================================

  const filteredCandidates = candidatesList.filter((item) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      (item.candidateName &&
        item.candidateName
          .toLowerCase()
          .includes(search)) ||
      (item.candidateId &&
        item.candidateId
          .toLowerCase()
          .includes(search)) ||
      (item.position &&
        item.position
          .toLowerCase()
          .includes(search)) ||
      (item.election &&
        item.election
          .toLowerCase()
          .includes(search));

    const matchesStatus =
      selectedStatusFilter === "All" ||
      (item.status &&
        item.status.toLowerCase() ===
          selectedStatusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // ==========================================================
  // PAGE UI
  // ==========================================================

  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">

          {/* Header Row with Trigger Button */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: "16px",
              gap: "20px",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <PageHeader title="Candidate Management" />
            </div>

            <button
              type="button"
              className="btn-add-staff"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} />
              Add Candidate
            </button>
          </div>

          {/* Information Box */}

          <div className="donation-info-box">
            Committee panel: Add candidate profiles, assign
            them to elections and track voting performance
            with vote counts and percentages. These records
            are automatically visible in the Admin master
            panel.
          </div>

          {/* Search & Status Filters */}

          <div className="filters-row">
            <div
              className="search-box"
              style={{
                position: "relative",
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "12px",
                  color: "#555",
                }}
              />

              <input
                type="text"
                placeholder="Search Candidate ID, Name, Position..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                style={{
                  paddingLeft: "40px",
                }}
              />
            </div>

            <select
              className="filter-select"
              value={selectedStatusFilter}
              onChange={(e) =>
                setSelectedStatusFilter(e.target.value)
              }
            >
              <option value="All">All Statuses</option>
              <option value="Nominated">
                Nominated
              </option>
              <option value="Leading">
                Leading
              </option>
              <option value="Winner">
                Winner
              </option>
              <option value="Disqualified">
                Disqualified
              </option>
            </select>
          </div>

          {/* Candidates Table */}

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
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  Loading database records...
                </td>
              </tr>
            ) : filteredCandidates.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No candidate records found.
                </td>
              </tr>
            ) : (
              filteredCandidates.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    {item.id || index + 1}
                  </td>

                  <td>
                    <strong>
                      {item.candidateId || "-"}
                    </strong>
                  </td>

                  <td>
                    {item.candidateName || "-"}
                  </td>

                  <td>
                    {item.position || "-"}
                  </td>

                  <td>
                    {item.election || "-"}
                  </td>

                  <td>
                    {item.totalVotes ?? 0}
                  </td>

                  <td>
                    {item.votePercentage || "0%"}
                  </td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Winner"
                            ? "#dcfce7"
                            : item.status ===
                              "Leading"
                            ? "#dbeafe"
                            : item.status ===
                              "Disqualified"
                            ? "#fee2e2"
                            : "#fef3c7",
                        color:
                          item.status === "Winner"
                            ? "#166534"
                            : item.status ===
                              "Leading"
                            ? "#1d4ed8"
                            : item.status ===
                              "Disqualified"
                            ? "#991b1b"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.status || "Nominated"}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        handleViewCandidate(item._id)
                      }
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
        <AddClassForm
          fields={CandidatesFormSchema}
          onSubmit={handleAddCandidate}
        />
      </ModalWrapper>
    </div>
  );
};

export default Candidate2;