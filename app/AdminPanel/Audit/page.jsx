"use client";

import React from "react";
import { FileText } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { AuditFormSchema, AuditData } from "@/Data/Data";

import "../../css/Pages.css";

const Audit = () => {
  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Audit, Backup & Security"
          />

          <div className="donation-info-box">
            Every transaction timestamped with user info, audit trail,
            backup, password login and optional two-step authentication.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={AuditFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Audit ID",
              "User",
              "Module",
              "Action",
              "Timestamp",
              "IP Address",
              "Action",
            ]}
          >
            {AuditData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.auditId}</strong>
                </td>

                <td>{item.user}</td>

                <td>{item.module}</td>

                <td>{item.action}</td>

                <td>{item.timestamp}</td>

                <td>{item.ipAddress}</td>

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
                    View
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

export default Audit;