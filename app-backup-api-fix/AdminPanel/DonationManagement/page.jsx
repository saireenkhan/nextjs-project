"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus, Calendar } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { DonationFormSchema } from "@/Data/Data";

import "../../css/Pages.css";


const DonationManagement = () => {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==========================================================
  // FILTER STATES
  // ==========================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [selectedPanelFilter, setSelectedPanelFilter] = useState("All");
  
  // NEW: Date Filter States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Admin creates admin-only records
  const CURRENT_PANEL = "admin";


  // ==========================================================
  // LOAD ALL DONATIONS
  // ADMIN IS MASTER VIEW
  // ==========================================================

  useEffect(() => {
    loadDonations();
  }, []);


  const loadDonations = async () => {

    setLoading(true);

    try {

      // No panel query here.
      // Admin receives ALL donations.

      const res = await fetch(
        "http://localhost:5002/api/donations"
      );

      const result = await res.json();

      const data =
        result?.data ||
        (Array.isArray(result) ? result : []);

      setDonations(data);

    } catch (error) {

      console.error(
        "Error fetching donations:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================================
  // ADD ADMIN DONATION
  // ==========================================================

  const handleAddDonation = async (formData) => {

    const payload = {

      // VERY IMPORTANT
      // This donation belongs to Admin.
      panel: CURRENT_PANEL,

      donorName:
        formData?.donorName ||
        formData?.["Donor Name"] ||
        "Anonymous",

      donorPhone:
        formData?.donorPhone ||
        formData?.["Donor Phone"] ||
        "",

      donorCNIC:
        formData?.donorCNIC ||
        formData?.["Donor CNIC"] ||
        "",

      donationType:
        formData?.donationType ||
        formData?.["Donation Type"] ||
        "Cash",

      fundCategory:
        formData?.fundCategory ||
        formData?.["Fund Category"] ||
        "General Donation",

      amount: Number(
        formData?.amount ||
        formData?.["Amount"] ||
        0
      ),

      donationDate:
        formData?.donationDate ||
        formData?.["Donation Date"] ||
        new Date().toISOString().split("T")[0],

      receiptNumber:
        formData?.receiptNumber ||
        formData?.["Receipt Number"] ||
        `RCP-${Math.floor(
          1000 + Math.random() * 9000
        )}`,

      status:
        formData?.status ||
        formData?.["Status"] ||
        "Completed",

      notes:
        formData?.notes ||
        formData?.["Notes"] ||
        "",
    };


    try {

      const res = await fetch(
        "http://localhost:5002/api/donations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();


      if (result.success) {

        alert(
          "Donation saved successfully with Receipt Number: " +
          payload.receiptNumber
        );

        setIsModalOpen(false);

        loadDonations();

      } else {

        alert(
          "Error saving donation: " +
          (result.error || "Unknown error")
        );

      }

    } catch (error) {

      console.error(
        "Submission network error:",
        error
      );

      alert(
        "Failed to connect to server."
      );
    }
  };


  // ==========================================================
  // PDF
  // ==========================================================

  const handleDownloadPdf = (id) => {

    window.open(
      `http://localhost:5002/api/donations/${id}/pdf`,
      "_blank"
    );
  };


  // ==========================================================
  // SEARCH + FILTER + DATE FILTER
  // ==========================================================

  const filteredDonations = donations.filter((item) => {

    const query =
      searchQuery.toLowerCase();


    const matchesSearch =
      !query ||
      item.donorName
        ?.toLowerCase()
        .includes(query) ||
      item.receiptNumber
        ?.toLowerCase()
        .includes(query) ||
      item._id
        ?.toLowerCase()
        .includes(query);


    const matchesType =
      selectedTypeFilter === "All" ||
      item.donationType ===
        selectedTypeFilter;


    const matchesCategory =
      selectedCategoryFilter === "All" ||
      item.fundCategory ===
        selectedCategoryFilter;


    const matchesPanel =
      selectedPanelFilter === "All" ||
      (
        item.panel &&
        item.panel.toLowerCase() ===
          selectedPanelFilter.toLowerCase()
      );

    // NEW: Date Filter Logic
    let matchesDate = true;
    
    if (startDate && item.donationDate) {
      const itemDate = new Date(item.donationDate);
      const start = new Date(startDate);
      if (itemDate < start) matchesDate = false;
    }
    
    if (endDate && item.donationDate) {
      const itemDate = new Date(item.donationDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include the entire end date
      if (itemDate > end) matchesDate = false;
    }


    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesPanel &&
      matchesDate
    );
  });


  // ==========================================================
  // UI
  // ==========================================================

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
               <PageHeader title="Donation Management" />
             </div>
           
             <button className="btn-add-staff">
               <Plus size={18} />
               Add Donation
             </button>
             </div>


          {/* =================================================
              INFO
          ================================================= */}

          <div className="donation-info-box">

            Admin master view: Track, review, and manage
            donations from all facility panels.

          </div>

{/* =================================================
    MODERN FILTERS ROW
================================================= */}

<div className="filters-row">

  {/* SEARCH BOX */}
  <div className="search-box">
    <Search size={16} className="search-icon" />
    <input
      type="text"
      placeholder="Search donations..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  {/* PANEL FILTER */}
  <select
    className="filter-select"
    value={selectedPanelFilter}
    onChange={(e) => setSelectedPanelFilter(e.target.value)}
  >
    <option value="All">All Panels</option>
    <option value="admin">Admin</option>
    <option value="accounts">Accounts</option>
  </select>

  {/* DONATION TYPE */}
  <select
    className="filter-select"
    value={selectedTypeFilter}
    onChange={(e) => setSelectedTypeFilter(e.target.value)}
  >
    <option value="All">All Types</option>
    <option value="Cash">Cash</option>
    <option value="Online">Online</option>
    <option value="Online Transfer">Online Transfer</option>
    <option value="Cheque">Cheque</option>
    <option value="Bank Transfer">Bank Transfer</option>
  </select>

  {/* CATEGORY */}
  <select
    className="filter-select"
    value={selectedCategoryFilter}
    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
  >
    <option value="All">All Categories</option>
    <option value="General Donation">General</option>
    <option value="Zakat">Zakat</option>
    <option value="Zakat Fund">Zakat Fund</option>
    <option value="Sadaqah">Sadaqah</option>
    <option value="Masjid Fund">Masjid Fund</option>
    <option value="Building Fund">Building Fund</option>
    <option value="Education Fund">Education Fund</option>
  </select>

  {/* DATE FILTER */}
  <div className="date-filter-wrapper">
    <Calendar size={16} className="calendar-icon" />
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      placeholder="From"
    />
    <span className="date-separator">→</span>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      placeholder="To"
    />
    {(startDate || endDate) && (
      <button
        className="clear-date-btn"
        onClick={() => {
          setStartDate("");
          setEndDate("");
        }}
        title="Clear date filter"
      >
        ✕
      </button>
    )}
  </div>

</div>
          {/* =================================================
              TABLE
          ================================================= */}

          <DataTable
            headers={[
              "#",
              "Donation ID",
              "Panel Source",
              "Donor Name",
              "Donation Type",
              "Category",
              "Amount",
              "Date",
              "Action",
            ]}
          >

            {loading ? (

              <tr>

                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  Loading database records...
                </td>

              </tr>

            ) : filteredDonations.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No matching donations found.
                </td>

              </tr>

            ) : (

              filteredDonations.map(
                (item, index) => (

                  <tr
                    key={
                      item._id ||
                      item.id ||
                      index
                    }
                  >

                    <td>
                      {index + 1}
                    </td>


                    <td>
                      <strong>
                        {
                          item.receiptNumber ||
                          item._id
                        }
                      </strong>
                    </td>


                    <td>

                      <span
                        style={{
                          textTransform:
                            "capitalize",
                          background:
                            "#e0f2fe",
                          color:
                            "#0369a1",
                          padding:
                            "2px 8px",
                          borderRadius:
                            "12px",
                          fontSize:
                            "12px",
                          fontWeight:
                            "600",
                        }}
                      >

                        {item.panel ||
                          "Unknown"}

                      </span>

                    </td>


                    <td>
                      <strong>
                        {item.donorName}
                      </strong>
                    </td>


                    <td>
                      {item.donationType}
                    </td>


                    <td>
                      {item.fundCategory}
                    </td>


                    <td>
                      Rs. {item.amount}
                    </td>


                    <td>
                       {item.donationDate}

                    </td>


                    <td>

                      <button
                        type="button"
                        onClick={() =>
                          handleDownloadPdf(
                            item._id
                          )
                        }
                        style={{
                          display:
                            "inline-flex",
                          alignItems:
                            "center",
                          gap: "6px",
                          background:
                            "#f3f4f6",
                          border:
                            "1px solid #d1d5db",
                          padding:
                            "6px 12px",
                          borderRadius:
                            "6px",
                          cursor:
                            "pointer",
                          color:
                            "#dc2626",
                          fontWeight:
                            "600",
                        }}
                      >

                        <FileText
                          size={14}
                        />

                        PDF

                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </DataTable>

        </div>

      </div>


      {/* =====================================================
          ADMIN MODAL
      ===================================================== */}

      <ModalWrapper
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        title="Add New Donation (Admin)"
      >

        <AddClassForm
          fields={DonationFormSchema}
          onSubmit={
            handleAddDonation
          }
        />

      </ModalWrapper>

    </div>
  );
};


export default DonationManagement;