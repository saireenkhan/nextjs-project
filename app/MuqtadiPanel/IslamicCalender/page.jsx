"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar, Star, BookOpen, Clock } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";

import "../../css/Pages.css";

// Comprehensive dataset of Islamic Months and their famous events
const IslamicMonthsData = [
  { id: 1, monthNumber: 1, hijriMonth: "Muharram", famousEvent: "Day of Ashura (10th Muharram)", significance: "Martyrdom of Imam Hussain (RA) & saving of Prophet Musa (AS).", season: "Sacred Month" },
  { id: 2, monthNumber: 2, hijriMonth: "Safar", famousEvent: "Migration (Hijrah) preparation", significance: "Historic events marking early Islamic perseverance.", season: "General Month" },
  { id: 3, monthNumber: 3, hijriMonth: "Rabi-ul-Awwal", famousEvent: "Milad-un-Nabi / 12th Rabi-ul-Awwal", significance: "Birth and passing of the Holy Prophet Muhammad (PBUH).", season: "Blessed Month" },
  { id: 4, monthNumber: 4, hijriMonth: "Rabi-ul-Thani", famousEvent: "Gatherings of Ghaus-e-Azam (RA) remembrance", significance: "Spiritual lectures, gatherings, and charity works.", season: "General Month" },
  { id: 5, monthNumber: 5, hijriMonth: "Jumada-ul-Awwal", famousEvent: "Historical Islamic Campaigns & Milestones", significance: "Early Islamic history milestones and expeditions.", season: "General Month" },
  { id: 6, monthNumber: 6, hijriMonth: "Jumada-ul-Thani", famousEvent: "Passing of Hazrat Fatima (RA)", significance: "Commemoration of the life and legacy of Sayyidatun Nisa al-Alamin.", season: "General Month" },
  { id: 7, monthNumber: 7, hijriMonth: "Rajab", famousEvent: "Shab-e-Miraj (27th Rajab)", significance: "The Night Journey and Ascension of Prophet Muhammad (PBUH).", season: "Sacred Month" },
  { id: 8, monthNumber: 8, hijriMonth: "Shaban", famousEvent: "Shab-e-Barat (15th Shaban)", significance: "Night of forgiveness, decree, and special night prayers.", season: "Preparation Month" },
  { id: 9, monthNumber: 9, hijriMonth: "Ramadan", famousEvent: "Laylat-ul-Qadr & Quran Revelation", significance: "Fasting month; Night of Power better than a thousand months.", season: "Peak Blessed Month" },
  { id: 10, monthNumber: 10, hijriMonth: "Shawwal", famousEvent: "Eid-ul-Fitr (1st Shawwal)", significance: "Celebration of breaking the fast and gratitude to Allah.", season: "Festive Month" },
  { id: 11, monthNumber: 11, hijriMonth: "Dhul-Qa'dah", famousEvent: "Sacred Month Preceding Hajj", significance: "One of the four sacred months wherein warfare is forbidden.", season: "Sacred Month" },
  { id: 12, monthNumber: 12, hijriMonth: "Dhul-Hijjah", famousEvent: "Hajj & Eid-ul-Adha (9th-10th Dhul-Hijjah)", significance: "The annual pilgrimage to Makkah and Day of Arafah.", season: "Sacred & Hajj Season" },
];

const IslamicCalendar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentHijriDate, setCurrentHijriDate] = useState("Loading date...");
  const [nextEvent, setNextEvent] = useState({ month: "", event: "" });

  useEffect(() => {
    // 1. Calculate dynamic current Islamic Date using Intl API (Islamic/Umm al-Qura)
    try {
      const options = { calendar: 'islamic-umalqura', day: 'numeric', month: 'long', year: 'numeric' };
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', options);
      const formattedDate = formatter.format(new Date());
      setCurrentHijriDate(formattedDate);

      // Extract current month name to compute the upcoming/next event dynamically
      const currentMonthName = formattedDate.split(" ")[1]?.replace(",", "");
      
      const matchedIndex = IslamicMonthsData.findIndex(
        (m) => m.hijriMonth.toLowerCase().includes(currentMonthName?.toLowerCase() || "")
      );

      if (matchedIndex !== -1) {
        // Find next event (loop to next index or wrap around to Muharram)
        const nextIndex = (matchedIndex + 1) % IslamicMonthsData.length;
        setNextEvent({
          month: IslamicMonthsData[nextIndex].hijriMonth,
          event: IslamicMonthsData[nextIndex].famousEvent
        });
      } else {
        setNextEvent({ month: "Rabi-ul-Awwal", event: "Milad-un-Nabi / 12th Rabi-ul-Awwal" });
      }
    } catch (error) {
      setCurrentHijriDate("02 Rabi-ul-Awwal 1448 AH");
      setNextEvent({ month: "Rabi-ul-Awwal", event: "Milad-un-Nabi / 12th Rabi-ul-Awwal" });
    }
  }, []);

  const filteredMonths = IslamicMonthsData.filter((item) => {
    return (
      !searchQuery ||
      item.hijriMonth.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.famousEvent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.significance.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader title="Islamic Calendar & Famous Events" />

          <div className="donation-info-box">
            Explore the 12 sacred Hijri months alongside their prominent historical and spiritual milestones.
          </div>

          <section className="stats-container">
            <StatCard
              icon={Calendar}
              title="Current Islamic Date"
              value={currentHijriDate}
              subtitle="Live Lunar Calendar Tracker"
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />

            <StatCard
              icon={Clock}
              title="Next Upcoming Event"
              value={nextEvent.month}
              subtitle={nextEvent.event}
              dotColor="#f59e0b"
              iconColor="#f59e0b"
            />

            <StatCard
              icon={BookOpen}
              title="Peak Event Highlight"
              value="Ramadan"
              subtitle="Laylat-ul-Qadr & Quran Revelation"
              dotColor="var(--accent-blue)"
              iconColor="var(--accent-blue)"
            />
          </section>

          <div className="filters-row" style={{ marginTop: "20px" }}>
            <div className="search-box" style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search month, famous event, significance..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }} 
              />
            </div>
          </div>

          <DataTable
            headers={[
              "#",
              "Hijri Month",
              "Famous Highlight Event",
              "Spiritual & Historical Significance",
              "Season Type",
            ]}
          >
            {filteredMonths.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No matching Islamic calendar records found.
                </td>
              </tr>
            ) : (
              filteredMonths.map((item) => (
                <tr key={item.id}>
                  <td>{item.monthNumber < 10 ? `0${item.monthNumber}` : item.monthNumber}</td>

                  <td>
                    <strong>{item.hijriMonth}</strong>
                  </td>

                  <td>
                    <span style={{ color: "#047857", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      ⭐ {item.famousEvent}
                    </span>
                  </td>

                  <td>{item.significance}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.season === "Peak Blessed Month"
                            ? "#dbeafe"
                            : item.season === "Sacred Month"
                            ? "#fef3c7"
                            : item.season === "Festive Month"
                            ? "#d1fae5"
                            : "#e5e7eb",
                        color:
                          item.season === "Peak Blessed Month"
                            ? "#1e40af"
                            : item.season === "Sacred Month"
                            ? "#92400e"
                            : item.season === "Festive Month"
                            ? "#065f46"
                            : "#374151",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.season}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default IslamicCalendar;