"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  ServiceRequestFormSchema,
  ServiceRequestData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const ServiceRequest = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Service Request"
          />

          <div className="donation-info-box">
            Muqtadi can request Nikah, Janazah, Dua,
            Qari, Khateeb, event booking or masjid
            space arrangement.
          </div>

          <div className="donation-form-card">
            <AddClassForm
              fields={ServiceRequestFormSchema}
            />
          </div>

          <DataTable
            headers={[
              "#",
              "Request ID",
              "Request Type",
              "Requester Name",
              "Phone",
              "Required Date",
              "Priority",
              "Status",
              "Action",
            ]}
          >
            {ServiceRequestData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.requestId}</strong>
                </td>

                <td>{item.requestType}</td>

                <td>{item.requesterName}</td>

                <td>{item.phone}</td>

                <td>{item.requiredDate}</td>

                <td>{item.priority}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Approved"
                          ? "#dcfce7"
                          : item.status === "Submitted"
                          ? "#dbeafe"
                          : "#fef3c7",
                      color:
                        item.status === "Approved"
                          ? "#166534"
                          : item.status === "Submitted"
                          ? "#1e40af"
                          : "#92400e",
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

export default ServiceRequest;