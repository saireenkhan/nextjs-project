"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  AnnouncementFormSchema,
  AnnouncementData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const Announcement = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Masjid Announcements"
          />

          <div className="donation-info-box">
            Latest announcements for Jummah, Ramadan, Eid,
            donations, janazah, maintenance and community updates.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={AnnouncementFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Title",
              "Category",
              "Date",
              "Priority",
              "Details",
              "Action",
            ]}
          >
            {AnnouncementData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.title}</strong>
                </td>

                <td>{item.category}</td>

                <td>{item.date}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.priority === "Important"
                          ? "#fee2e2"
                          : item.priority === "Active"
                          ? "#dcfce7"
                          : "#f3f4f6",
                      color:
                        item.priority === "Important"
                          ? "#991b1b"
                          : item.priority === "Active"
                          ? "#166534"
                          : "#374151",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.priority}
                  </span>
                </td>

                <td>{item.details}</td>

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

export default Announcement;