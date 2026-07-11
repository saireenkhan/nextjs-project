"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarCommittee from "../../../components/SidebarCommittee";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { CandidatesFormSchema, CandidatesData } from "@/Data/DataCommittee";

import "../../css/Pages.css";

const Candidate2= () => {
  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Candidate Management"
          />

          <div className="donation-info-box">
            Add candidate profiles, assign them to elections and track
            voting performance with vote counts and percentages.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={CandidatesFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Candidate ID",
              "Candidate Name",
              "Position",
              "Election",
              "Total Votes",
              "Vote %",
              "Status",
              "Action",
            ]}
          >
            {CandidatesData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.candidateId}</strong>
                </td>

                <td>{item.candidateName}</td>

                <td>{item.position}</td>

                <td>{item.election}</td>

                <td>{item.totalVotes}</td>

                <td>{item.votePercentage}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Winner"
                          ? "#dcfce7"
                          : item.status === "Leading"
                          ? "#dbeafe"
                          : item.status === "Disqualified"
                          ? "#fee2e2"
                          : "#fef3c7",
                      color:
                        item.status === "Winner"
                          ? "#166534"
                          : item.status === "Leading"
                          ? "#1d4ed8"
                          : item.status === "Disqualified"
                          ? "#991b1b"
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

export default Candidate2;