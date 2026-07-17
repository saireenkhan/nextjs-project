"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";

import {
  IslamicCalendarData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const IslamicCalendar = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Islamic Calendar"
          />

          <div className="donation-info-box">
            Important Islamic dates, Ramadan schedule,
            Eid, Ashura, Laylat-ul-Qadr and community programs.
          </div>

          <DataTable
            headers={[
              "#",
              "Islamic Event",
              "Hijri Date",
              "Expected Gregorian Date",
              "Program",
              "Status",
              "Action",
            ]}
          >
            {IslamicCalendarData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.event}</strong>
                </td>

                <td>{item.hijriDate}</td>

                <td>{item.gregorianDate}</td>

                <td>{item.program}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Upcoming"
                          ? "#dbeafe"
                          : item.status === "Planned"
                          ? "#fef3c7"
                          : "#e5e7eb",
                      color:
                        item.status === "Upcoming"
                          ? "#1e40af"
                          : item.status === "Planned"
                          ? "#92400e"
                          : "#374151",
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

export default IslamicCalendar;