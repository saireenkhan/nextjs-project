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
import { authorizedRequest } from "@/utils/api";

import "../../css/Pages.css";

const Voter2 = () => {
  const [votersList, setVotersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Voting Status Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // ==========================================================
  // Committee panel identifier
  // ==========================================================

  const CURRENT_PANEL = "committee";

  // ==========================================================
  // LOAD VOTERS WHEN PAGE LOADS
  // ==========================================================

  useEffect(() => {
    loadVoters();
  }, []);

  // ==========================================================
  // LOAD ONLY COMMITTEE VOTERS
  // ==========================================================

  const loadVoters = async () => {
    setLoading(true);

    try {
      const result = await authorizedRequest("/voters/committee");

      const data = Array.isArray(result)
        ? result
        : result?.success
        ? result.data || []
        : [];

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
      const result = await authorizedRequest(
        `/voters/${CURRENT_PANEL}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (result.success) {
        alert("Voter registered successfully!");

        setIsModalOpen(false);

        await loadVoters();
      } else {
        alert(
          "Error saving voter: " +
            (result.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Voter submission error:", error);

      alert(
        error?.message || "Failed to connect to server."
      );
    }
  };

  // ==========================================================
  // VIEW VOTER PDF
  // ==========================================================

  const handleViewVoter = (id) => {
    window.open(
      `http://localhost:5002/api/voters/${id}/pdf`,
      "_blank"
    );
  };

  // ==========================================================
  // FILTER & SEARCH
  // ==========================================================

  const filteredVoters = votersList.filter((item) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      (item.voterName &&
        item.voterName.toLowerCase().includes(search)) ||
      (item.voterId &&
        item.voterId.toLowerCase().includes(search)) ||
      (item.cnic &&
        item.cnic.toLowerCase().includes(search)) ||
      (item.phone &&
        item.phone.toLowerCase().includes(search));

    const matchesStatus =
      selectedStatusFilter === "All" ||
      (item.votingStatus &&
        item.votingStatus.toLowerCase() ===
          selectedStatusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // ==========================================================
  // PAGE UI
  // ==========================================================

  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">

          {/* ==================================================
              HEADER ROW
          ================================================== */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: "16px",
              gap: "20px",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <PageHeader title="Voter Management" />
            </div>

            <button
              type="button"
              className="btn-add-staff"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} />
              Add voter
            </button>
          </div>

          {/* ==================================================
              INFORMATION BOX
          ================================================== */}

          <div className="donation-info-box">
            Committee panel: Register voters, verify identities
            through OTP/PIN and prevent duplicate voting. These
            records are automatically visible in the Admin master
            panel.
          </div>

          {/* ==================================================
              SEARCH & STATUS FILTERS
          ================================================== */}

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
                placeholder="Search Voter ID, Name, CNIC, Phone..."
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
              value={selectedStatusFilter}
              onChange={(e) =>
                setSelectedStatusFilter(e.target.value)
              }
            >
              <option value="All">All Statuses</option>
              <option value="Registered">
                Registered
              </option>
              <option value="Verified">
                Verified
              </option>
              <option value="Voted">
                Voted
              </option>
            </select>
          </div>

          {/* ==================================================
              VOTERS TABLE
          ================================================== */}

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
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  Loading database records...
                </td>
              </tr>
            ) : filteredVoters.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No voter records found.
                </td>
              </tr>
            ) : (
              filteredVoters.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    {item.id || index + 1}
                  </td>

                  <td>
                    <strong>
                      {item.voterId || "-"}
                    </strong>
                  </td>

                  <td>
                    {item.voterName || "-"}
                  </td>

                  <td>
                    {item.cnic || "-"}
                  </td>

                  <td>
                    {item.phone || "-"}
                  </td>

                  <td>
                    {item.verificationMethod || "-"}
                  </td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.votingStatus === "Voted"
                            ? "#dcfce7"
                            : item.votingStatus ===
                              "Verified"
                            ? "#dbeafe"
                            : "#fef3c7",
                        color:
                          item.votingStatus === "Voted"
                            ? "#166534"
                            : item.votingStatus ===
                              "Verified"
                            ? "#1d4ed8"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.votingStatus || "Registered"}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        handleViewVoter(item._id)
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
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </DataTable>
        </div>
      </div>

      {/* ======================================================
          ADD VOTER MODAL
      ====================================================== */}

      <ModalWrapper
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Voter Profile"
      >
        <AddClassForm
          fields={VotersFormSchema}
          onSubmit={handleAddVoter}
        />
      </ModalWrapper>
    </div>
  );
};

export default Voter2;