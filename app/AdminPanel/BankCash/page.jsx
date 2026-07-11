"use client";

import React from "react";
import { FileText } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { BankCashFormSchema, BankCashData } from "@/Data/Data";

import "../../css/Pages.css";

const BankCash = () => {
  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Bank & Cash Book"
          />

          <div className="donation-info-box">
            Maintain cash-in-hand, bank balance, deposits, withdrawals and
            reconciliation.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={BankCashFormSchema} />
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
            {BankCashData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.transactionId}</strong>
                </td>

                <td>{item.accountType}</td>

                <td>{item.bankName}</td>

                <td>{item.transactionType}</td>

                <td>{item.amount}</td>

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
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default BankCash;