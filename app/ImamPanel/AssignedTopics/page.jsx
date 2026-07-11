"use client";

import React from "react";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { AssignedTopicsFormSchema, AssignedTopicsData } from "@/Data/Data-Imam.jsx";
import "../../css/Pages.css";
import SidebarImam from "../../../components/SidebarImam";

const AssignedTopics = () => {
  return (
    <div className="campus-layout">
      <SidebarImam />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Imam Portal"
          />

          <div className="donation-info-box">
            Imam can view assigned topics from Admin and submit complaints or
            requests. These complaints show in Admin portal.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={AssignedTopicsFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Imam ID",
              "Imam Name",
              "Assigned Event",
              "Assigned Topic",
              "Preparation Status",
              "Complaint Status",
            ]}
          >
            {AssignedTopicsData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.imamId}</strong>
                </td>

                <td>{item.imamName}</td>

                <td>{item.assignedEvent}</td>

                <td>{item.assignedTopic}</td>

                <td>{item.preparationStatus}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.complaintStatus === "Resolved"
                          ? "#dcfce7"
                          : item.complaintStatus === "Pending"
                          ? "#fef3c7"
                          : "#dbeafe",
                      color:
                        item.complaintStatus === "Resolved"
                          ? "#166534"
                          : item.complaintStatus === "Pending"
                          ? "#92400e"
                          : "#1d4ed8",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.complaintStatus}
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

export default AssignedTopics;