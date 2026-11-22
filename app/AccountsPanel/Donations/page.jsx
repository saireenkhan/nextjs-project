"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarAccounts from "../../../components/SidebarAccounts";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { DonationsFormSchema } from "@/Data/DataAccounts";

import "../../css/Pages.css";


const Donations = () => {

  const [donationsList, setDonationsList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState("All");


  // ==========================================================
  // IMPORTANT
  // Accounts panel identifier
  // ==========================================================

  const CURRENT_PANEL = "accounts";


  // ==========================================================
  // LOAD ONLY ACCOUNTS DONATIONS
  // ==========================================================

  useEffect(() => {
    loadDonations();
  }, []);


  const loadDonations = async () => {

    setLoading(true);

    try {

      // IMPORTANT:
      // We are passing ?panel=accounts
      //
      // Therefore backend returns ONLY
      // donations created by Accounts.

      const response = await fetch(
        `/api/donations?panel=${CURRENT_PANEL}`
      );

      const result =
        await response.json();


      const data =
        result?.data ||
        (Array.isArray(result)
          ? result
          : []);


      setDonationsList(data);

    } catch (error) {

      console.error(
        "Failed to fetch Accounts donations:",
        error
      );

      setDonationsList([]);

    } finally {

      setLoading(false);

    }
  };


  // ==========================================================
  // ADD ACCOUNTS DONATION
  // ==========================================================

  const handleAddDonation = async (
    formData
  ) => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];


    const payload = {

      // VERY IMPORTANT
      // This marks the record as Accounts-created.

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
        formData?.date ||
        formData?.["Date"] ||
        today,

      receiptNumber:
        formData?.receiptNumber ||
        formData?.["Receipt Number"] ||
        `REC-${Math.floor(
          100000 +
          Math.random() * 900000
        )}`,

      status:
        formData?.status ||
        formData?.["Status"] ||
        "Pending",

      notes:
        formData?.notes ||
        formData?.["Notes"] ||
        "",
    };


    try {

      const response = await fetch(
        "/api/donations",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(payload),
        }
      );


      const result =
        await response.json();


      if (result.success) {

        alert(
          "Donation recorded successfully!"
        );

        setIsModalOpen(false);

        // Refresh Accounts list
        loadDonations();

      } else {

        alert(
          "Error saving donation: " +
          (
            result.error ||
            "Unknown error"
          )
        );

      }

    } catch (error) {

      console.error(
        "Donation submission error:",
        error
      );

      alert(
        "Failed to connect to server."
      );
    }
  };


  // ==========================================================
  // VIEW PDF RECEIPT
  // ==========================================================

  const handleViewReceipt = (
    id
  ) => {

    window.open(
      `/api/donations/${id}/pdf`,
      "_blank"
    );
  };


  // ==========================================================
  // SEARCH + STATUS FILTER
  // ==========================================================

  const filteredDonations =
    donationsList.filter((item) => {

      const query =
        searchQuery.toLowerCase();


      const matchesSearch =
        !query ||
        item.receiptNumber
          ?.toLowerCase()
          .includes(query) ||
        item.donorName
          ?.toLowerCase()
          .includes(query) ||
        item.fundCategory
          ?.toLowerCase()
          .includes(query);


      const matchesStatus =
        selectedStatusFilter ===
          "All" ||
        (
          item.status &&
          item.status.toLowerCase() ===
            selectedStatusFilter.toLowerCase()
        );


      return (
        matchesSearch &&
        matchesStatus
      );

    });


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="campus-layout">

      <SidebarAccounts />

      <div className="main-content">

        <Header />

        <div className="page-container">


          {/* =================================================
              HEADER
          ================================================= */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >

            <PageHeader
              title="Accounts Panel - Donation Management"
            />


            <button
              onClick={() =>
                setIsModalOpen(true)
              }
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "8px",
                backgroundColor:
                  "#10b981",
                color: "#fff",
                padding:
                  "10px 18px",
                borderRadius:
                  "6px",
                border: "none",
                cursor:
                  "pointer",
                fontWeight:
                  "600",
                fontSize:
                  "14px",
                whiteSpace:
                  "nowrap",
              }}
            >

              <Plus size={18} />

              Add Donation

            </button>

          </div>


          {/* =================================================
              INFO
          ================================================= */}

          <div className="donation-info-box">

            Accounts panel: Record and manage
            donations created by the Accounts department.
            These records are automatically visible in the
            Admin master panel.

          </div>


          {/* =================================================
              SEARCH + FILTER
          ================================================= */}

          <div className="filters-row">

            <div
              className="search-box"
              style={{
                position:
                  "relative",
              }}
            >

              <Search
                size={18}
                style={{
                  position:
                    "absolute",
                  left:
                    "14px",
                  top:
                    "12px",
                  color:
                    "#555",
                }}
              />

              <input
                type="text"
                placeholder="Search Receipt, Donor Name, Category..."
                value={
                  searchQuery
                }
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                style={{
                  paddingLeft:
                    "40px",
                }}
              />

            </div>


            <select
              className="filter-select"
              value={
                selectedStatusFilter
              }
              onChange={(e) =>
                setSelectedStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Statuses
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Verified">
                Verified
              </option>

              <option value="Completed">
                Completed
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
              "Fund Category",
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
                    textAlign:
                      "center",
                    padding:
                      "20px",
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
                    textAlign:
                      "center",
                    padding:
                      "20px",
                  }}
                >
                  No Accounts donation records found.
                </td>

              </tr>

            ) : (

              filteredDonations.map(
                (item, index) => (

                  <tr
                    key={
                      item._id ||
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

                        {item.panel}

                      </span>

                    </td>


                    <td>
                      <strong>
                        {
                          item.donorName
                        }
                      </strong>
                    </td>


                    <td>
                      {
                        item.donationType
                      }
                    </td>


                    <td>
                      {
                        item.fundCategory
                      }
                    </td>


                    <td>
                      Rs. {
                        item.amount
                      }
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
                              "Verified"
                              ? "#dcfce7"
                              : item.status ===
                                "Pending"
                              ? "#fef3c7"
                              : "#dbeafe",
                          color:
                            item.status ===
                              "Verified"
                              ? "#166534"
                              : item.status ===
                                "Pending"
                              ? "#92400e"
                              : "#1d4ed8",
                          fontSize:
                            "12px",
                          fontWeight:
                            "600",
                        }}
                      >

                        {
                          item.status
                        }

                      </span>

                    </td>


                    <td>

                      <button
                        type="button"
                        onClick={() =>
                          handleViewReceipt(
                            item._id
                          )
                        }
                        style={{
                          display:
                            "inline-flex",
                          alignItems:
                            "center",
                          gap:
                            "6px",
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
          ACCOUNTS MODAL
      ===================================================== */}

      <ModalWrapper
        isOpen={
          isModalOpen
        }
        onClose={() =>
          setIsModalOpen(false)
        }
        title="Record New Donation"
      >

        <AddClassForm
          fields={
            DonationsFormSchema
          }
          onSubmit={
            handleAddDonation
          }
        />

      </ModalWrapper>

    </div>
  );
};


export default Donations;