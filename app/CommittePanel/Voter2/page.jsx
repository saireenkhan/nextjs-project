"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarCommittee from "../../../components/SidebarCommittee";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { VotersFormSchema, VotersData } from "@/Data/DataCommittee";

import "../../css/Pages.css";

const Voter2 = () => {
  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Voter Management"
          />

          <div className="donation-info-box">
            Register voters, verify identities through OTP/PIN and
            prevent duplicate voting.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={VotersFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Voter ID",
              "Voter Name",
              "CNIC",
              "Phone",
              "Verification",
              "Voting Status",
              "Action",
            ]}
          >
            {VotersData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.voterId}</strong>
                </td>

                <td>{item.voterName}</td>

                <td>{item.cnic}</td>

                <td>{item.phone}</td>

                <td>{item.verificationMethod}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.votingStatus === "Voted"
                          ? "#dcfce7"
                          : item.votingStatus === "Verified"
                          ? "#dbeafe"
                          : "#fef3c7",
                      color:
                        item.votingStatus === "Voted"
                          ? "#166534"
                          : item.votingStatus === "Verified"
                          ? "#1d4ed8"
                          : "#92400e",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.votingStatus}
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

export default Voter2;