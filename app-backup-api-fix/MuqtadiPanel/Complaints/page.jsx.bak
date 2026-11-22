"use client";

import React, { useState, useEffect } from "react";
import { FileText, Plus, Search, AlertCircle } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { ComplaintFormSchema } from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const Complaints = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Metrics state
  const [totalComplaints, setTotalComplaints] = useState("00");
  const [pendingCount, setPendingCount] = useState("00");
  const [resolvedCount, setResolvedCount] = useState("00");

  // ==========================================================
  // IMPORTANT
  // Muqtadi panel identifier
  // ==========================================================

  const CURRENT_PANEL = "muqtadi";

  useEffect(() => {
    loadData();
  }, []);

  // ==========================================================
  // LOAD ONLY MUQTADI COMPLAINTS
  // ==========================================================

  const loadData = async () => {
    setLoading(true);

    try {

      // IMPORTANT:
      // The backend scopes complaints by PATH, not a query param:
      //   GET /api/complaints/muqtadi -> only Muqtadi-filed
      //   GET /api/complaints/admin   -> all complaints
      //
      // There is no GET /api/complaints (no root route), so calling
      // that would 404 and return an HTML page instead of JSON.

      const res = await fetch(
        `http://localhost:5002/api/complaints/${CURRENT_PANEL}`
      );

      const contentType =
        res.headers.get("content-type") || "";

      if (!res.ok || !contentType.includes("application/json")) {

        const rawText = await res.text();

        console.error(
          "Complaints API did not return JSON. Status:",
          res.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Complaints API returned ${res.status} (non-JSON response). Check complaintRoutes.js.`
        );

      }

      const result = await res.json();

      const data =
        result?.data ||
        (Array.isArray(result) ? result : []);

      setComplaintList(data);

      calculateMetrics(data);

    } catch (error) {

      console.error("Failed to fetch Muqtadi complaints:", error);

      setComplaintList([]);

    }

    setLoading(false);
  };

  const calculateMetrics = (list) => {
    const total = list.length;
    setTotalComplaints(total < 10 ? `0${total}` : `${total}`);

    const pending = list.filter(item => item.status === "Pending" || item.status === "Under Review").length;
    setPendingCount(pending < 10 ? `0${pending}` : `${pending}`);

    const resolved = list.filter(item => item.status === "Resolved").length;
    setResolvedCount(resolved < 10 ? `0${resolved}` : `${resolved}`);
  };

  // ==========================================================
  // FILE MUQTADI COMPLAINT
  // ==========================================================

  const handleAddComplaint = async (formData) => {

    const payload = {

      // NOTE:
      // We do NOT send a "source" field here. The backend sets
      // it automatically based on which endpoint we POST to
      // (/api/complaints/muqtadi marks the record as
      // Muqtadi-filed).
      //
      // NOTE: this page previously never generated a complaintId,
      // and the schema requires one — every submission from this
      // page was silently failing until now. The backend also now
      // auto-generates one as a safety net either way.

      complaintId:
        formData?.complaintId ||
        formData?.["Complaint ID"] ||
        `CMP-${Math.floor(1000 + Math.random() * 9000)}`,

      personType:
        formData?.personType ||
        formData?.["Person Type"] ||
        "",

      personName:
        formData?.personName ||
        formData?.["Person Name"] ||
        "",

      category:
        formData?.category ||
        formData?.Category ||
        "General",

      // NOTE: this page also never sent a priority — the schema
      // requires one and defaults to "Medium", but since Mongoose
      // applies schema defaults only when a field is entirely
      // absent, sending it explicitly here keeps this page
      // consistent with the other three panels.
      priority:
        formData?.priority ||
        formData?.Priority ||
        "Medium",

      status:
        formData?.status ||
        formData?.Status ||
        "Pending",

      assignedTo:
        formData?.assignedTo ||
        formData?.["Assigned To"] ||
        "Management Committee",

      complaintDate:
        formData?.complaintDate ||
        formData?.["Complaint Date"] ||
        new Date().toISOString().split('T')[0],

      description:
        formData?.description ||
        formData?.["Complaint Details"] ||
        "",
    };

    try {

      const res = await fetch(
        `http://localhost:5002/api/complaints/${CURRENT_PANEL}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const contentType =
        res.headers.get("content-type") || "";

      if (!res.ok || !contentType.includes("application/json")) {

        const rawText = await res.text();

        console.error(
          "Complaints API did not return JSON. Status:",
          res.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Complaints API returned ${res.status} (non-JSON response). Check complaintRoutes.js.`
        );

      }

      const result = await res.json();

      if (result.success) {
        alert("Complaint filed successfully!");
        setIsModalOpen(false);
        loadData();
      } else {
        alert("Error: " + (result.error || "Unknown error"));
      }

    } catch (error) {

      console.error("Submission network error:", error);

      alert("Failed to connect to backend server.");

    }
  };

  const handleExportPDF = (id) => {
    // NOTE: unified onto the one PDF/report route the backend
    // actually exposes — there is no separate "/export" route.
    window.open(`http://localhost:5002/api/complaints/${id}/pdf`, "_blank");
  };

  const filteredComplaints = complaintList.filter((item) => {
    return (
      !searchQuery ||
      item.complaintId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.personType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.personName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <PageHeader title="Muqtadi Panel - Complaint System" />

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
              <Plus size={18} /> File New Complaint
            </button>
          </div>

          <div className="donation-info-box">
            Muqtadi panel: Submit complaints about mismanagement,
            late prayers, misbehavior, or financial misuse with
            evidence uploads. These records are automatically
            visible in the Admin master panel.
          </div>

          <section className="stats-container">
            <StatCard
              icon={AlertCircle}
              title="Total Complaints"
              value={totalComplaints}
              subtitle="Registered entries"
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />
            <StatCard
              icon={AlertCircle}
              title="Pending Review"
              value={pendingCount}
              subtitle="Awaiting management response"
              dotColor="#f59e0b"
              iconColor="#f59e0b"
            />
            <StatCard
              icon={FileText}
              title="Resolved"
              value={resolvedCount}
              subtitle="Closed and resolved issues"
              dotColor="#10b981"
              iconColor="#10b981"
            />
          </section>

          <div className="filters-row" style={{ marginTop: "20px" }}>
            <div className="search-box" style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search ID, name, category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }} 
              />
            </div>
          </div>

          <DataTable
            headers={[
              "#",
              "Complaint ID",
              "Person Type",
              "Person Name",
              "Category",
              "Status",
              "Assigned To",
              "Date",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  Loading complaints database...
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
                <tr key={item._id || item.id}>
                  <td>{index + 1}</td>
                  <td><strong>{item.complaintId}</strong></td>
                  <td>{item.personType}</td>
                  <td>{item.personName}</td>
                  <td>{item.category}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Resolved"
                            ? "#dcfce7"
                            : item.status === "Pending"
                            ? "#fef3c7"
                            : "#dbeafe",
                        color:
                          item.status === "Resolved"
                            ? "#166534"
                            : item.status === "Pending"
                            ? "#92400e"
                            : "#1d4ed8",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.assignedTo}</td>
                  <td>{item.complaintDate}</td>
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
        title="File New Complaint"
      >
        <AddClassForm fields={ComplaintFormSchema} onSubmit={handleAddComplaint} />
      </ModalWrapper>
    </div>
  );
};

export default Complaints;