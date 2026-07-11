"use client";

import React from "react";
import { FileText } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { CandidatesFormSchema, CandidatesData } from "@/Data/Data";

import "../../css/Pages.css";

const Candidates = () => {
  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader title="Candidate Management" />

          <div className="donation-info-box">
            Add candidate profiles, assign them to election type and show
            results per candidate.
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
                        item.status === "Leading"
                          ? "#dcfce7"
                          : item.status === "Active"
                          ? "#dbeafe"
                          : "#fef3c7",
                      color:
                        item.status === "Leading"
                          ? "#166534"
                          : item.status === "Active"
                          ? "#1d4ed8"
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

export default Candidates;