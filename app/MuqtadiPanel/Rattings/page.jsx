"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  RatingFormSchema,
  RatingData,
} from "@/Data/DataMuqtadi";

import "../../css/Pages.css";

const Ratings = () => {
  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Masjid Star Rating System"
          />

          <div className="donation-info-box">
            Muqtadis can rate Imam, Moazzin and Committee Members
            from 1 to 5 stars.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={RatingFormSchema} />
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
              "Action",
            ]}
          >
            {RatingData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  <strong>{item.ratingId}</strong>
                </td>

                <td>{item.personType}</td>

                <td>{item.personName}</td>

                <td>{item.averageRating} ⭐</td>

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
                          : "#fef3c7",
                      color:
                        item.publicDisplay === "Yes"
                          ? "#166534"
                          : "#92400e",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.publicDisplay}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
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
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Ratings;