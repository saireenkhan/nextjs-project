"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { BankCashFormSchema } from "@/Data/Data";
import { fetchBankCash, createBankCash } from "@/utils/api";

import "../../css/Pages.css";

const BankCash = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchBankCash();
    setDataList(Array.isArray(result) ? result : []);
    setLoading(false);
  };

  const handleFormSubmit = async (formData) => {
    console.log("Raw Bank/Cash form data:", formData);

    const payload = {
      transactionId: formData?.transactionId || formData?.["Transaction ID"] || `TRX-${Math.floor(100 + Math.random() * 900)}`,
      accountType: formData?.accountType || formData?.["Account Type"] || "Bank",
      bankName: formData?.bankName || formData?.["Bank Name"] || "",
      accountNumber: formData?.accountNumber || formData?.["Account Number"] || "",
      transactionType: formData?.transactionType || formData?.["Transaction Type"] || "Deposit",
      amount: Number(formData?.amount || formData?.["Amount"] || 0),
      date: formData?.date || formData?.["Date"] || "",
      referenceNumber: formData?.referenceNumber || formData?.["Reference Number"] || "",
      status: formData?.status || formData?.["Reconcile Status"] || "Reconciled",
      remarks: formData?.remarks || formData?.["Remarks"] || ""
    };

    const result = await createBankCash(payload);
    if (result && result.success) {
      alert("Transaction saved successfully!");
      setIsModalOpen(false); // Close modal on success
      loadData();
    } else {
      alert("Error saving transaction: " + (result?.error || "Unknown error"));
    }
  };

  const handleDownloadPdf = (id) => {
    window.open(`/api/bank-cash/${id}/pdf`, "_blank");
  };

  const filteredData = dataList.filter((item) => {
    return (
      !searchQuery ||
      item.transactionId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bankName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.accountType?.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
               <PageHeader title="Bank And CashBook" />
             </div>
           
             <button type="button" onClick={() => setIsModalOpen(true)} className="btn-add-staff">
               <Plus size={18} />
               Add Transaction
             </button>
             </div>

          <div className="donation-info-box">
            Maintain cash-in-hand, bank balance, deposits, withdrawals and reconciliation.
          </div>

          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Transaction ID, Bank..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>
          </div>

          <DataTable
            headers={[
              "#",
              "Transaction ID",
              "Account Type",
              "Bank Name",
              "Transaction Type",
              "Amount",
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
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{item.transactionId}</strong>
                  </td>
                  <td>{item.accountType}</td>
                  <td>{item.bankName || "N/A"}</td>
                  <td>{item.transactionType}</td>
                  <td>Rs. {item.amount?.toLocaleString()}</td>
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
        title="Add New Transaction"
      >
        <AddClassForm fields={BankCashFormSchema} onSubmit={handleFormSubmit} />
      </ModalWrapper>
    </div>
  );
};

export default BankCash;