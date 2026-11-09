"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import SidebarCommittee from "../../../components/SidebarCommittee";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { ElectionsFormSchema } from "@/Data/DataCommittee";

import {
  fetchCommitteeElections,
  createCommitteeElection,
} from "@/utils/api";

import "../../css/Pages.css";


const Election2 = () => {

  const [electionsList, setElectionsList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState("All");


  // =====================================================
  // LOAD COMMITTEE ELECTIONS
  // =====================================================

  useEffect(() => {
    loadElections();
  }, []);


  const loadElections = async () => {

    setLoading(true);

    const data =
      await fetchCommitteeElections();

    setElectionsList(
      Array.isArray(data)
        ? data
        : []
    );

    setLoading(false);
  };


  // =====================================================
  // CREATE COMMITTEE ELECTION
  // =====================================================

  const handleAddElection = async (
    formData
  ) => {

    const payload = {

      electionId:
        formData?.electionId ||
        formData?.["Election ID"] ||
        `ELC-${Math.floor(
          1000 +
          Math.random() *
          9000
        )}`,

      electionTitle:
        formData?.electionTitle ||
        formData?.["Election Title"] ||
        "Untitled Election",

      electionType:
        formData?.electionType ||
        formData?.["Election Type"] ||
        "General",

      voteType:
        formData?.voteType ||
        formData?.["Vote Type"] ||
        "Secret Ballot",

      status:
        formData?.status ||
        formData?.["Status"] ||
        "Upcoming",

      resultVisibility:
        formData?.resultVisibility ||
        formData?.["Result Visibility"] ||
        "Public",

      startTime:
        formData?.startTime ||
        formData?.["Start Time"] ||
        new Date().toISOString(),

      endTime:
        formData?.endTime ||
        formData?.["End Time"] ||
        new Date().toISOString(),
    };


    const result =
      await createCommitteeElection(
        payload
      );


    if (result?.success) {

      alert(
        "Election created successfully!"
      );

      setIsModalOpen(false);

      loadElections();

    } else {

      alert(
        "Error saving election: " +
        (
          result?.error ||
          "Unknown error"
        )
      );
    }
  };


  // =====================================================
  // VIEW PDF
  // =====================================================

  const handleViewPdf = (id) => {

    window.open(
      `http://localhost:5000/api/elections/${id}/pdf`,
      "_blank"
    );
  };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredElections =
    electionsList.filter(
      (item) => {

        const query =
          searchQuery.toLowerCase();


        const matchesSearch =
          !query ||

          item.electionTitle
            ?.toLowerCase()
            .includes(query) ||

          item.electionId
            ?.toLowerCase()
            .includes(query) ||

          item.electionType
            ?.toLowerCase()
            .includes(query);


        const matchesStatus =
          selectedStatusFilter ===
          "All" ||

          item.status
            ?.toLowerCase() ===
          selectedStatusFilter
            .toLowerCase();


        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );


  return (

    <div className="campus-layout">

      <SidebarCommittee />


      <div className="main-content">

        <Header />


        <div className="page-container">


          {/* HEADER */}
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
    <PageHeader title="Election Management" />
  </div>

  <button className="btn-add-staff">
    <Plus size={18} />
    Add Election
  </button>
</div>


          <div className="donation-info-box">

            Committee panel:
            Create and manage
            Committee elections.
            These elections are
            automatically visible
            to Admin.

          </div>


          {/* FILTERS */}

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
                  left: "14px",
                  top: "12px",
                  color: "#555",
                }}
              />


              <input
                type="text"
                placeholder="Search Election ID, Title or Type..."
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

              <option value="Upcoming">
                Upcoming
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>


          {/* TABLE */}

          <DataTable
            headers={[
              "#",
              "Election ID",
              "Election Title",
              "Election Type",
              "Vote Type",
              "Status",
              "Result Visibility",
              "Action",
            ]}
          >

            {loading ? (

              <tr>

                <td
                  colSpan="8"
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

            ) : filteredElections.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "20px",
                  }}
                >
                  No Committee
                  elections found.
                </td>

              </tr>

            ) : (

              filteredElections.map(
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
                          item.electionId
                        }
                      </strong>
                    </td>


                    <td>
                      {
                        item.electionTitle
                      }
                    </td>


                    <td>
                      {
                        item.electionType
                      }
                    </td>


                    <td>
                      {
                        item.voteType
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
                            "Active"
                              ? "#dcfce7"
                              : item.status ===
                                "Upcoming"
                              ? "#dbeafe"
                              : "#f3f4f6",

                          color:
                            item.status ===
                            "Active"
                              ? "#166534"
                              : item.status ===
                                "Upcoming"
                              ? "#1d4ed8"
                              : "#374151",

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
                      {
                        item.resultVisibility
                      }
                    </td>


                    <td>

                      <button
                        type="button"
                        onClick={() =>
                          handleViewPdf(
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

                        View

                      </button>

                    </td>

                  </tr>
                )
              )

            )}

          </DataTable>

        </div>

      </div>


      {/* MODAL */}

      <ModalWrapper
        isOpen={
          isModalOpen
        }
        onClose={() =>
          setIsModalOpen(
            false
          )
        }
        title="Create New Election"
      >

        <AddClassForm
          fields={
            ElectionsFormSchema
          }
          onSubmit={
            handleAddElection
          }
        />

      </ModalWrapper>

    </div>
  );
};


export default Election2;