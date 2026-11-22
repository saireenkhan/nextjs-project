"use client";

import React, { useState, useEffect } from "react";
import { Layers, LayoutGrid, Users, MapPin, RefreshCw } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";

import "../../css/Pages.css";

const PrayerTimings = () => {
  const [prayerList, setPrayerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("Detecting your exact location...");
  const [nextJamaat, setNextJamaat] = useState({ name: "--", time: "--" });
  const [hijriDate, setHijriDate] = useState("--");

  useEffect(() => {
    getUserLocationAndTimings();
  }, []);

  const getUserLocationAndTimings = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchPreciseTimings(latitude, longitude);
        },
        async (error) => {
          console.warn("Geolocation denied or unavailable:", error.message);
          // Fallback coordinate fallback set explicitly to match local regional standards
          setLocationName("Karachi, Pakistan (Default GPS)");
          await fetchPreciseTimings(24.8607, 67.0011);
        },
        { timeout: 12000, enableHighAccuracy: true }
      );
    } else {
      setLocationName("Geolocation not supported by browser");
      fetchPreciseTimings(24.8607, 67.0011);
    }
  };

  const fetchPreciseTimings = async (lat, lon) => {
    try {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const dateStr = `${day}-${month}-${year}`;

      // Using method=1 (University of Islamic Sciences, Karachi) with school=1 (Hanafi juristic standard)
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=1&school=1`
      );
      const data = await response.json();

      if (data && data.code === 200) {
        const timings = data.data.timings;
        const hijri = data.data.date.hijri;
        setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year} AH`);

        // Perform reverse geocoding lookup to display user's specific town/neighborhood cleanly
        try {
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          const geoData = await geoRes.json();
          if (geoData && geoData.address) {
            const area = geoData.address.suburb || geoData.address.neighbourhood || geoData.address.city || geoData.address.town || "Local Area";
            const city = geoData.address.city || geoData.address.state || "";
            setLocationName(`${area}, ${city}`);
          } else {
            setLocationName(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
          }
        } catch {
          setLocationName(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
        }

        formatAndSetPrayers(timings);
      } else {
        throw new Error("Failed to parse precise prayer database");
      }
    } catch (err) {
      console.error("Error fetching live scheduling data:", err);
      setLocationName("Error loading live coordinates");
      setLoading(false);
    }
  };

  const formatAndSetPrayers = (timings) => {
    const formatTime12h = (time24) => {
      if (!time24) return "--:--";
      const cleanTime = time24.split(" ")[0];
      const [h, m] = cleanTime.split(":");
      let hours = parseInt(h, 10);
      const minutes = m;
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes} ${ampm}`;
    };

    const addMinutes = (time24, mins) => {
      if (!time24) return "--:--";
      const cleanTime = time24.split(" ")[0];
      const [h, m] = cleanTime.split(":");
      const date = new Date();
      date.setHours(parseInt(h, 10), parseInt(m, 10) + mins, 0);
      return formatTime12h(`${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`);
    };

    const rawPrayers = [
      { name: "Fajr", azan: timings.Fajr, iqamahOffset: 20 },
      { name: "Dhuhr", azan: timings.Dhuhr, iqamahOffset: 15 },
      { name: "Asr", azan: timings.Asr, iqamahOffset: 15 },
      { name: "Maghrib", azan: timings.Maghrib, iqamahOffset: 10 },
      { name: "Isha", azan: timings.Isha, iqamahOffset: 15 },
    ];

    const now = new Date();
    let currentNextAssigned = false;
    let foundNext = { name: "Fajr", time: "--" };

    const formattedList = rawPrayers.map((p, index) => {
      const azanFormatted = formatTime12h(p.azan);
      const iqamahFormatted = addMinutes(p.azan, p.iqamahOffset);

      const cleanTime = p.azan.split(" ")[0];
      const [h, m] = cleanTime.split(":");
      const prayerTimeDate = new Date();
      prayerTimeDate.setHours(parseInt(h, 10), parseInt(m, 10), 0);

      let status = "Upcoming";
      if (now > prayerTimeDate) {
        status = "Completed";
      }

      if (!currentNextAssigned && now <= prayerTimeDate) {
        status = "Next";
        foundNext = { name: p.name, time: iqamahFormatted };
        currentNextAssigned = true;
      }

      return {
        id: index + 1,
        prayer: p.name,
        azanTime: azanFormatted,
        iqamahTime: iqamahFormatted,
        status: status,
      };
    });

    if (!currentNextAssigned && formattedList.length > 0) {
      formattedList[0].status = "Next";
      foundNext = { name: "Fajr", time: formattedList[0].iqamahTime };
    }

    setPrayerList(formattedList);
    setNextJamaat(foundNext);
    setLoading(false);
  };

  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Real-Time Location Info */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <PageHeader title="Prayer Timings" />

            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", padding: "8px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <MapPin size={16} color="var(--accent-blue)" />
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>{locationName}</span>
              <button 
                onClick={getUserLocationAndTimings}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                title="Refresh Location & Timings"
              >
                <RefreshCw size={14} color="#64748b" />
              </button>
            </div>
          </div>

          <div className="donation-info-box">
            Real-time automated local prayer schedules, precise GPS coordinates mapping, Azan times, and dynamic daily updates.
          </div>

          <section className="stats-container">
            <StatCard 
              icon={Layers} 
              title="Next Jamaat" 
              value={`${nextJamaat.name} - ${nextJamaat.time}`} 
              dotColor="var(--accent-blue)" 
              iconColor="var(--accent-blue)" 
            />
            <StatCard 
              icon={LayoutGrid} 
              title="Jummah Bayan" 
              value="1:30 PM" 
              dotColor="var(--accent-green)" 
              iconColor="var(--accent-green)" 
            />
            <StatCard 
              icon={Users} 
              title="Islamic Date" 
              value={hijriDate} 
              dotColor="#f59e0b" 
              iconColor="#f59e0b" 
            />
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
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  Fetching precise local coordinates and updating daily prayer intervals...
                </td>
              </tr>
            ) : prayerList.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  Unable to load live regional schedule. Please verify location access.
                </td>
              </tr>
            ) : (
              prayerList.map((item) => (
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
              ))
            )}
          </DataTable>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f8fafc",
              borderRadius: "10px",
              fontSize: "13px",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            Schedules update automatically day-by-day based on astronomical formulas calibrated for your exact regional area.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimings;