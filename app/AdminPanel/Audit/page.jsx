"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { AuditFormSchema } from "@/Data/Data";
import { fetchAudits, createAudit } from "@/utils/api";

import "../../css/Pages.css";

const Audit = () => {
  const [auditList, setAuditList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Module Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModuleFilter, setSelectedModuleFilter] = useState("All");

  useEffect(() => {
    loadAudits();
  }, []);

  const loadAudits = async () => {
    setLoading(true);
    const data = await fetchAudits();
    setAuditList(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleAddAudit = async (formData) => {
    const payload = {
      auditId: formData?.auditId || formData?.["Audit ID"] || `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      user: formData?.user || formData?.["User"] || "System Admin",
      module: formData?.module || formData?.["Module"] || "General",
      action: formData?.action || formData?.["Action"] || "Performed Action",
      timestamp: formData?.timestamp || formData?.["Timestamp"] || new Date().toLocaleString(),
      ipAddress: formData?.ipAddress || formData?.["IP Address"] || "127.0.0.1",
    };

    const result = await createAudit(payload);
    if (result && result.success) {
      alert("Audit log recorded successfully!");
      setIsModalOpen(false);
      loadAudits();
    } else {
      alert("Error saving audit log: " + (result?.error || "Unknown error"));
    }
  };

  const handleDownloadPdf = (id) => {
    window.open(`/api/audits/${id}/pdf`, "_blank");
  };

  // Filter & Search Logic
  const filteredAudits = auditList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.user && item.user.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.auditId && item.auditId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.action && item.action.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModule = 
      selectedModuleFilter === "All" || 
      (item.module && item.module.toLowerCase() === selectedModuleFilter.toLowerCase());

    return matchesSearch && matchesModule;
  });

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
            <div
             style={{
               display: "flex",
               alignItems: "center",
               width: "100%",
               marginBottom: "16px",
               gap: "20px",
             }}
           >
             <div style={{ flex: 1, minWidth: 0 }}>
               <PageHeader title="Audit,Backup and security" />
             </div>
           
             <button type="button" onClick={() => setIsModalOpen(true)} className="btn-add-staff">
               <Plus size={18} />
               Add Audit Log
             </button>
             </div>
          <div className="donation-info-box">
            Every transaction timestamped with user info, audit trail, backup, password login and optional two-step authentication.
          </div>

          {/* Search & Module Filters */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Audit ID, User or Action..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            <select 
              className="filter-select"
              value={selectedModuleFilter}
              onChange={(e) => setSelectedModuleFilter(e.target.value)}
            >
              <option value="All">All Modules</option>
              <option value="Authentication">Authentication</option>
              <option value="Finance">Finance</option>
              <option value="Settings">Settings</option>
            </select>
          </div>

          <DataTable
            headers={[
              "#",
              "Audit ID",
              "User",
              "Module",
              "Action",
              "Timestamp",
              "IP Address",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredAudits.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No audit logs found.
                </td>
              </tr>
            ) : (
              filteredAudits.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.id || index + 1}</td>

                  <td>
                    <strong>{item.auditId}</strong>
                  </td>

                  <td>{item.user}</td>

                  <td>{item.module}</td>

                  <td>{item.action}</td>

                  <td>{item.timestamp}</td>

                  <td>{item.ipAddress}</td>

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

      {/* Modal Form Wrapper */}
      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Record New Audit Log"
      >
        <AddClassForm fields={AuditFormSchema} onSubmit={handleAddAudit} />
      </ModalWrapper>
    </div>
  );
};

export default Audit;