"use client";

import React from "react";
import { FileText } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { UsersRolesFormSchema, UsersRolesData } from "@/Data/Data";
import "../../css/Pages.css";

const UsersRules = () => {
  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Users & Roles"
          />

          <div className="donation-info-box">
            Admin, Accounts, Imam, Moazzin, Committee Member, Voter,
            Muqtadi and Viewer roles with access control.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={UsersRolesFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "User ID",
              "Full Name",
              "Username",
              "Role",
              "2FA",
              "Status",
              "Action",
            ]}
          >
            {UsersRolesData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.userId}</strong>
                </td>

                <td>{item.fullName}</td>

                <td>{item.username}</td>

                <td>{item.role}</td>

                <td>{item.twoFactor}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Active"
                          ? "#dcfce7"
                          : item.status === "Inactive"
                          ? "#fee2e2"
                          : "#fef3c7",
                      color:
                        item.status === "Active"
                          ? "#166534"
                          : item.status === "Inactive"
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

export default UsersRules;