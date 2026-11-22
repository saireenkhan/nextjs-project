"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarAccounts from "../../../components/SidebarAccounts";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { ExpensesFormSchema } from "@/Data/DataAccounts";

import "../../css/Pages.css";


const ExpensesAcc = () => {

  const [expensesList, setExpensesList] =
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
  // LOAD ONLY ACCOUNTS EXPENSES
  // ==========================================================

  useEffect(() => {
    loadExpenses();
  }, []);


  const loadExpenses = async () => {

    setLoading(true);

    try {

      // IMPORTANT:
      // The backend scopes expenses by PATH, not a query param:
      //   GET /api/expenses/accounts  -> only Accounts-sourced expenses
      //   GET /api/expenses/admin     -> all expenses
      //
      // There is no GET /api/expenses (no root route), so calling
      // that would 404 and return an HTML page instead of JSON.

      const response = await fetch(
        `/api/expenses/${CURRENT_PANEL}`
      );

      // IMPORTANT:
      // If the backend route is missing/misconfigured,
      // it may return an HTML error page instead of JSON.
      // Guard against that so we don't crash on response.json().

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Expenses API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Expenses API returned ${response.status} (non-JSON response). Check the expenseRoutes.js route path.`
        );

      }

      const result =
        await response.json();


      const data =
        result?.data ||
        (Array.isArray(result)
          ? result
          : []);


      setExpensesList(data);

    } catch (error) {

      console.error(
        "Failed to fetch Accounts expenses:",
        error
      );

      setExpensesList([]);

    } finally {

      setLoading(false);

    }
  };


  // ==========================================================
  // ADD ACCOUNTS EXPENSE
  // ==========================================================

  const handleAddExpense = async (
    formData
  ) => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];


    const payload = {

      // NOTE:
      // We do NOT send a "panel"/"source" field here.
      // The backend sets it automatically based on which
      // endpoint we POST to (/api/expenses/accounts marks
      // the record as Accounts-created) — see the route file.

      vendor:
        formData?.vendor ||
        formData?.["Vendor / Payee Name"] ||
        "Direct Payment",

      expenseType:
        formData?.expenseType ||
        formData?.["Expense Category"] ||
        "Other",

      fundCategory:
        formData?.fundCategory ||
        formData?.["Fund Used"] ||
        "General Fund",

      amount: Number(
        formData?.amount ||
        formData?.["Amount"] ||
        0
      ),

      expenseDate:
        formData?.expenseDate ||
        formData?.["Expense Date"] ||
        formData?.date ||
        formData?.["Date"] ||
        today,

      receiptNumber:
        formData?.receiptNumber ||
        formData?.["Receipt Number"] ||
        `EXP-${Math.floor(
          100000 +
          Math.random() * 900000
        )}`,

      status:
        formData?.status ||
        formData?.["Approval Status"] ||
        "Pending",

      notes:
        formData?.notes ||
        formData?.["Description"] ||
        "",
    };


    try {

      const response = await fetch(
        `/api/expenses/${CURRENT_PANEL}`,
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


      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Expenses API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Expenses API returned ${response.status} (non-JSON response). Check the expenseRoutes.js route path.`
        );

      }

      const result =
        await response.json();


      if (result.success) {

        alert(
          "Expense recorded successfully!"
        );

        setIsModalOpen(false);

        // Refresh Accounts list
        loadExpenses();

      } else {

        alert(
          "Error saving expense: " +
          (
            result.error ||
            "Unknown error"
          )
        );

      }

    } catch (error) {

      console.error(
        "Expense submission error:",
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
      `/api/expenses/${id}/pdf`,
      "_blank"
    );
  };


  // ==========================================================
  // SEARCH + STATUS FILTER
  // ==========================================================

  const filteredExpenses =
    expensesList.filter((item) => {

      const query =
        searchQuery.toLowerCase();


      const matchesSearch =
        !query ||
        item.receiptNumber
          ?.toLowerCase()
          .includes(query) ||
        item.vendor
          ?.toLowerCase()
          .includes(query) ||
        item.expenseType
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
              title="Accounts Panel - Expense Management"
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

              Add Expense

            </button>

          </div>


          {/* =================================================
              INFO
          ================================================= */}

          <div className="donation-info-box">

            Accounts panel: Track daily/monthly expenses
            like electricity, water, cleaning, staff salary
            and other organizational expenses. These records
            are automatically visible in the Admin master
            panel.

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
                placeholder="Search Receipt, Vendor, Type..."
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
              "Expense ID",
              "Panel Source",
              "Vendor",
              "Expense Type",
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

            ) : filteredExpenses.length === 0 ? (

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
                  No Accounts expense records found.
                </td>

              </tr>

            ) : (

              filteredExpenses.map(
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
                          item.vendor
                        }
                      </strong>
                    </td>


                    <td>
                      {
                        item.expenseType
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
                              "Verified" ||
                              item.status ===
                              "Completed"
                              ? "#dcfce7"
                              : item.status ===
                                "Pending"
                              ? "#fef3c7"
                              : "#dbeafe",
                          color:
                            item.status ===
                              "Verified" ||
                              item.status ===
                              "Completed"
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
        title="Record New Expense"
      >

        <AddClassForm
          fields={
            ExpensesFormSchema
          }
          onSubmit={
            handleAddExpense
          }
        />

      </ModalWrapper>

    </div>
  );
};


export default ExpensesAcc;