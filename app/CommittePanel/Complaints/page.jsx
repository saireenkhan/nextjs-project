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

import "../../css/Pages.css";

const Complaints = () => {
  const [complaintsList, setComplaintsList] = useState([]);
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
    loadComplaints();
  }, []);

  // ==========================================================
  // LOAD ONLY COMMITTEE COMPLAINTS
  // ==========================================================

  const loadComplaints = async () => {
    setLoading(true);

    try {

      // IMPORTANT:
      // The backend scopes complaints by PATH, not a query param:
      //   GET /api/complaints/committee -> only Committee-filed
      //   GET /api/complaints/admin     -> all complaints
      //
      // There is no GET /api/complaints (no root route), so calling
      // that would 404 and return an HTML page instead of JSON.

      const response = await fetch(
        `http://localhost:5000/api/complaints/${CURRENT_PANEL}`
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Complaints API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Complaints API returned ${response.status} (non-JSON response). Check complaintRoutes.js.`
        );

      }

      const result = await response.json();

      const data =
        result?.data ||
        (Array.isArray(result) ? result : []);

      setComplaintsList(data);

    } catch (error) {

      console.error("Failed to fetch Committee complaints:", error);

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

      // NOTE:
      // We do NOT send a "source" field here. The backend sets
      // it automatically based on which endpoint we POST to
      // (/api/complaints/committee marks the record as
      // Committee-filed).

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

      const response = await fetch(
        `http://localhost:5000/api/complaints/${CURRENT_PANEL}`,
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
          "Complaints API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Complaints API returned ${response.status} (non-JSON response). Check complaintRoutes.js.`
        );

      }

      const result = await response.json();

      if (result.success) {

        alert("Complaint registered successfully!");

        setIsModalOpen(false);

        loadComplaints();

      } else {

        alert("Error saving complaint: " + (result.error || "Unknown error"));

      }

    } catch (error) {

      console.error("Complaint submission error:", error);

      alert("Failed to connect to server.");

    }
  };

  const handleViewComplaint = (id) => {
    // NOTE: unified onto the one PDF/report route the backend
    // actually exposes — there is no separate "/detail" route.
    window.open(`http://localhost:5000/api/complaints/${id}/pdf`, "_blank");
  };

  // Filter & Search Logic
  const filteredComplaints = complaintsList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.personName && item.personName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.complaintId && item.complaintId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

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
            <PageHeader title="Committee Panel - Complaint System" />

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
              <Plus size={18} /> Submit Complaint
            </button>
          </div>

          <div className="donation-info-box">
            Committee panel: Submit complaints with status, evidence
            and admin comments. These records are automatically
            visible in the Admin master panel.
          </div>

          {/* Search & Status Filters */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Complaint ID, Name or Category..." 
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
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

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
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No complaint records found.
                </td>
              </tr>
            ) : (
              filteredComplaints.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.id || index + 1}</td>

                  <td>
                    <strong>{item.complaintId}</strong>
                  </td>

                  <td>{item.personType}</td>

                  <td>{item.personName}</td>

                  <td>{item.category}</td>

                  <td>{item.priority}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Resolved"
                            ? "#dcfce7"
                            : item.status === "In Progress"
                            ? "#dbeafe"
                            : item.status === "Rejected"
                            ? "#fee2e2"
                            : "#fef3c7",
                        color:
                          item.status === "Resolved"
                            ? "#166534"
                            : item.status === "In Progress"
                            ? "#1d4ed8"
                            : item.status === "Rejected"
                            ? "#991b1b"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.assignedTo}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleViewComplaint(item._id)}
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
        title="Submit New Complaint"
      >
        <AddClassForm fields={ComplaintsFormSchema} onSubmit={handleAddComplaint} />
      </ModalWrapper>
    </div>
  );
};

export default Complaints;