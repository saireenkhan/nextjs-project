"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { RatingsFormSchema } from "@/Data/Data";
import { fetchRatings, createRating } from "@/utils/api";

import "../../css/Pages.css";

const Rattings = () => {
  const [ratingsList, setRatingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPersonTypeFilter, setSelectedPersonTypeFilter] = useState("All");

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    setLoading(true);
    // Fetches all ratings from all panels combined for the Admin Panel
    const data = await fetchRatings();
    setRatingsList(Array.isArray(data) ? data : (data?.data || []));
    setLoading(false);
  };

  const handleAddRating = async (formData) => {
    console.log("Raw Rating Form Data Received:", formData);

    const payload = {
      ratingId: formData?.ratingId || formData?.["Rating ID"] || `RAT-${Math.floor(100 + Math.random() * 900)}`,
      panel: "admin", // Tagged explicitly as created/managed from the admin side
      personType: formData?.personType || formData?.["Person Type"] || "Imam",
      personName: formData?.personName || formData?.["Person Name"] || "",
      averageRating: formData?.averageRating || formData?.["Average Rating"] || "5.0",
      feedbackBy: formData?.feedbackBy || formData?.["Feedback By"] || "Anonymous",
      date: formData?.date || formData?.["Date"] || new Date().toISOString().split("T")[0],
    };

    console.log("Processed Rating Payload Sent to Database:", payload);

    // Validation guard to prevent sending empty required fields
    if (!payload.personName || !payload.ratingId || !payload.date) {
      alert("Error: Missing required fields (Rating ID, Person Name, or Date).");
      return;
    }

    const result = await createRating(payload);
    if (result && result.success) {
      alert("Rating added successfully!");
      setIsModalOpen(false);
      loadRatings();
    } else {
      alert("Error saving rating: " + (result?.error || "Unknown error"));
    }
  };

  const handleDownloadPdf = (id) => {
    window.open(`/api/ratings/${id}/pdf`, "_blank");
  };

  // Filtering and Searching Logic
  const filteredRatings = ratingsList.filter((item) => {
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
      <Sidebar2 />

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
           
             <button type="button" onClick={() => setIsModalOpen(true)} className="btn-add-staff">
               <Plus size={18} />
               Add Rating
             </button>
             </div>

          <div className="donation-info-box">
            Muqtadis can rate Imam, Moazzin and Committee Members from 1 to 5 stars.
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
                  Loading database records...
                </td>
              </tr>
            ) : filteredRatings.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No matching rating records found in database.
                </td>
              </tr>
            ) : (
              filteredRatings.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.id || index + 1}</td>

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
                      {item.panel || "admin"}
                    </span>
                  </td>

                  <td>{item.personType}</td>

                  <td>{item.personName}</td>

                  <td>{item.averageRating}</td>

                  <td>{item.feedbackBy}</td>

                  <td>{item.date}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(item._id)}
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

      {/* Modal Wrapper Containing Form */}
      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Rating"
      >
        <AddClassForm fields={RatingsFormSchema} onSubmit={handleAddRating} />
      </ModalWrapper>
    </div>
  );
};

export default Rattings;