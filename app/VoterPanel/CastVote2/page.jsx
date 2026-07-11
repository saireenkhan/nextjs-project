"use client";

import React from "react";
import SidebarVoter from "../../../components/SidebarVoter";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import AddClassForm from "@/components/AddClassForm";

import { VotingFormSchema, } from "@/Data/DataCommittee";

import "../../css/Pages.css";

const CastVote2 = () => {
  return (
    <div className="campus-layout">
      <SidebarVoter />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Cast Vote "
          />

          <div className="donation-info-box">
            Verify voters using CNIC, Phone, OTP or PIN and allow them
            to cast votes in active elections.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={VotingFormSchema} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastVote2;