"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarCommittee from "../../../components/SidebarCommittee";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { ElectionsFormSchema, ElectionsData } from "@/Data/DataCommittee";

import "../../css/Pages.css";

const Election2 = () => {
  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Election Management"
            />

          <div className="donation-info-box">
            Create elections or polls with start/end time, voting methods,
            candidate options and result visibility settings.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={ElectionsFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Election ID",
              "Election Title",
              "Election Type",
              "Vote Type",
              "Status",
              "Result Visibility",
              "Action",
            ]}
          >
            {ElectionsData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.electionId}</strong>
                </td>

                <td>{item.electionTitle}</td>

                <td>{item.electionType}</td>

                <td>{item.voteType}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Active"
                          ? "#dcfce7"
                          : item.status === "Upcoming"
                          ? "#dbeafe"
                          : "#f3f4f6",
                      color:
                        item.status === "Active"
                          ? "#166534"
                          : item.status === "Upcoming"
                          ? "#1d4ed8"
                          : "#374151",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td>{item.resultVisibility}</td>

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

export default Election2;