"use client";

import React, { useState, useEffect } from "react";
import { FileText, Plus, Search, Layers } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import AddClassForm from "@/components/AddClassForm"; 
import ModalWrapper from "@/components/ModalWrapper";

import { ServiceRequestFormSchema } from "@/Data/DataMuqtadi";
import { fetchServiceRequests, createServiceRequest } from "@/utils/api";

import "../../css/Pages.css";

const ServiceRequest = () => {
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Metrics State
  const [totalCount, setTotalCount] = useState("00");
  const [approvedCount, setApprovedCount] = useState("00");
  const [pendingCount, setPendingCount] = useState("00");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const response = await fetchServiceRequests();
    const data = response?.data || (Array.isArray(response) ? response : []);
    setRequestList(data);
    calculateMetrics(data);
    setLoading(false);
  };

  const calculateMetrics = (list) => {
    const total = list.length;
    setTotalCount(total < 10 ? `0${total}` : `${total}`);

    const approved = list.filter(item => item.status === "Approved").length;
    setApprovedCount(approved < 10 ? `0${approved}` : `${approved}`);

    const pending = list.filter(item => item.status === "Submitted" || item.status === "Under Review").length;
    setPendingCount(pending < 10 ? `0${pending}` : `${pending}`);
  };

  const handleAddRequest = async (formData) => {
    const payload = {
      requestType: formData?.requestType || formData?.["Request Type"] || "",
      requesterName: formData?.requesterName || formData?.["Requester Name"] || "",
      phone: formData?.phone || formData?.Phone || "",
      requiredDate: formData?.requiredDate || formData?.["Required Date"] || "",
      priority: formData?.priority || formData?.Priority || "Medium",
      description: formData?.description || formData?.Description || "",
    };

    if (!payload.requestType || !payload.requesterName || !payload.phone || !payload.requiredDate) {
      alert("Please fill out all required fields.");
      return;
    }

    const result = await createServiceRequest(payload);
    if (result && result.success) {
      alert("Service request submitted successfully!");
      setIsModalOpen(false);
      loadData();
    } else {
      alert("Error submitting request: " + (result?.error || "Unknown error"));
    }
  };

  const handleExportPDF = (id) => {
    window.open(`http://localhost:5002/api/service-requests/${id}/export`, "_blank");
  };

  const filteredRequests = requestList.filter((item) => {
    return (
      !searchQuery ||
      item.requestId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requestType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requesterName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <PageHeader title="Service Request Management" />

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
              }}
            >
              <Plus size={18} /> New Request
            </button>
          </div>

          <div className="donation-info-box">
            Muqtadi can request Nikah, Janazah, Dua, Qari, Khateeb, event booking, or masjid space arrangements.
          </div>

          <section className="stats-container">
            <StatCard
              icon={Layers}
              title="Total Requests"
              value={totalCount}
              subtitle="Logged in system"
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />
            <StatCard
              icon={FileText}
              title="Approved Requests"
              value={approvedCount}
              subtitle="Scheduled & verified"
              dotColor="#10b981"
              iconColor="#10b981"
            />
            <StatCard
              icon={Plus}
              title="Pending Review"
              value={pendingCount}
              subtitle="Awaiting management response"
              dotColor="#f59e0b"
              iconColor="#f59e0b"
            />
          </section>

          <div className="filters-row" style={{ marginTop: "20px" }}>
            <div className="search-box" style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search ID, type, name, phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }} 
              />
            </div>
          </div>

          <DataTable
            headers={[
              "#",
              "Request ID",
              "Request Type",
              "Requester Name",
              "Phone",
              "Required Date",
              "Priority",
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
            ) : filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No service requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((item, index) => (
                <tr key={item._id || item.id}>
                  <td>{index + 1}</td>
                  <td><strong>{item.requestId}</strong></td>
                  <td>{item.requestType}</td>
                  <td>{item.requistedName || item.requesterName}</td>
                  <td>{item.phone}</td>
                  <td>{item.requiredDate}</td>
                  <td>{item.priority}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Approved"
                            ? "#dcfce7"
                            : item.status === "Submitted"
                            ? "#dbeafe"
                            : "#fef3c7",
                        color:
                          item.status === "Approved"
                            ? "#166534"
                            : item.status === "Submitted"
                            ? "#1e40af"
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
                      onClick={() => handleExportPDF(item._id || item.id)}
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
                      <FileText size={14} /> PDF
                    </button>
                  </td>
                </tr>
              ))
            )}
          </DataTable>
        </div>
      </div>

      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Submit New Service Request"
      >
        <AddClassForm fields={ServiceRequestFormSchema} onSubmit={handleAddRequest} />
      </ModalWrapper>
    </div>
  );
};

export default ServiceRequest;