"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, FileText } from "lucide-react";

import SidebarImam from "../../../components/SidebarImam";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { RatingFormSchema } from "@/Data/DataMuqtadi";
import "../../css/Pages.css";

const RatingImam = () => {
  const [ratingList, setRatingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPersonTypeFilter, setSelectedPersonTypeFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CURRENT_PANEL = "imam"; // Set panel scope context

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`http://localhost:5002/api/ratings?panel=${CURRENT_PANEL}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const result = await res.json();
      const rawData = result?.data || (Array.isArray(result) ? result : []);
      setRatingList(rawData);
    } catch (error) {
      console.error("Failed to fetch ratings:", error);
    }
    setLoading(false);
  };

  const handleAddRating = async (formData) => {
    console.log("Raw Imam Rating Form Data Received:", formData);

    const generatedId = `RTG-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toISOString().split('T')[0];

    const payload = {
      ratingId: formData?.ratingId || formData?.["Rating ID"] || generatedId,
      panel: CURRENT_PANEL, // Tag record with current panel ("imam")
      personType: formData?.personType || formData?.["Person Type"] || "Imam",
      personName: formData?.personName || formData?.["Person Name"] || "",
      averageRating: formData?.averageRating || formData?.["Average Rating"] || "5.0",
      feedbackBy: formData?.feedbackBy || formData?.["Feedback By"] || "Anonymous",
      date: formData?.date || formData?.["Date"] || currentDate,
    };

    console.log("Processed Imam Rating Payload Sent to Database:", payload);

    if (!payload.personName || !payload.ratingId || !payload.date) {
      alert("Error: Missing required fields (Rating ID, Person Name, or Date).");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:5002/api/ratings", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Added Authorization Token Header
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        alert("Rating submitted successfully!");
        setIsModalOpen(false);
        loadData();
      } else {
        alert("Error: " + (result.error || "Validation failed"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to connect to backend server.");
    }
  };

  // Search & Filter Logic matching the Admin Panel style
  const filteredRatings = ratingList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.personName && item.personName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.ratingId && item.ratingId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.feedbackBy && item.feedbackBy.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPersonType = 
      selectedPersonTypeFilter === "All" || 
      (item.personType && item.personType.toLowerCase() === selectedPersonTypeFilter.toLowerCase());

    return matchesSearch && matchesPersonType;
  });

  return (
    <div className="campus-layout">
      <SidebarImam />

      <div className="main-content">
        <Header />

          <div className="page-container">
          {/* Header Row with Right-End Trigger Button */}
           <div
             style={{
               display: "flex",
               alignItems: "center",
               width: "100%",
               marginBottom: "16px",
               gap: "20px",
             }}
           >
             <div style={{ flex: 1, minWidth: 0 }}>
               <PageHeader title="Rating Management" />
             </div>

                  <button   
                  
                    type="button"
                    className="btn-add-staff"
                    onClick={() => setIsModalOpen(true)}
                  >

                  <Plus size={18} />

                   Add Rating

                  </button>

                   </div>

          <div className="donation-info-box">
            Manage and view star rating submissions for the Imam panel.
          </div>

          {/* ================= SEARCH & FILTERS ROW ================= */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Rating ID, Person Name or Feedback By..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            {/* Person Type Filter */}
            <select 
              className="filter-select"
              value={selectedPersonTypeFilter}
              onChange={(e) => setSelectedPersonTypeFilter(e.target.value)}
            >
              <option value="All">All Person Types</option>
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
              "Date",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  Loading records...
                </td>
              </tr>
            ) : filteredRatings.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No records found for Imam panel.
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

                  <td>{item.date}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => window.open(`http://localhost:5002/api/ratings/${item._id}/export`, "_blank")}
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
        title="Add Imam Panel Rating"
      >
        <AddClassForm fields={RatingFormSchema} onSubmit={handleAddRating} />
      </ModalWrapper>
    </div>
  );
};

export default RatingImam;