"use client";

import React from "react";

import SidebarImam from "../../../components/SidebarImam";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import { RatingsFormSchema, RatingsData } from "@/Data/Data-Imam";

import "../../css/Pages.css";

const RatingImam= () => {
  return (
    <div className="campus-layout">
      <SidebarImam />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Ratings & Feedback"
          />

          <div className="donation-info-box">
            Community members can provide ratings based on knowledge,
            akhlaq, punctuality, khutba quality and community behavior.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={RatingsFormSchema} />
          </div>

          <DataTable
            headers={[
              "#",
              "Rating ID",
              "Person Type",
              "Person Name",
              "Average Rating",
              "Feedback By",
              "Date",
              "Public Display",
            ]}
          >
            {RatingsData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.ratingId}</strong>
                </td>

                <td>{item.personType}</td>

                <td>{item.personName}</td>

                <td>{item.averageRating}</td>

                <td>{item.feedbackBy}</td>

                <td>{item.date}</td>

                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background:
                        item.publicDisplay === "Yes"
                          ? "#dcfce7"
                          : "#fee2e2",
                      color:
                        item.publicDisplay === "Yes"
                          ? "#166534"
                          : "#991b1b",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.publicDisplay}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default RatingImam;