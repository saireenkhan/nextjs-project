"use client";

import React from "react";
// import { FileText } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { EventsKhateebFormSchema, EventsKhateebData } from "@/Data/Data";

import "../../css/Pages.css";

const EventsKhateeb = () => {
  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Events, Khateeb & Qari Management"
          />

          <div className="donation-info-box">
           Admin can create Khateeb/Qari profiles, assign Hadia Fund, appoint Qari for Ramadan Taraweeh and assign topics for Jummah or any event.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={EventsKhateebFormSchema} />
          </div>

          <DataTable
            headers={[
              "Event ID",
  "Event",
  "Person",
  "Topic",
  "Hadia",
  "Payment Status",
            ]}
          >
            {EventsKhateebData.map((item) => (
              <tr key={item.id}>
                <td>{item.eventId}</td>

                <td>
                  <strong>{item.event}</strong>
                </td>

                <td>{item.person}</td>

                <td>{item.topic}</td>
                <td>{item.hadia}</td>
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
                          : "#e5e7eb",
                      color:
                        item.status === "Verified"
                          ? "#166534"
                          : item.status === "Pending"
                          ? "#92400e"
                          : "#374151",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default EventsKhateeb;