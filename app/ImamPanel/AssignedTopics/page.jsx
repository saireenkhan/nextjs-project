"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";

import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { AssignedTopicsFormSchema } from "@/Data/Data-Imam.jsx";
import { fetchAssignedTopics, createAssignedTopic } from "@/utils/api";

import "../../css/Pages.css";
import SidebarImam from "../../../components/SidebarImam";

const AssignedTopics = () => {
  const [topicsList, setTopicsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Complaint Status Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    setLoading(true);
    const data = await fetchAssignedTopics();
    setTopicsList(Array.isArray(data) ? data : []);
    setLoading(false);
  };

const handleAddTopicRecord = async (formData) => {
    const payload = {
      imamId: formData?.imamId || formData?.["Imam ID"] || `IMM-${Math.floor(1000 + Math.random() * 9000)}`,
      imamName: formData?.imamName || formData?.["Imam Name"] || "",
      assignedEvent: formData?.assignedEvent || formData?.["Assigned Event"] || "General Khutba",
      // Map whichever key name the form schema provides into the backend's "assignedTopic" property
      assignedTopic: formData?.assignedTopic || formData?.["Assigned Topic"] || formData?.["Topic"] || "",
      preparationStatus: formData?.preparationStatus || formData?.["Preparation Status"] || "In Progress",
      complaintStatus: formData?.complaintStatus || formData?.["Complaint Status"] || "Pending",
    };

    const result = await createAssignedTopic(payload);
    if (result && result.success) {
      alert("Assigned topic record added successfully!");
      setIsModalOpen(false);
      loadTopics();
    } else {
      alert("Error saving record: " + (result?.error || "Unknown error"));
    }
  };
  // Filter & Search Logic
  const filteredTopics = topicsList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.imamName && item.imamName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.imamId && item.imamId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.assignedTopic && item.assignedTopic.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      selectedStatusFilter === "All" || 
      (item.complaintStatus && item.complaintStatus.toLowerCase() === selectedStatusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="campus-layout">
      <SidebarImam />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Trigger Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px" }}>
            <PageHeader title="Imam Portal" />

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
                whiteSpace: "nowrap", // Prevents text squishing/wrapping
                flexShrink: 0         // Stops flexbox from collapsing the button
              }}
            >
              <Plus size={18} /> Add Topic / Request
            </button>
          </div>

          <div className="donation-info-box">
            Imam can view assigned topics from Admin and submit complaints or requests. These complaints show in Admin portal.
          </div>

          {/* Search & Status Filters */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Imam ID, Name or Topic..." 
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
              <option value="All">All Complaint Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <DataTable
            headers={[
              "#",
              "Imam ID",
              "Imam Name",
              "Assigned Event",
              "Assigned Topic",
              "Preparation Status",
              "Complaint Status",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredTopics.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No assigned topic records found.
                </td>
              </tr>
            ) : (
              filteredTopics.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.id || index + 1}</td>

                  <td>
                    <strong>{item.imamId}</strong>
                  </td>

                  <td>{item.imamName}</td>

                  <td>{item.assignedEvent}</td>

                  <td>{item.assignedTopic}</td>

                  <td>{item.preparationStatus}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.complaintStatus === "Resolved"
                            ? "#dcfce7"
                            : item.complaintStatus === "Pending"
                            ? "#fef3c7"
                            : "#dbeafe",
                        color:
                          item.complaintStatus === "Resolved"
                            ? "#166534"
                            : item.complaintStatus === "Pending"
                            ? "#92400e"
                            : "#1d4ed8",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.complaintStatus}
                    </span>
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
        title="Add Assigned Topic / Request"
      >
        <AddClassForm fields={AssignedTopicsFormSchema} onSubmit={handleAddTopicRecord} />
      </ModalWrapper>
    </div>
  );
};

export default AssignedTopics;