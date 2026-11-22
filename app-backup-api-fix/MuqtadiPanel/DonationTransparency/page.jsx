"use client";

import React from "react";
import { FileText } from "lucide-react";
import {
  Wallet,
  Receipt,
  Landmark,
} from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/DataTable";

import {
  DonationTransparencyData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const DonationTransparency = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Donation Summary & Transparency"
          />

          <div className="donation-info-box">
            Public fund transparency view for Muqtadi:
            monthly collection, expenses and fund-wise balance.
          </div>

          <section className="stats-container">
            <StatCard
              icon={Wallet}
              title="This Month Donation"
              value="RS: 55,000"
              subtitle="Verified receipts only"
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />

            <StatCard
              icon={Receipt}
              title="This Month Expense"
              value="RS: 20,000"
              subtitle="Approved expenses"
              dotColor="#f59e0b"
              iconColor="#f59e0b"
            />

            <StatCard
              icon={Landmark}
              title="Available Balance"
              value="RS: 35,000"
              subtitle="Updated by Accounts"
              dotColor="var(--accent-blue)"
              iconColor="var(--accent-blue)"
            />
          </section>

          <DataTable
            headers={[
              "#",
              "Fund Category",
              "Collected",
              "Spent",
              "Balance",
              "Status",
              "Action",
            ]}
          >
            {DonationTransparencyData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.fundCategory}</strong>
                </td>

                <td>{item.collected}</td>

                <td>{item.spent}</td>

                <td>{item.balance}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Healthy"
                          ? "#dcfce7"
                          : "#dbeafe",
                      color:
                        item.status === "Healthy"
                          ? "#166534"
                          : "#1e40af",
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

export default DonationTransparency;