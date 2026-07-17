"use client";

import React from "react";
import { FileText } from "lucide-react";
import {
  GraduationCap,
  UserPlus,
  Clock,
} from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/DataTable";

import {
  QuranClassesData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const QuranClasses = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Quran / Madrasa Classes"
          />

          <div className="donation-info-box">
            Class timings, teacher details, age groups,
            admission status and Hifz/Nazra/Tajweed information.
          </div>

          <section className="stats-container">
            <StatCard
              icon={GraduationCap}
              title="Active Classes"
              value="04"
              subtitle="Nazra, Hifz, Tajweed, Kids Class"
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />

            <StatCard
              icon={UserPlus}
              title="Admission Status"
              value="Open"
              subtitle="New students can apply"
              dotColor="#f59e0b"
              iconColor="#f59e0b"
            />

            <StatCard
              icon={Clock}
              title="Next Class"
              value="After Asr"
              subtitle="Kids Quran Class"
              dotColor="var(--accent-blue)"
              iconColor="var(--accent-blue)"
            />
          </section>

          <DataTable
            headers={[
              "#",
              "Class",
              "Teacher",
              "Timing",
              "Age Group",
              "Status",
              "Action",
            ]}
          >
            {QuranClassesData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.className}</strong>
                </td>

                <td>{item.teacher}</td>

                <td>{item.timing}</td>

                <td>{item.ageGroup}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Open"
                          ? "#dcfce7"
                          : "#fef3c7",
                      color:
                        item.status === "Open"
                          ? "#166534"
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

export default QuranClasses;