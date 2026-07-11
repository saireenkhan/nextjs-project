"use client";

import React from "react";
import { FileText } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { ComplaintsFormSchema, ComplaintsData } from "@/Data/Data";

import "../../css/Pages.css";

const Complains = () => {
  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader title="Complaint System" />

          <div className="donation-info-box">
            Admin can view Muqtadi and Imam complaints. Submit complaints with
            status, evidence and admin comments.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={ComplaintsFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Complaint ID",
              "Person",
              "Category",
              "Priority",
              "Status",
              "Assigned To",
              "Action",
            ]}
          >
            {ComplaintsData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.complaintId}</strong>
                </td>

                <td>{item.personName}</td>

                <td>{item.category}</td>

                <td>{item.priority}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Resolved"
                          ? "#dcfce7"
                          : item.status === "In Progress"
                          ? "#dbeafe"
                          : "#fef3c7",
                      color:
                        item.status === "Resolved"
                          ? "#166534"
                          : item.status === "In Progress"
                          ? "#1d4ed8"
                          : "#92400e",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td>{item.assignedTo}</td>

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

export default Complains;