"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarAccounts from "../../../components/SidebarAccounts";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  DonationsFormSchema,
  DonationsData,
} from "@/Data/DataAccounts";

import "../../css/Pages.css";

const Donations = () => {
  return (
    <div className="campus-layout">
      <SidebarAccounts />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Donation Management"
          />

          <div className="donation-info-box">
            Record cash, online, cheque donations with category-wise
            tracking, donor details, receipt, logo and QR verification.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={DonationsFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Donation ID",
              "Donor Name",
              "Donation Type",
              "Fund Category",
              "Amount",
              "Status",
              "Action",
            ]}
          >
            {DonationsData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.donationId}</strong>
                </td>

                <td>{item.donorName}</td>

                <td>{item.donationType}</td>

                <td>{item.fundCategory}</td>

                <td>{item.amount}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Verified"
                          ? "#dcfce7"
                          : item.status === "Pending"
                          ? "#fef3c7"
                          : "#dbeafe",
                      color:
                        item.status === "Verified"
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

export default Donations;