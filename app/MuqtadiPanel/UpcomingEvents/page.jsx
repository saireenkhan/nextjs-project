"use client";

import React from "react";
import { FileText } from "lucide-react";
import { Layers, LayoutGrid, Users, Search } from 'lucide-react';

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import StatCard from '@/components/StatCard';
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  UpcomingEventsFormSchema,
  UpcomingEventsData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const UpcomingEvents = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Upcoming Events"
          />

          <div className="donation-info-box">
            Muqtadi can see upcoming dars, bayan,
            seerat program, nikah, Quran class,
            Ramadan lecture and special events.
          </div>

          <section className="stats-container">
            <StatCard icon={Layers} title=" Next Event Jummah Bayan" value="Asr - 1:00 PM - Main Hall" dotColor="#555" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="This Month" value="3 bayan, 2 classes, 1 welfare event" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Guest Mufti Saad" value="Seerat-un-Nabi Program" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <DataTable
            headers={[
              "#",
              "Event",
              "Date",
              "Time",
              "Speaker",
              "Location",
              "Action",
            ]}
          >
            {UpcomingEventsData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.event}</strong>
                </td>

                <td>{item.date}</td>

                <td>{item.time}</td>

                <td>{item.speaker}</td>

                <td>{item.location}</td>

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

export default UpcomingEvents;