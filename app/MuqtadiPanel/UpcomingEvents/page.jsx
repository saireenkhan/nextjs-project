"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus, Layers, LayoutGrid, Users } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { UpcomingEventsFormSchema } from "@/Data/DataMuqtadi";
import { fetchEvents, createEvent } from "@/utils/api";

import "../../css/Pages.css";

// Helper function to format 24h time to 12h AM/PM format cleanly
const formatTimeTo12Hour = (timeStr) => {
  if (!timeStr || !timeStr.includes(":")) return timeStr;
  
  const parts = timeStr.split(":");
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] ? parts[1].slice(0, 2) : "00";
  
  if (isNaN(hours)) return timeStr;

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = hours < 10 ? "0" + hours : hours;

  return `${formattedHours}:${minutes} ${ampm}`;
};

const UpcomingEvents = () => {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic Auto-Calculated Stats State
  const [nearestEvent, setNearestEvent] = useState({ title: "No upcoming events", time: "--" });
  const [monthlyCountText, setMonthlyCountText] = useState("0 events this month");
  const [nextGuestSpeaker, setNextGuestSpeaker] = useState({ name: "None", topic: "No scheduled topic" });

  useEffect(() => {
    loadEventsData();
  }, []);

  const loadEventsData = async () => {
    setLoading(true);
    const data = await fetchEvents();
    const list = Array.isArray(data) ? data : [];
    setEventsList(list);
    calculateMetrics(list);
    setLoading(false);
  };

  const calculateMetrics = (currentList) => {
    if (!currentList || currentList.length === 0) {
      setNearestEvent({ title: "No upcoming events", time: "--" });
      setMonthlyCountText("0 events this month");
      setNextGuestSpeaker({ name: "None", topic: "No scheduled topic" });
      return;
    }

    // Get today's date in local YYYY-MM-DD format
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    // Filter out past events and sort chronologically
    const upcomingList = currentList
      .filter(e => {
        if (!e.date) return false;
        return e.date >= todayStr;
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    if (upcomingList.length === 0) {
      setNearestEvent({ title: "No upcoming events", time: "--" });
      setMonthlyCountText(`${currentList.length} Total Events`);
      setNextGuestSpeaker({ name: "None", topic: "No scheduled topic" });
      return;
    }

    const first = upcomingList[0];
    setNearestEvent({
      title: first.event || "No Event Name Provided",
      time: `${first.date || "No Date"} - ${formatTimeTo12Hour(first.time) || "No Time"}`
    });

    const totalCount = currentList.length;
    const bayans = currentList.filter(e => e.event && e.event.toLowerCase().includes("bayan")).length;
    const classes = currentList.filter(e => e.event && (e.event.toLowerCase().includes("class") || e.event.toLowerCase().includes("dars"))).length;
    const welfare = currentList.filter(e => e.event && (e.event.toLowerCase().includes("welfare") || e.event.toLowerCase().includes("program"))).length;
    
    setMonthlyCountText(`${totalCount} Total (${bayans} bayan, ${classes} classes, ${welfare} special)`);

    setNextGuestSpeaker({
      name: first.speaker || "No Speaker Provided",
      topic: first.topic || "No Topic Provided"
    });
  };

  const handleAddEvent = async (formData) => {
    const payload = {
      event: formData?.event || formData?.NextEvent || formData?.["Event Name"] || "",
      date: formData?.date || formData?.EventDate || formData?.["Event Date"] || "",
      time: formData?.time || formData?.EventTime || formData?.["Event Time"] || "",
      speaker: formData?.speaker || formData?.GuestKhateeb || formData?.["Guest Khateeb / Speaker"] || "",
      topic: formData?.topic || formData?.Topic || "",
      status: formData?.status || formData?.Status || "Confirmed",
    };

    if (!payload.event || !payload.date || !payload.time || !payload.speaker) {
      alert("Please fill out all required fields (Event Name, Date, Time, and Speaker).");
      return;
    }

    const result = await createEvent(payload);
    if (result && result.success) {
      alert("Event scheduled successfully!");
      setIsModalOpen(false);
      loadEventsData();
    } else {
      alert("Error scheduling event: " + (result?.error || "Unknown error"));
    }
  };

  const handleExportEventPDF = (id) => {
    window.open(`/api/events/${id}/export`, "_blank");
  };

  const filteredEvents = eventsList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.event && item.event.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.speaker && item.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.topic && item.topic.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <PageHeader title="Upcoming Events" />

            {/* <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#10b981",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              <Plus size={18} /> Add Event
            </button> */}
          </div>

          <div className="donation-info-box">
            Muqtadi can see upcoming dars, bayan, seerat program, Quran class, Ramadan lecture, and special events with automatic tracking.
          </div>

          <section className="stats-container">
            <StatCard 
              icon={Layers} 
              title="Nearest Event" 
              value={`${nearestEvent.title} (${nearestEvent.time})`} 
              dotColor="var(--accent-blue)" 
              iconColor="var(--accent-blue)" 
            />
            <StatCard 
              icon={LayoutGrid} 
              title="Events This Month" 
              value={monthlyCountText} 
              dotColor="var(--accent-green)" 
              iconColor="var(--accent-green)" 
            />
            <StatCard 
              icon={Users} 
              title={`Speaker: ${nextGuestSpeaker.name}`} 
              value={`Topic: ${nextGuestSpeaker.topic}`} 
              dotColor="#f59e0b" 
              iconColor="#f59e0b" 
            />
          </section>

          <div className="filters-row" style={{ marginTop: "20px" }}>
            <div className="search-box" style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search event, speaker, topic..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }} 
              />
            </div>
          </div>

          <DataTable
            headers={[
              "#",
              "Event",
              "Date",
              "Time",
              "Speaker",
              "Topic",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No upcoming events found.
                </td>
              </tr>
            ) : (
              filteredEvents.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td><strong>{item.event || "N/A"}</strong></td>
                  <td>{item.date || "N/A"}</td>
                  <td>{formatTimeTo12Hour(item.time) || "N/A"}</td>
                  <td>{item.speaker || "N/A"}</td>
                  <td>{item.topic || "N/A"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleExportEventPDF(item._id)}
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
              ))
            )}
          </DataTable>
        </div>
      </div>

      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Schedule New Event"
      >
        <AddClassForm fields={UpcomingEventsFormSchema} onSubmit={handleAddEvent} />
      </ModalWrapper>
    </div>
  );
};

export default UpcomingEvents;