"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarAccounts from "../../../components/SidebarAccounts";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  FundsFormSchema,
  FundsData,
} from "@/Data/DataAccounts";

import "../../css/Pages.css";

const FundsAcc = () => {
  return (
    <div className="campus-layout">
      <SidebarAccounts />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Fund Management"
          />

          <div className="donation-info-box">
            Separate ledgers for General Fund, Zakat, Madrasa,
            Construction, Welfare, Jummah and Hadia Fund.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={FundsFormSchema} />
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
            {FundsData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.fundCode}</strong>
                </td>

                <td>{item.fundName}</td>

                <td>{item.openingBalance}</td>

                <td>{item.currentBalance}</td>

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
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default FundsAcc;