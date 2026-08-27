"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarMoazzin from "../../../components/SidebarMoazzin";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { RatingsFormSchema } from "@/Data/DataMoazzin";
import { fetchRatings, createRating } from "@/utils/api";

import "../../css/Pages.css";

const RatingsMoz = () => {
  const [ratingsList, setRatingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("All");

  const CURRENT_PANEL = "moazzin"; // Set panel scope context

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    setLoading(true);
    try {
      // Fetches ONLY ratings belonging to this specific panel for the Moazzin view
      const data = await fetchRatings();
      const rawData = Array.isArray(data) ? data : (data?.data || []);
      const filteredByPanel = rawData.filter(
        (item) => !item.panel || item.panel.toLowerCase() === CURRENT_PANEL.toLowerCase()
      );
      setRatingsList(filteredByPanel);
    } catch (error) {
      console.error("Failed to fetch ratings:", error);
    }
    setLoading(false);
  };

  const handleAddRating = async (formData) => {
    console.log("Raw Moazzin Rating Form Data Received:", formData);

    const today = new Date().toISOString().split("T")[0];
    const generatedId = `RAT-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      ratingId: formData?.ratingId || formData?.["Rating ID"] || generatedId,
      panel: CURRENT_PANEL, // Tag record explicitly with current panel ("moazzin") so it syncs to admin
      personType: formData?.personType || formData?.["Person Type"] || "Moazzin",
      personName: formData?.personName || formData?.["Person Name"] || "Staff Member",
      averageRating: formData?.averageRating || formData?.["Average Rating"] || formData?.["Rating"] || "5",
      feedbackBy: formData?.feedbackBy || formData?.["Feedback By"] || "Muqtadi",
      publicDisplay: formData?.publicDisplay || formData?.["Public Display"] || "Yes",
      date: formData?.date || formData?.["Date"] || today,
    };

    console.log("Processed Moazzin Rating Payload Sent to Database:", payload);

    if (!payload.personName || !payload.ratingId || !payload.date) {
      alert("Error: Missing required fields (Rating ID, Person Name, or Date).");
      return;
    }

    const result = await createRating(payload);
    if (result && result.success) {
      alert("Rating submitted successfully!");
      setIsModalOpen(false);
      loadRatings();
    } else {
      alert("Error saving rating: " + (result?.error || "Unknown error"));
    }
  };

  const handleViewRating = (id) => {
    window.open(`http://localhost:5000/api/ratings/${id}/details`, "_blank");
  };

  // Filter & Search Logic
  const filteredRatings = ratingsList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.ratingId && item.ratingId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.personName && item.personName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.feedbackBy && item.feedbackBy.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = 
      selectedTypeFilter === "All" || 
      (item.personType && item.personType.toLowerCase() === selectedTypeFilter.toLowerCase());

    return matchesSearch && matchesType;
  });

  return (
    <div className="campus-layout">
      <SidebarMoazzin />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Trigger Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <PageHeader title="Moazzin Panel - Ratings Management" />

            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--primary-color, #10b981)",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              <Plus size={18} /> Add Rating
            </button>
          </div>

          <div className="donation-info-box">
            Muqtadis can rate Imam, Moazzin and Committee Members from 1 to 5 stars.
          </div>

          {/* Search & Filters Row */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Rating ID, Person Name, Feedback By..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            <select 
              className="filter-select"
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Imam">Imam</option>
              <option value="Moazzin">Moazzin</option>
              <option value="Committee Member">Committee Member</option>
            </select>
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
              "Public Display",
              "Date",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredRatings.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                  No rating records found for Moazzin panel.
                </td>
              </tr>
            ) : (
              filteredRatings.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>

                  <td>
                    <strong>{item.ratingId}</strong>
                  </td>

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

                  <td>{item.averageRating} ⭐</td>

                  <td>{item.feedbackBy}</td>

                  <td>{item.publicDisplay}</td>

                  <td>{item.date}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleViewRating(item._id)}
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
              ))
            )}
          </DataTable>
        </div>
      </div>

      {/* Modal Wrapper for Form */}
      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Submit New Rating"
      >
        <AddClassForm fields={RatingsFormSchema} onSubmit={handleAddRating} />
      </ModalWrapper>
    </div>
  );
};

export default RatingsMoz;