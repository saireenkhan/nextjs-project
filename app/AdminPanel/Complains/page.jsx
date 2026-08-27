"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { ComplaintsFormSchema } from "@/Data/Data";
import { fetchComplaints, createComplaint } from "@/utils/api";

import "../../css/Pages.css";

const Complains = () => {
  const [complaintsList, setComplaintsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Status Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    setLoading(true);
    const data = await fetchComplaints();
    setComplaintsList(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleAddComplaint = async (formData) => {
    const payload = {
      complaintId: formData?.complaintId || formData?.["Complaint ID"] || `CMP-${Math.floor(100 + Math.random() * 900)}`,
      personName: formData?.personName || formData?.["Person Name"] || formData?.["Person"] || "",
      category: formData?.category || formData?.["Category"] || "General",
      priority: formData?.priority || formData?.["Priority"] || "Medium",
      status: formData?.status || formData?.["Status"] || "Pending",
      assignedTo: formData?.assignedTo || formData?.["Assigned To"] || "Admin",
    };

    const result = await createComplaint(payload);
    if (result && result.success) {
      alert("Complaint added successfully!");
      setIsModalOpen(false);
      loadComplaints();
    } else {
      alert("Error saving complaint: " + (result?.error || "Unknown error"));
    }
  };

  const handleDownloadPdf = (id) => {
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
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Trigger Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px" }}>
            <PageHeader title="Complaint System" />

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
                fontSize: "14px"
              }}
            >
              <Plus size={18} /> Add New Complaint
            </button>
          </div>

          <div className="donation-info-box">
            Admin can view Committee, Moazzin and Muqtadi complaints. Submit complaints with status, evidence and admin comments.
          </div>

          {/* Search & Status Filters */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Complaint ID, Person or Category..." 
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
            </select>
          </div>

          <DataTable
            headers={[
              "#",
              "Complaint ID",
              "Person",
              "Category",
              "Priority",
              "Status",
              "Assigned To",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
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
                            : "#fef3c7",
                        color:
                          item.status === "Resolved"
                            ? "#166534"
                            : item.status === "In Progress"
                            ? "#1d4ed8"
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

      {/* Modal Wrapper for Dynamic Form Submission */}
      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Complaint"
      >
        <AddClassForm fields={ComplaintsFormSchema} onSubmit={handleAddComplaint} />
      </ModalWrapper>
    </div>
  );
};

export default Complains;