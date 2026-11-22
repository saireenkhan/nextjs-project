"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { ExpensesFormSchema } from "@/Data/Data";
import { fetchExpenses, createExpense } from "@/utils/api";

import "../../css/Pages.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  useEffect(() => {
    loadExpenses();
  }, []);

  // =========================================================
  // LOAD EXPENSES
  // =========================================================

  const loadExpenses = async () => {
    setLoading(true);

    try {
      const data = await fetchExpenses();

      setExpenses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading expenses:", error);
      setExpenses([]);
    }

    setLoading(false);
  };

  // =========================================================
  // GET FORM VALUE
  // =========================================================

  const getFormValue = (formData, possibleKeys) => {
    if (!formData) {
      return "";
    }

    // First try exact keys
    for (const key of possibleKeys) {
      if (
        formData[key] !== undefined &&
        formData[key] !== null &&
        String(formData[key]).trim() !== ""
      ) {
        return formData[key];
      }
    }

    // -------------------------------------------------------
    // Dynamic key matching
    // -------------------------------------------------------

    const entries = Object.entries(formData);

    for (const [key, value] of entries) {
      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
      ) {
        continue;
      }

      const normalizedKey = key
        .toLowerCase()
        .replace(/[*_ -]/g, "");

      for (const possibleKey of possibleKeys) {
        const normalizedPossibleKey = possibleKey
          .toLowerCase()
          .replace(/[*_ -]/g, "");

        if (normalizedKey === normalizedPossibleKey) {
          return value;
        }
      }
    }

    return "";
  };

  // =========================================================
  // ADD EXPENSE
  // =========================================================

  const handleAddExpense = async (formData) => {
    console.log(
      "FULL ADMIN FORM DATA:",
      formData
    );

    // -------------------------------------------------------
    // Vendor
    // -------------------------------------------------------
    // NOTE:
    // The form field is actually labeled "*Vender" (misspelled,
    // no "o"). Both the exact-key list and the substring fallback
    // below have to account for that spelling, or every submission
    // silently falls through to "Direct Payment".

    let vendor = getFormValue(formData, [
      "Vendor",
      "*Vendor",
      "Vendor Name",
      "*Vendor Name",
      "vendor",
      "vendorName",
      "Vender",
      "*Vender",
      "Vender Name",
      "*Vender Name",
      "vender",
      "venderName",
      "Name",
      "Full Name",
    ]);

    // -------------------------------------------------------
    // EXTRA FALLBACK:
    // Find a form field whose key contains "vendor" OR "vender"
    // -------------------------------------------------------

    if (!vendor) {
      const vendorEntry = Object.entries(formData || {}).find(
        ([key, value]) =>
          (key.toLowerCase().includes("vendor") ||
            key.toLowerCase().includes("vender")) &&
          value !== undefined &&
          value !== null &&
          String(value).trim() !== ""
      );

      if (vendorEntry) {
        vendor = vendorEntry[1];
      }
    }

    // If still empty, use Direct Payment instead of Unknown Vendor
    if (!vendor) {
      vendor = "Direct Payment";
    }

    // -------------------------------------------------------
    // Expense Type
    // -------------------------------------------------------

    let expenseType = getFormValue(formData, [
      "Expense Type",
      "*Expense Type",
      "Expenses Category",
      "*Expenses Category",
      "Type",
      "Category",
      "expenseType",
    ]);

    if (expenseType === "Utilities") {
      expenseType = "Utility Bills";
    }

    if (!expenseType) {
      expenseType = "Other";
    }

    // -------------------------------------------------------
    // Fund Category
    // -------------------------------------------------------

    const fundCategory =
      getFormValue(formData, [
        "Fund Category",
        "*Fund Category",
        "Fund Used",
        "*Fund Used",
        "fundCategory",
      ]) || "General Fund";

    // -------------------------------------------------------
    // Amount
    // -------------------------------------------------------

    const amount = Number(
      getFormValue(formData, [
        "Amount",
        "*Amount",
        "Expense Amount",
        "amount",
      ]) || 0
    );

    // -------------------------------------------------------
    // Date
    // -------------------------------------------------------

    const expenseDate =
      getFormValue(formData, [
        "Expense Date",
        "*Expense Date",
        "Date",
        "expenseDate",
      ]) ||
      new Date().toISOString().split("T")[0];

    // -------------------------------------------------------
    // Receipt Number
    // -------------------------------------------------------

    const receiptNumber =
      getFormValue(formData, [
        "Receipt Number",
        "*Receipt Number",
        "receiptNumber",
      ]) ||
      `EXP-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

    // -------------------------------------------------------
    // Status
    // -------------------------------------------------------

    const status =
      getFormValue(formData, [
        "Status",
        "*Status",
        "status",
      ]) || "Completed";

    // -------------------------------------------------------
    // Notes
    // -------------------------------------------------------

    const notes =
      getFormValue(formData, [
        "Notes",
        "*Notes",
        "Description",
        "notes",
      ]) || "";

    // =========================================================
    // FINAL DATABASE PAYLOAD
    // =========================================================

    const payload = {
      vendor: String(vendor).trim(),

      expenseType: String(expenseType).trim(),

      fundCategory: String(fundCategory).trim(),

      amount: amount,

      expenseDate: expenseDate,

      receiptNumber: String(receiptNumber).trim(),

      status: String(status).trim(),

      notes: String(notes).trim(),
    };

    console.log(
      "FINAL ADMIN EXPENSE PAYLOAD:",
      payload
    );

    // =========================================================
    // SEND TO DATABASE
    // =========================================================

    const result = await createExpense(payload);

    if (result && result.success) {

      alert(
        "Expense saved successfully for: " +
          payload.vendor
      );

      setIsModalOpen(false);

      loadExpenses();

    } else {

      alert(
        "Error saving expense: " +
          (result?.error || "Unknown error")
      );

    }
  };

  // =========================================================
  // PDF
  // =========================================================

  const handleDownloadPdf = (id) => {
    window.open(
      `/api/expenses/${id}/pdf`,
      "_blank"
    );
  };

  // =========================================================
  // FILTERING
  // =========================================================

  const filteredExpenses = expenses.filter((item) => {

    const search = searchQuery.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      (item.vendor &&
        item.vendor
          .toLowerCase()
          .includes(search)) ||
      (item.receiptNumber &&
        item.receiptNumber
          .toLowerCase()
          .includes(search)) ||
      (item._id &&
        item._id
          .toLowerCase()
          .includes(search));

    const itemType =
      item.expenseType ||
      item.category ||
      item.type ||
      "";

    const matchesType =
      selectedTypeFilter === "All" ||
      itemType.toLowerCase() ===
        selectedTypeFilter.toLowerCase();

    const itemCategory =
      item.fundCategory ||
      item.fundUsed ||
      "";

    const matchesCategory =
      selectedCategoryFilter === "All" ||
      itemCategory.toLowerCase() ===
        selectedCategoryFilter.toLowerCase();

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory
    );
  });

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="campus-layout">

      <Sidebar2 />

      <div className="main-content">

        <Header />

        <div className="page-container">

          {/* ================= HEADER ================= */}

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
               <PageHeader title="Expenses Management" />
             </div>
           
             <button type="button" onClick={() => setIsModalOpen(true)} className="btn-add-staff">
               <Plus size={18} />
               Add Expense
             </button>
             </div>

          {/* ================= INFO ================= */}

          <div className="donation-info-box">
            Record organizational expenses,
            vendor details, category-wise
            allocations, and generate vouchers.
          </div>

          {/* ================= FILTERS ================= */}

          <div className="filters-row">

            <div
              className="search-box"
              style={{
                position: "relative",
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
                placeholder="Search by Vendor or Receipt..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                style={{
                  paddingLeft: "40px",
                }}
              />

            </div>

            <select
              className="filter-select"
              value={selectedTypeFilter}
              onChange={(e) =>
                setSelectedTypeFilter(e.target.value)
              }
            >

              <option value="All">
                All Expense Types
              </option>

              <option value="Electricity">
                Electricity
              </option>

              <option value="Water">
                Water
              </option>

              <option value="Cleaning">
                Cleaning
              </option>

              <option value="Staff salary">
                Staff salary
              </option>

              <option value="Maintenance">
                Maintenance
              </option>

              <option value="Utility Bills">
                Utility Bills
              </option>

              <option value="hadia">
                hadia
              </option>

              <option value="Ramzan Bonus">
                Ramzan Bonus
              </option>

              <option value="Other">
                Other
              </option>

            </select>

            <select
              className="filter-select"
              value={selectedCategoryFilter}
              onChange={(e) =>
                setSelectedCategoryFilter(e.target.value)
              }
            >

              <option value="All">
                All Fund Categories
              </option>

              <option value="Masjid general fund">
                Masjid general fund
              </option>

              <option value="Zakat fund">
                Zakat fund
              </option>

              <option value="Construction fund">
                Construction fund
              </option>

              <option value="Madrasa fund">
                Madrasa fund
              </option>

              <option value="WellFare">
                WellFare
              </option>

              <option value="Jummah">
                Jummah
              </option>

              <option value="hadia fund">
                hadia fund
              </option>

              <option value="Ramzan Bonus">
                Ramzan Bonus
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* ================= TABLE ================= */}

          <DataTable
            headers={[
              "Expense ID",
              "Vendor",
              "Expense Type",
              "Amount",
              "Status",
              "Action",
            ]}
          >

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  Loading database records...
                </td>

              </tr>

            ) : filteredExpenses.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No matching expenses found.
                </td>

              </tr>

            ) : (

              filteredExpenses.map((item) => (

                <tr key={item._id}>

                  <td>
                    {item.receiptNumber || item._id}
                  </td>

                  <td>
                    <strong>
                      {item.vendor}
                    </strong>
                  </td>

                  <td>
                    {item.expenseType}
                  </td>

                  <td>
                    Rs. {item.amount}
                  </td>

                  <td>

                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",

                        background:
                          item.status === "Verified" ||
                          item.status === "Completed"
                            ? "#dcfce7"
                            : item.status === "Pending"
                            ? "#fef3c7"
                            : "#e5e7eb",

                        color:
                          item.status === "Verified" ||
                          item.status === "Completed"
                            ? "#166534"
                            : item.status === "Pending"
                            ? "#92400e"
                            : "#374151",

                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownloadPdf(item._id)
                      }
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

                      PDF

                    </button>

                  </td>

                </tr>

              ))

            )}

          </DataTable>

        </div>

      </div>

      {/* ================= MODAL ================= */}

      <ModalWrapper
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        title="Add New Expense"
      >

        <AddClassForm
          fields={ExpensesFormSchema}
          onSubmit={handleAddExpense}
        />

      </ModalWrapper>

    </div>
  );
};

export default Expenses;