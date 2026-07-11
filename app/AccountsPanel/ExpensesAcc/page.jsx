"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarAccounts from "../../../components/SidebarAccounts";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  ExpensesFormSchema,
  ExpensesData,
} from "@/Data/DataAccounts";

import "../../css/Pages.css";

const ExpensesAcc = () => {
  return (
    <div className="campus-layout">
      <SidebarAccounts />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Expense Management"
            subtitle="Track daily and monthly expenses with approval workflow."
          />

          <div className="donation-info-box">
            Track daily/monthly expenses like electricity, water,
            cleaning, staff salary with approval workflow.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={ExpensesFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Expense ID",
              "Category",
              "Fund Used",
              "Amount",
              "Vendor",
              "Approval Status",
              "Posting Status",
              "Action",
            ]}
          >
            {ExpensesData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.expenseId}</strong>
                </td>

                <td>{item.category}</td>

                <td>{item.fundUsed}</td>

                <td>{item.amount}</td>

                <td>{item.vendor}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.approvalStatus === "Approved"
                          ? "#dcfce7"
                          : item.approvalStatus === "Pending"
                          ? "#fef3c7"
                          : "#fee2e2",
                      color:
                        item.approvalStatus === "Approved"
                          ? "#166534"
                          : item.approvalStatus === "Pending"
                          ? "#92400e"
                          : "#991b1b",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.approvalStatus}
                  </span>
                </td>

                <td>{item.postingStatus}</td>

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
                    Receipt
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

export default ExpensesAcc;