"use client";

import React from "react";
import { Clock } from "lucide-react";
import { Layers, LayoutGrid, Users, Search } from 'lucide-react';

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatCard from '@/components/StatCard';

import {
  PrayerTimingsData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const PrayerTimings = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Prayer Timings"
          />

          <div className="donation-info-box">
            View daily prayer timings, Azan schedule,
            Iqamah timings and prayer status.
          </div>
          <section className="stats-container">
            <StatCard icon={Layers} title="Next Jamaat" value="Asr - 4:45 PM" dotColor="#555" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title=" Jummah Bayan starts" value="1:30 PM" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Islamic Date" value="15 Ramadan" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>
          <DataTable
            headers={[
              "#",
              "Prayer",
              "Azan Time",
              "Iqamah Time",
              "Status",
            ]}
          >
            {PrayerTimingsData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.prayer}</strong>
                </td>

                <td>{item.azanTime}</td>

                <td>{item.iqamahTime}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.status === "Completed"
                          ? "#dcfce7"
                          : item.status === "Next"
                          ? "#dbeafe"
                          : "#fef3c7",
                      color:
                        item.status === "Completed"
                          ? "#166534"
                          : item.status === "Next"
                          ? "#1e40af"
                          : "#92400e",
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

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f8fafc",
              borderRadius: "10px",
            }}
          >

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimings;