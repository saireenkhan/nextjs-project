"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarAccounts from "../../../components/SidebarAccounts";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { FundsFormSchema } from "@/Data/DataAccounts";

import "../../css/Pages.css";

const FundsAcc = () => {
  const [fundsList, setFundsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // ==========================================================
  // IMPORTANT
  // Accounts panel identifier
  // ==========================================================

  const CURRENT_PANEL = "accounts";

  useEffect(() => {
    loadFunds();
  }, []);

  // ==========================================================
  // LOAD ONLY ACCOUNTS FUNDS
  // ==========================================================

  const loadFunds = async () => {
    setLoading(true);

    try {

      // IMPORTANT:
      // The backend scopes funds by PATH, not a query param:
      //   GET /api/funds/accounts -> only Accounts-sourced funds
      //   GET /api/funds/admin    -> all funds
      //
      // There is no GET /api/funds (no root route), so calling
      // that would 404 and return an HTML page instead of JSON.

      const response = await fetch(
        `http://localhost:5002/api/funds/${CURRENT_PANEL}`
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Funds API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Funds API returned ${response.status} (non-JSON response). Check fundRoutes.js.`
        );

      }

      const result = await response.json();

      const data =
        result?.data ||
        (Array.isArray(result) ? result : []);

      setFundsList(data);

    } catch (error) {

      console.error("Failed to fetch Accounts funds:", error);

      setFundsList([]);

    } finally {

      setLoading(false);

    }
  };

  // ==========================================================
  // ADD ACCOUNTS FUND
  // ==========================================================

  const handleAddFund = async (formData) => {

    const payload = {

      // NOTE:
      // We do NOT send a "source" field here. The backend sets
      // it automatically based on which endpoint we POST to
      // (/api/funds/accounts marks the record as Accounts-created).

      fundCode:
        formData?.fundCode ||
        formData?.["Fund Code"] ||
        `FND-${Math.floor(1000 + Math.random() * 9000)}`,

      fundName:
        formData?.fundName ||
        formData?.["Fund Name"] ||
        "General Fund",

      openingBalance: Number(
        formData?.openingBalance ||
        formData?.["Opening Balance"] ||
        0
      ),

      currentBalance: Number(
        formData?.currentBalance ||
        formData?.["Current Balance"] ||
        formData?.["Opening Balance"] ||
        0
      ),

      ledgerType:
        formData?.ledgerType ||
        formData?.["Ledger Type"] ||
        "General Ledger",

      status:
        formData?.status ||
        formData?.["Status"] ||
        "Active",
    };

    try {

      const response = await fetch(
        `http://localhost:5002/api/funds/${CURRENT_PANEL}`,
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
          "Funds API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Funds API returned ${response.status} (non-JSON response). Check fundRoutes.js.`
        );

      }

      const result = await response.json();

      if (result.success) {

        alert("Fund record created successfully!");

        setIsModalOpen(false);

        // Refresh Accounts list
        loadFunds();

      } else {

        alert("Error saving fund: " + (result.error || "Unknown error"));

      }

    } catch (error) {

      console.error("Fund submission error:", error);

      alert("Failed to connect to server.");

    }
  };

  const handleViewLedger = (id) => {
    // NOTE: unified with Admin's PDF endpoint — the backend only
    // exposes /api/funds/:id/pdf, there is no separate /ledger route.
    window.open(`http://localhost:5002/api/funds/${id}/pdf`, "_blank");
  };

  // Filter & Search Logic
  const filteredFunds = fundsList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.fundCode && item.fundCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.fundName && item.fundName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.ledgerType && item.ledgerType.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      selectedStatusFilter === "All" || 
      (item.status && item.status.toLowerCase() === selectedStatusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="campus-layout">
      <SidebarAccounts />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Trigger Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px" }}>
            <PageHeader title="Accounts Panel - Fund Management" />

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
              <Plus size={18} /> Add Fund
            </button>
          </div>

          <div className="donation-info-box">
            Accounts panel: Separate ledgers for General Fund, Zakat,
            Madrasa, Construction, Welfare, Jummah and Hadia Fund. These
            records are automatically visible in the Admin master panel.
          </div>

          {/* Search & Filters Row */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Fund Code, Name, Ledger Type..." 
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <DataTable
            headers={[
              "#",
              "Fund Code",
              "Fund Name",
              "Opening Balance",
              "Current Balance",
              "Ledger Type",
              "Status",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredFunds.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No Accounts fund records found.
                </td>
              </tr>
            ) : (
              filteredFunds.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>

                  <td>
                    <strong>{item.fundCode}</strong>
                  </td>

                  <td>{item.fundName}</td>

                  <td>Rs. {item.openingBalance}</td>

                  <td>Rs. {item.currentBalance}</td>

                  <td>{item.ledgerType}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Active"
                            ? "#dcfce7"
                            : item.status === "Inactive"
                            ? "#fef3c7"
                            : "#fee2e2",
                        color:
                          item.status === "Active"
                            ? "#166534"
                            : item.status === "Inactive"
                            ? "#92400e"
                            : "#991b1b",
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
                      onClick={() => handleViewLedger(item._id)}
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
                      Ledger
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
        title="Create New Fund Ledger"
      >
        <AddClassForm fields={FundsFormSchema} onSubmit={handleAddFund} />
      </ModalWrapper>
    </div>
  );
};

export default FundsAcc;