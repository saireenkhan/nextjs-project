"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarCommittee from "../../../components/SidebarCommittee";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { ComplaintsFormSchema } from "@/Data/DataCommittee";
import { authorizedRequest } from "@/utils/api";

import "../../css/Pages.css";

const Complaints = () => {
  const [complaintsList, setComplaintsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Status Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // ==========================================================
  // Committee panel identifier
  // ==========================================================

  const CURRENT_PANEL = "committee";

  // ==========================================================
  // LOAD COMMITTEE COMPLAINTS
  // ==========================================================

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    setLoading(true);

    try {
      // authorizedRequest automatically sends the auth token
      const result = await authorizedRequest(
        "/complaints/committee"
      );

      const data = Array.isArray(result)
        ? result
        : result?.success
        ? result.data || []
        : [];

      setComplaintsList(data);
    } catch (error) {
      console.error(
        "Failed to fetch Committee complaints:",
        error
      );

      setComplaintsList([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // REGISTER COMMITTEE COMPLAINT
  // ==========================================================

  const handleAddComplaint = async (formData) => {
    const payload = {
      complaintId:
        formData?.complaintId ||
        formData?.["Complaint ID"] ||
        `CMP-${Math.floor(1000 + Math.random() * 9000)}`,

      personType:
        formData?.personType ||
        formData?.["Person Type"] ||
        "Member",

      personName:
        formData?.personName ||
        formData?.["Person Name"] ||
        "",

      category:
        formData?.category ||
        formData?.["Category"] ||
        "General",

      priority:
        formData?.priority ||
        formData?.["Priority"] ||
        "Medium",

      status:
        formData?.status ||
        formData?.["Status"] ||
        "Pending",

      assignedTo:
        formData?.assignedTo ||
        formData?.["Assigned To"] ||
        "Unassigned",

      description:
        formData?.description ||
        formData?.["Description"] ||
        "",
    };

    try {
      // authorizedRequest automatically attaches Bearer token
      const result = await authorizedRequest(
        `/complaints/${CURRENT_PANEL}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (result?.success) {
        alert("Complaint registered successfully!");

        setIsModalOpen(false);

        // Refresh complaint list
        loadComplaints();
      } else {
        alert(
          "Error saving complaint: " +
            (result?.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error(
        "Complaint submission error:",
        error
      );

      alert(
        error?.message ||
          "Failed to connect to server."
      );
    }
  };

  // ==========================================================
  // VIEW COMPLAINT PDF
  // ==========================================================

  const handleViewComplaint = (id) => {
    window.open(
      `http://localhost:5000/api/complaints/${id}/pdf`,
      "_blank"
    );
  };

  // ==========================================================
  // FILTER & SEARCH
  // ==========================================================

  const filteredComplaints = complaintsList.filter(
    (item) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        !searchQuery ||
        (item.personName &&
          item.personName
            .toLowerCase()
            .includes(query)) ||
        (item.complaintId &&
          item.complaintId
            .toLowerCase()
            .includes(query)) ||
        (item.category &&
          item.category
            .toLowerCase()
            .includes(query));

      const matchesStatus =
        selectedStatusFilter === "All" ||
        (item.status &&
          item.status.toLowerCase() ===
            selectedStatusFilter.toLowerCase());

      return matchesSearch && matchesStatus;
    }
  );

  // ==========================================================
  // PAGE UI
  // ==========================================================

  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">

          {/* ==================================================
              HEADER ROW
          ================================================== */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
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
              <PageHeader
                title="Committee Panel - Complaint System"
              />
            </div>

            <button
              type="button"
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
                flexShrink: 0,
              }}
            >
              <Plus size={18} />
              Submit Complaint
            </button>
          </div>

          {/* ==================================================
              INFORMATION BOX
          ================================================== */}

          <div className="donation-info-box">
            Committee panel: Submit complaints with status,
            evidence and admin comments. These records are
            automatically visible in the Admin master panel.
          </div>

          {/* ==================================================
              SEARCH & STATUS FILTERS
          ================================================== */}

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
                placeholder="Search Complaint ID, Name or Category..."
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
              <option value="All">
                All Statuses
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>

          {/* ==================================================
              COMPLAINT TABLE
          ================================================== */}

          <DataTable
            headers={[
              "#",
              "Complaint ID",
              "Person Type",
              "Person Name",
              "Category",
              "Priority",
              "Status",
              "Assigned To",
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
            ) : filteredComplaints.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No complaint records found.
                </td>
              </tr>
            ) : (
              filteredComplaints.map(
                (item, index) => (
                  <tr
                    key={
                      item._id || index
                    }
                  >
                    {/* # */}
                    <td>
                      {item.id ||
                        index + 1}
                    </td>

                    {/* Complaint ID */}
                    <td>
                      <strong>
                        {item.complaintId ||
                          "-"}
                      </strong>
                    </td>

                    {/* Person Type */}
                    <td>
                      {item.personType ||
                        "-"}
                    </td>

                    {/* Person Name */}
                    <td>
                      {item.personName ||
                        "-"}
                    </td>

                    {/* Category */}
                    <td>
                      {item.category ||
                        "-"}
                    </td>

                    {/* Priority */}
                    <td>
                      {item.priority ||
                        "-"}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        style={{
                          padding:
                            "4px 10px",
                          borderRadius:
                            "20px",

                          background:
                            item.status ===
                            "Resolved"
                              ? "#dcfce7"
                              : item.status ===
                                "In Progress"
                              ? "#dbeafe"
                              : item.status ===
                                "Rejected"
                              ? "#fee2e2"
                              : "#fef3c7",

                          color:
                            item.status ===
                            "Resolved"
                              ? "#166534"
                              : item.status ===
                                "In Progress"
                              ? "#1d4ed8"
                              : item.status ===
                                "Rejected"
                              ? "#991b1b"
                              : "#92400e",

                          fontSize:
                            "12px",

                          fontWeight:
                            "600",
                        }}
                      >
                        {item.status ||
                          "Pending"}
                      </span>
                    </td>

                    {/* Assigned To */}
                    <td>
                      {item.assignedTo ||
                        "-"}
                    </td>

                    {/* Action */}
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          handleViewComplaint(
                            item._id
                          )
                        }
                        style={{
                          display:
                            "inline-flex",
                          alignItems:
                            "center",
                          gap: "6px",
                          background:
                            "#f3f4f6",
                          border:
                            "1px solid #d1d5db",
                          padding:
                            "6px 12px",
                          borderRadius:
                            "6px",
                          cursor:
                            "pointer",
                          color:
                            "#dc2626",
                          fontWeight:
                            "600",
                        }}
                      >
                        <FileText
                          size={14}
                        />
                        View
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </DataTable>
        </div>
      </div>

      {/* ======================================================
          ADD COMPLAINT MODAL
      ====================================================== */}

      <ModalWrapper
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        title="Submit New Complaint"
      >
        <AddClassForm
          fields={ComplaintsFormSchema}
          onSubmit={
            handleAddComplaint
          }
        />
      </ModalWrapper>
    </div>
  );
};

export default Complaints;