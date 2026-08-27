"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

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
        "http://localhost:5000/api/donations"
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
        "http://localhost:5000/api/donations",
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
      `http://localhost:5000/api/donations/${id}/pdf`,
      "_blank"
    );
  };


  // ==========================================================
  // SEARCH + FILTER
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


    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesPanel
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


          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >

            <PageHeader
              title="Admin Panel - Donation Management"
            />


            <button
              onClick={() =>
                setIsModalOpen(true)
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor:
                  "var(--primary-color, #346997)",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                boxShadow:
                  "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >

              <Plus size={18} />

              Add New Donation

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
              FILTERS
          ================================================= */}

          <div
            className="filters-row"
            style={{
              flexWrap: "wrap",
              gap: "12px",
            }}
          >

            <div
              className="search-box"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "300px",
              }}
            >

              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "12px",
                  color: "#555",
                }}
              />

              <input
                type="text"
                placeholder="Search by Donor or Receipt..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                style={{
                  paddingLeft: "40px",
                  width: "100%",
                }}
              />

            </div>


            {/* PANEL */}

            <select
              className="filter-select"
              value={selectedPanelFilter}
              onChange={(e) =>
                setSelectedPanelFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Panels
              </option>

              <option value="admin">
                Admin Panel
              </option>

              <option value="accounts">
                Accounts Panel
              </option>

              <option value="controller">
                Controller Panel
              </option>

              <option value="imam">
                Imam Panel
              </option>

              <option value="muqtadi">
                Muqtadi Panel
              </option>

              <option value="moazzin">
                Moazzin Panel
              </option>

            </select>


            {/* DONATION TYPE */}

            <select
              className="filter-select"
              value={selectedTypeFilter}
              onChange={(e) =>
                setSelectedTypeFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Donation Types
              </option>

              <option value="Cash">
                Cash
              </option>

              <option value="Online">
                Online
              </option>

              <option value="Online Transfer">
                Online Transfer
              </option>

              <option value="Cheque">
                Cheque
              </option>

              <option value="Bank Transfer">
                Bank Transfer
              </option>

            </select>


            {/* CATEGORY */}

            <select
              className="filter-select"
              value={selectedCategoryFilter}
              onChange={(e) =>
                setSelectedCategoryFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Fund Categories
              </option>

              <option value="General Donation">
                General Donation
              </option>

              <option value="Zakat">
                Zakat
              </option>

              <option value="Zakat Fund">
                Zakat Fund
              </option>

              <option value="Sadaqah">
                Sadaqah
              </option>

              <option value="Masjid Fund">
                Masjid Fund
              </option>

              <option value="Building Fund">
                Building Fund
              </option>

              <option value="Education Fund">
                Education Fund
              </option>

            </select>

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
              "Status",
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

                      <span
                        style={{
                          padding:
                            "4px 10px",
                          borderRadius:
                            "20px",
                          background:
                            item.status ===
                              "Verified" ||
                            item.status ===
                              "Completed"
                              ? "#dcfce7"
                              : item.status ===
                                "Pending"
                              ? "#fef3c7"
                              : "#e5e7eb",
                          color:
                            item.status ===
                              "Verified" ||
                            item.status ===
                              "Completed"
                              ? "#166534"
                              : item.status ===
                                "Pending"
                              ? "#92400e"
                              : "#374151",
                          fontSize:
                            "12px",
                          fontWeight:
                            "600",
                        }}
                      >

                        {item.status}

                      </span>

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