"use client";

import React from "react";
import { FileText } from "lucide-react";

import SidebarMoazzin from "../../../components/SidebarMoazzin";
import Header from "@/components/Header";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";

import {
  RatingsFormSchema,
  RatingsData,
} from "@/Data/DataMoazzin";

import "../../css/Pages.css";

const RatingsMoz = () => {
  return (
    <div className="campus-layout">
      <SidebarMoazzin />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Masjid Star Rating System"
            subtitle="Muqtadis can rate Imam, Moazzin and Committee Members from 1 to 5 stars."
          />

          <div className="donation-info-box">
            Muqtadis can rate Imam, Moazzin and Committee Members
            from 1 to 5 stars.
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
              "Public Display",
              "Date",
              "Action",
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

                <td>{item.publicDisplay}</td>

                <td>{item.date}</td>

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
                    View
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

export default RatingsMoz;