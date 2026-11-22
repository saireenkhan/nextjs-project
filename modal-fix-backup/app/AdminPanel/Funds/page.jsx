"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { FundsFormSchema } from "@/Data/Data";
import { fetchFunds, createFund } from "@/utils/api";

import "../../css/Pages.css";

const Funds = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNameFilter, setSelectedNameFilter] = useState("All");
  const [selectedLedgerFilter, setSelectedLedgerFilter] = useState("All");

  useEffect(() => {
    loadFunds();
  }, []);

  const loadFunds = async () => {
    setLoading(true);
    const data = await fetchFunds();
    setFunds(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleAddFund = async (formData) => {
    console.log("Raw Fund Form Data Received:", formData);

    const payload = {
      fundCode: 
        formData?.fundCode || 
        formData?.["Fund Code"] || 
        `FND-${Math.floor(100 + Math.random() * 900)}`,

      fundName: 
        formData?.fundName || 
        formData?.["Fund Name"] || 
        "Masjid general fund",

      openingBalance: Number(
        formData?.openingBalance || 
        formData?.["Opening Balance"] || 
        0
      ),

      currentBalance: Number(
        formData?.currentBalance || 
        formData?.["Current Balance"] || 
        0
      ),

      ledgerType: 
        formData?.ledgerType || 
        formData?.["Ledger Type"] || 
        "Asset",

      status: 
        formData?.status || 
        formData?.["Status"] || 
        "Verified",

      description: 
        formData?.description || 
        formData?.["Description"] || 
        ""
    };

    console.log("Processed Fund Payload Sent to Database:", payload);

    const result = await createFund(payload);
    if (result && result.success) {
      alert("Fund saved successfully: " + payload.fundName);
      setIsModalOpen(false); // Close modal on success
      loadFunds();
    } else {
      alert("Error saving fund: " + (result?.error || "Unknown error"));
    }
  };

  const handleDownloadPdf = (id) => {
    window.open(`/api/funds/${id}/pdf`, "_blank");
  };

  // Filtering and Searching Logic
  const filteredFunds = funds.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.fundName && item.fundName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.fundCode && item.fundCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item._id && item._id.toLowerCase().includes(searchQuery.toLowerCase()));

    const itemName = item.fundName || "";
    const matchesName = 
      selectedNameFilter === "All" || 
      itemName.toLowerCase() === selectedNameFilter.toLowerCase();

    const itemLedger = item.ledgerType || "";
    const matchesLedger = 
      selectedLedgerFilter === "All" || 
      itemLedger.toLowerCase() === selectedLedgerFilter.toLowerCase();

    return matchesSearch && matchesName && matchesLedger;
  });

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Right-End Trigger Button */}
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
               <PageHeader title="Funds Management" />
             </div>
           
             <button className="btn-add-staff">
               <Plus size={18} />
               Add Funds
             </button>
             </div>
          <div className="donation-info-box">
            Record cash, online, cheque donations with category-wise tracking,
            donor details, receipt generation and verification.
          </div>

          {/* ================= SEARCH & FILTERS ROW ================= */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search funds or code..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            {/* Fund Name Filter */}
            <select 
              className="filter-select"
              value={selectedNameFilter}
              onChange={(e) => setSelectedNameFilter(e.target.value)}
            >
              <option value="All">All Fund Names</option>
              <option value="Masjid general fund">Masjid general fund</option>
              <option value="Zakat fund">Zakat fund</option>
              <option value="Construction fund">Construction fund</option>
              <option value="Madrasa fund">Madrasa fund</option>
              <option value="WellFare">WellFare</option>
              <option value="Jummah">Jummah</option>
              <option value="hadia fund">hadia fund</option>
              <option value="Ramzan Bonus">Ramzan Bonus</option>
              <option value="Other">Other</option>
            </select>

            {/* Ledger Type Filter */}
            <select 
              className="filter-select"
              value={selectedLedgerFilter}
              onChange={(e) => setSelectedLedgerFilter(e.target.value)}
            >
              <option value="All">All Ledger Types</option>
              <option value="Asset">Asset</option>
              <option value="Liability">Liability</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <DataTable
            headers={[
              "Fund Code",
              "Fund Name",
              "Opening Balance",
              "Current Balance",
              "Ledger Type",
              "Status",
              "Action"
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredFunds.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No matching funds found in database.
                </td>
              </tr>
            ) : (
              filteredFunds.map((item) => (
                <tr key={item._id}>
                  <td>{item.fundCode}</td>

                  <td>
                    <strong>{item.fundName}</strong>
                  </td>

                  <td>Rs. {item.openingBalance?.toLocaleString()}</td>

                  <td>Rs. {item.currentBalance?.toLocaleString()}</td>

                  <td>{item.ledgerType}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Verified" || item.status === "Active"
                            ? "#dcfce7"
                            : item.status === "Pending"
                            ? "#fef3c7"
                            : "#e5e7eb",
                        color:
                          item.status === "Verified" || item.status === "Active"
                            ? "#166534"
                            : item.status === "Pending"
                            ? "#92400e"
                            : "#374151",
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
                      PDF
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
        title="Add New Fund"
      >
        <AddClassForm fields={FundsFormSchema} onSubmit={handleAddFund} />
      </ModalWrapper>
    </div>
  );
};

export default Funds;