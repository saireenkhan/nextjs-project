"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  ComplaintFormSchema,
  ComplaintData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const Complaints = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Complaint System"
          />

          <div className="donation-info-box">
            Submit complaints about mismanagement,
            late prayers, misbehavior or financial misuse
            with evidence upload.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={ComplaintFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Complaint ID",
              "Person Type",
              "Person Name",
              "Category",
              "Status",
              "Assigned To",
              "Date",
              "Action",
            ]}
          >
            {ComplaintData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.complaintId}</strong>
                </td>

                <td>{item.personType}</td>

                <td>{item.personName}</td>

                <td>{item.category}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Resolved"
                          ? "#dcfce7"
                          : item.status === "Pending"
                          ? "#fef3c7"
                          : "#dbeafe",
                      color:
                        item.status === "Resolved"
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

                <td>{item.assignedTo}</td>

                <td>{item.complaintDate}</td>

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

export default Complaints;