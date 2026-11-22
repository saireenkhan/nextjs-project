"use client";

import React, { useState, useEffect } from "react";
import { FileText, Plus, Search, Star } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { RatingFormSchema } from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const Ratings = () => {
  const [ratingList, setRatingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Metrics State
  const [totalRatings, setTotalRatings] = useState("00");
  const [overallAvg, setOverallAvg] = useState("0.0");
  const [publicCount, setPublicCount] = useState("00");

  const CURRENT_PANEL = "muqtadi"; // Set panel scope context

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5002/api/ratings");
      const result = await res.json();
      const data = result?.data || (Array.isArray(result) ? result : []);
      
      // Filter ONLY ratings belonging to this specific panel so it only shows data for this page and syncs to admin
      const filteredByPanel = data.filter(
        (item) => !item.panel || item.panel.toLowerCase() === CURRENT_PANEL.toLowerCase()
      );

      setRatingList(filteredByPanel);
      calculateMetrics(filteredByPanel);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
    setLoading(false);
  };

  const calculateMetrics = (list) => {
    const total = list.length;
    setTotalRatings(total < 10 ? `0${total}` : `${total}`);

    if (total > 0) {
      const sum = list.reduce((acc, curr) => acc + Number(curr.averageRating || 0), 0);
      setOverallAvg((sum / total).toFixed(1));
    } else {
      setOverallAvg("0.0");
    }

    const pub = list.filter(item => item.publicDisplay === "Yes").length;
    setPublicCount(pub < 10 ? `0${pub}` : `${pub}`);
  };

  const handleAddRating = async (formData) => {
    const generatedId = `RAT-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      ratingId: formData?.ratingId || formData?.["Rating ID"] || generatedId,
      panel: CURRENT_PANEL, // Tag record explicitly with current panel ("muqtadi") so it syncs to admin
      personType: formData?.personType || formData?.["Person Type"] || "",
      personName: formData?.personName || formData?.["Person Name"] || "",
      averageRating: Number(formData?.averageRating || formData?.["Average Rating"] || 5),
      feedbackBy: formData?.feedbackBy || formData?.["Feedback By"] || "Anonymous",
      date: formData?.date || formData?.Date || new Date().toISOString().split('T')[0],
      publicDisplay: formData?.publicDisplay || formData?.["Public Display"] || "Yes",
      comments: formData?.comments || formData?.Comments || "",
    };

    try {
      const res = await fetch("http://localhost:5002/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        alert("Rating submitted successfully!");
        setIsModalOpen(false);
        loadData();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Submission network error:", error);
      alert("Failed to connect to server.");
    }
  };

  const handleExportPDF = (id) => {
    window.open(`http://localhost:5002/api/ratings/${id}/export`, "_blank");
  };

  const filteredRatings = ratingList.filter((item) => {
    return (
      !searchQuery ||
      item.ratingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.personType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.personName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.feedbackBy?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <PageHeader title="Muqtadi Panel - Masjid Star Rating System" />

            <button 
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
              }}
            >
              <Plus size={18} /> Give New Rating
            </button>
          </div>

          <div className="donation-info-box">
            Muqtadis can rate Imam, Moazzin, and Committee Members from 1 to 5 stars.
          </div>

          <section className="stats-container">
            <StatCard
              icon={Star}
              title="Total Feedback Entries"
              value={totalRatings}
              subtitle="Recorded in system"
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />
            <StatCard
              icon={Star}
              title="Overall Average Score"
              value={`${overallAvg} / 5`}
              subtitle="Cumulative community score"
              dotColor="#f59e0b"
              iconColor="#f59e0b"
            />
            <StatCard
              icon={FileText}
              title="Publicly Displayed"
              value={publicCount}
              subtitle="Visible on community boards"
              dotColor="var(--accent-blue)"
              iconColor="var(--accent-blue)"
            />
          </section>

          <div className="filters-row" style={{ marginTop: "20px" }}>
            <div className="search-box" style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search ID, role, staff name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }} 
              />
            </div>
          </div>

          <DataTable
            headers={[
              "#",
              "Rating ID",
              "Panel Source",
              "Person Type",
              "Person Name",
              "Average Rating",
              "Feedback By",
              "Date",
              "Public Display",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                  Loading ratings dataset...
                </td>
              </tr>
            ) : filteredRatings.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                  No rating records found for Muqtadi panel.
                </td>
              </tr>
            ) : (
              filteredRatings.map((item, index) => (
                <tr key={item._id || item.id}>
                  <td>{index + 1}</td>
                  <td><strong>{item.ratingId}</strong></td>
                  <td>
                    <span style={{ 
                      textTransform: "capitalize", 
                      background: "#e0f2fe", 
                      color: "#0369a1", 
                      padding: "2px 8px", 
                      borderRadius: "12px", 
                      fontSize: "12px", 
                      fontWeight: "600" 
                    }}>
                      {item.panel || CURRENT_PANEL}
                    </span>
                  </td>
                  <td>{item.personType}</td>
                  <td>{item.personName}</td>
                  <td style={{ fontWeight: "600", color: "#d97706" }}>
                    {item.averageRating} ⭐
                  </td>
                  <td>{item.feedbackBy}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.publicDisplay === "Yes"
                            ? "#dcfce7"
                            : "#fef3c7",
                        color:
                          item.publicDisplay === "Yes"
                            ? "#166534"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.publicDisplay}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleExportPDF(item._id || item.id)}
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
                      <FileText size={14} /> PDF
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
        title="Submit New Star Rating"
      >
        <AddClassForm fields={RatingFormSchema} onSubmit={handleAddRating} />
      </ModalWrapper>
    </div>
  );
};

export default Ratings;