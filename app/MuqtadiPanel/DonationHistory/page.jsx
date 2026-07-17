"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  MyDonationHistoryFormSchema,
  MyDonationHistoryData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const DonationHistory = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="My Donation History"
          />

          <div className="donation-info-box">
            Muqtadi can view personal donation history,
            payment status and receipt download details.
          </div>

          <div className="donation-form-card">
            <AddClassForm
              fields={MyDonationHistoryFormSchema}
            />
          </div>

          <DataTable
            headers={[
              "#",
              "Receipt No",
              "Date",
              "Fund",
              "Amount",
              "Payment",
              "Receipt",
            ]}
          >
            {MyDonationHistoryData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.receiptNo}</strong>
                </td>

                <td>{item.date}</td>

                <td>{item.fund}</td>

                <td>{item.amount}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.payment === "Verified"
                          ? "#dcfce7"
                          : "#fef3c7",
                      color:
                        item.payment === "Verified"
                          ? "#166534"
                          : "#92400e",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.payment}
                  </span>
                </td>

                <td>
                  {item.receipt === "Download PDF" ? (
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
                  ) : (
                    <span>{item.receipt}</span>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;