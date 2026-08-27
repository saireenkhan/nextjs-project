"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarCommittee from "../../../components/SidebarCommittee";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { VotersFormSchema } from "@/Data/DataCommittee";

import "../../css/Pages.css";

const Voter2 = () => {
  const [votersList, setVotersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Voting Status Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // ==========================================================
  // IMPORTANT
  // Committee panel identifier
  // ==========================================================

  const CURRENT_PANEL = "committee";

  useEffect(() => {
    loadVoters();
  }, []);

  // ==========================================================
  // LOAD ONLY COMMITTEE VOTERS
  // ==========================================================

  const loadVoters = async () => {
    setLoading(true);

    try {

      // IMPORTANT:
      // The backend scopes voters by PATH, not a query param:
      //   GET /api/voters/committee -> only Committee-registered
      //   GET /api/voters/admin     -> all voters
      //
      // There is no GET /api/voters (no root route), so calling
      // that would 404 and return an HTML page instead of JSON.

      const response = await fetch(
        `http://localhost:5000/api/voters/${CURRENT_PANEL}`
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Voters API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Voters API returned ${response.status} (non-JSON response). Check voterRoutes.js.`
        );

      }

      const result = await response.json();

      const data =
        result?.data ||
        (Array.isArray(result) ? result : []);

      setVotersList(data);

    } catch (error) {

      console.error("Failed to fetch Committee voters:", error);

      setVotersList([]);

    } finally {

      setLoading(false);

    }
  };

  // ==========================================================
  // REGISTER COMMITTEE VOTER
  // ==========================================================

  const handleAddVoter = async (formData) => {

    const payload = {

      // NOTE:
      // We do NOT send a "source" field here. The backend sets
      // it automatically based on which endpoint we POST to
      // (/api/voters/committee marks the record as
      // Committee-registered).

      voterId:
        formData?.voterId ||
        formData?.["Voter ID"] ||
        `VTR-${Math.floor(1000 + Math.random() * 9000)}`,

      voterName:
        formData?.voterName ||
        formData?.["Voter Name"] ||
        "",

      cnic:
        formData?.cnic ||
        formData?.["CNIC"] ||
        "",

      phone:
        formData?.phone ||
        formData?.["Phone"] ||
        "",

      verificationMethod:
        formData?.verificationMethod ||
        formData?.["Verification"] ||
        "OTP",

      votingStatus:
        formData?.votingStatus ||
        formData?.["Voting Status"] ||
        "Registered",
    };

    try {

      const response = await fetch(
        `http://localhost:5000/api/voters/${CURRENT_PANEL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {

        const rawText = await response.text();

        console.error(
          "Voters API did not return JSON. Status:",
          response.status,
          "Body:",
          rawText.slice(0, 200)
        );

        throw new Error(
          `Voters API returned ${response.status} (non-JSON response). Check voterRoutes.js.`
        );

      }

      const result = await response.json();

      if (result.success) {

        alert("Voter registered successfully!");

        setIsModalOpen(false);

        loadVoters();

      } else {

        alert("Error saving voter: " + (result.error || "Unknown error"));

      }

    } catch (error) {

      console.error("Voter submission error:", error);

      alert("Failed to connect to server.");

    }
  };

  const handleViewVoter = (id) => {
    // NOTE: unified onto the one PDF route the backend actually
    // exposes — there is no separate "/profile" route.
    window.open(`http://localhost:5000/api/voters/${id}/pdf`, "_blank");
  };

  // Filter & Search Logic
  const filteredVoters = votersList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.voterName && item.voterName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.voterId && item.voterId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.cnic && item.cnic.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.phone && item.phone.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      selectedStatusFilter === "All" || 
      (item.votingStatus && item.votingStatus.toLowerCase() === selectedStatusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Trigger Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px" }}>
            <PageHeader title="Committee Panel - Voter Management" />

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
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              <Plus size={18} /> Register Voter
            </button>
          </div>

          <div className="donation-info-box">
            Committee panel: Register voters, verify identities through
            OTP/PIN and prevent duplicate voting. These records are
            automatically visible in the Admin master panel.
          </div>

          {/* Search & Status Filters */}
          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Voter ID, Name, CNIC, Phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            <select 
              className="filter-select"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Registered">Registered</option>
              <option value="Verified">Verified</option>
              <option value="Voted">Voted</option>
            </select>
          </div>

          <DataTable
            headers={[
              "#",
              "Voter ID",
              "Voter Name",
              "CNIC",
              "Phone",
              "Verification",
              "Voting Status",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredVoters.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No voter records found.
                </td>
              </tr>
            ) : (
              filteredVoters.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.id || index + 1}</td>

                  <td>
                    <strong>{item.voterId}</strong>
                  </td>

                  <td>{item.voterName}</td>

                  <td>{item.cnic}</td>

                  <td>{item.phone}</td>

                  <td>{item.verificationMethod}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.votingStatus === "Voted"
                            ? "#dcfce7"
                            : item.votingStatus === "Verified"
                            ? "#dbeafe"
                            : "#fef3c7",
                        color:
                          item.votingStatus === "Voted"
                            ? "#166534"
                            : item.votingStatus === "Verified"
                            ? "#1d4ed8"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.votingStatus}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleViewVoter(item._id)}
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
        title="Register Voter Profile"
      >
        <AddClassForm fields={VotersFormSchema} onSubmit={handleAddVoter} />
      </ModalWrapper>
    </div>
  );
};

export default Voter2;