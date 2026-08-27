"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarAccounts from "../../../components/SidebarAccounts";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { BankCashFormSchema } from "@/Data/DataAccounts";

import "../../css/Pages.css";

const BankCashAcc = () => {
  const [bankCashList, setBankCashList] = useState([]);
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
    loadBankCashData();
  }, []);

  // ==========================================================
  // LOAD ONLY ACCOUNTS TRANSACTIONS
  // ==========================================================

  const loadBankCashData = async () => {
    setLoading(true);

    try {

      // IMPORTANT:
      // The backend scopes transactions by PATH, not a query param:
      //   GET /api/bank-cash/accounts -> only Accounts-sourced
      //   GET /api/bank-cash/admin    -> all transactions
      //
      // There is no GET /api/bank-cash (no root route), so calling
      // that would 404 and return an HTML page instead of JSON.

      const response = await fetch(
        `http://localhost:5000/api/bank-cash/${CURRENT_PANEL}`
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Bank & Cash API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Bank & Cash API returned ${response.status} (non-JSON response). Check bankCashRoutes.js.`
        );

      }

      const result = await response.json();

      const data =
        result?.data ||
        (Array.isArray(result) ? result : []);

      setBankCashList(data);

    } catch (error) {

      console.error("Failed to fetch Accounts bank/cash data:", error);

      setBankCashList([]);

    } finally {

      setLoading(false);

    }
  };

  // ==========================================================
  // ADD ACCOUNTS TRANSACTION
  // ==========================================================

  const handleAddBankCash = async (formData) => {
    const today = new Date().toISOString().split("T")[0];

    const payload = {

      // NOTE:
      // We do NOT send a "source" field here. The backend sets
      // it automatically based on which endpoint we POST to
      // (/api/bank-cash/accounts marks the record as
      // Accounts-created).

      transactionId:
        formData?.transactionId ||
        formData?.["Transaction ID"] ||
        `TXN-${Math.floor(1000 + Math.random() * 9000)}`,

      accountType:
        formData?.accountType ||
        formData?.["Account Type"] ||
        "Bank",

      bankName:
        formData?.bankName ||
        formData?.["Bank Name"] ||
        "Main Bank Account",

      transactionType:
        formData?.transactionType ||
        formData?.["Transaction Type"] ||
        "Deposit",

      amount: Number(
        formData?.amount ||
        formData?.["Amount"] ||
        0
      ),

      // NOTE:
      // Renamed from "reconcileStatus" to "status" to match the
      // actual BankCash schema field. The old key wasn't defined
      // on the schema, so Mongoose silently dropped it on save —
      // Accounts' reconcile status was never actually persisted.
      status:
        formData?.status ||
        formData?.["Reconcile Status"] ||
        "Pending",

      date:
        formData?.date ||
        formData?.["Date"] ||
        today,
    };

    try {

      const response = await fetch(
        `http://localhost:5000/api/bank-cash/${CURRENT_PANEL}`,
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
          "Bank & Cash API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Bank & Cash API returned ${response.status} (non-JSON response). Check bankCashRoutes.js.`
        );

      }

      const result = await response.json();

      if (result.success) {

        alert("Bank/Cash transaction recorded successfully!");

        setIsModalOpen(false);

        loadBankCashData();

      } else {

        alert("Error saving transaction: " + (result.error || "Unknown error"));

      }

    } catch (error) {

      console.error("Transaction submission error:", error);

      alert("Failed to connect to server.");

    }
  };

  const handleViewTransaction = (id) => {
    // NOTE: unified onto the one PDF route the backend actually
    // exposes — there is no separate "/receipt" route.
    window.open(`http://localhost:5000/api/bank-cash/${id}/pdf`, "_blank");
  };

  // Filter & Search Logic
  const filteredData = bankCashList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.transactionId && item.transactionId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.bankName && item.bankName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.accountType && item.accountType.toLowerCase().includes(searchQuery.toLowerCase()));

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
            <PageHeader
              title="Accounts Panel - Bank & Cash Book"
              
            />

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
              <Plus size={18} /> Add Transaction
            </button>
          </div>

          <div className="donation-info-box">
            Accounts panel: Maintain cash-in-hand, bank balance,
            deposits, withdrawals and reconciliation. These records
            are automatically visible in the Admin master panel.
          </div>

          {/* Search & Filters Row */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Transaction ID, Bank Name..." 
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
              <option value="Reconciled">Reconciled</option>
              <option value="Pending">Pending</option>
              <option value="Unreconciled">Unreconciled</option>
            </select>
          </div>

          <DataTable
            headers={[
              "#",
              "Transaction ID",
              "Account Type",
              "Bank Name",
              "Transaction Type",
              "Amount",
              "Reconcile Status",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No transaction records found.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>

                  <td>
                    <strong>{item.transactionId}</strong>
                  </td>

                  <td>{item.accountType}</td>

                  <td>{item.bankName}</td>

                  <td>{item.transactionType}</td>

                  <td>Rs. {item.amount}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Reconciled"
                            ? "#dcfce7"
                            : item.status === "Pending"
                            ? "#fef3c7"
                            : "#fee2e2",
                        color:
                          item.status === "Reconciled"
                            ? "#166534"
                            : item.status === "Pending"
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
                      onClick={() => handleViewTransaction(item._id)}
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
        title="New Bank / Cash Transaction"
      >
        <AddClassForm fields={BankCashFormSchema} onSubmit={handleAddBankCash} />
      </ModalWrapper>
    </div>
  );
};

export default BankCashAcc;