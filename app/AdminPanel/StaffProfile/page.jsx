"use client";

import React from "react";
import { FileText , Search } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { StaffFormSchema, StaffData } from "@/Data/Data";

import "../../css/Pages.css";

const StaffProfile = () => {
  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Staff Profile & salary"
          />

          <div className="donation-info-box">
            Record cash, online, cheque donations with category-wise tracking,
            donor details, receipt generation and verification.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={StaffFormSchema} />
          </div>
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search resources..." style={{ paddingLeft: '40px' }} />
            </div>
            <select className="filter-select"><option>Staff Id</option></select>
            <select className="filter-select"><option>Staff Name</option></select>
          </div>
          <DataTable
            headers={[
              "Staff ID",
              "Staff Name",
              "Role",
              "Current Salary",
              "Ramadan Bonus",
              "Salary Status",
              "Status"
            ]}
          >
            {StaffData.map((item) => (
              <tr key={item.id}>
                <td>{item.staffId}</td>

                <td>
                  <strong>{item.name}</strong>
                </td>

                <td>{item.role}</td>

                <td>{item.currentSalary}</td>
                <td>{item.bonus}</td>
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

export default StaffProfile;