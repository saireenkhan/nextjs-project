"use client";

import React, { useState } from "react";

import SidebarCommittee from "../../../components/SidebarCommittee";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import AddClassForm from "@/components/AddClassForm";

import { VotingFormSchema } from "@/Data/DataCommittee";
import { createVote } from "@/utils/api";

import "../../css/Pages.css";

const CastVote2 = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleCastVoteSubmit = async (formData) => {
    setSubmitting(true);

    // Logs the form data to your browser console so you can inspect the exact property keys
    console.log("Submitted Form Data Keys:", Object.keys(formData));
    console.log("Submitted Form Data Values:", formData);

    const payload = {
      voteId: formData?.voteId || formData?.["Vote ID"] || `VOT-${Math.floor(1000 + Math.random() * 9000)}`,
      election: formData?.election || formData?.["Election"] || formData?.["Select Election"] || "General Election",
      
      // Handles fallback mapping for all possible label names from DataCommittee.js
      voterIdentifier: 
        formData?.voterIdentifier || 
        formData?.["Voter CNIC / Phone / PIN"] || 
        formData?.["Voter Identifier"] || 
        formData?.["CNIC"] || 
        formData?.["Phone / CNIC / PIN"] || 
        formData?.[Object.keys(formData).find(k => k.toLowerCase().includes("voter") || k.toLowerCase().includes("cnic") || k.toLowerCase().includes("phone"))] || 
        "",
      
      verificationMethod: formData?.verificationMethod || formData?.["Verification Method"] || "CNIC",
      
      selectedCandidate: 
        formData?.selectedCandidate || 
        formData?.["Selected Candidate"] || 
        formData?.["Candidate"] || 
        formData?.["Select Candidate"] || 
        formData?.[Object.keys(formData).find(k => k.toLowerCase().includes("candidate"))] || 
        "",
      
      voteTimestamp: new Date().toISOString(),
    };

    const result = await createVote(payload);
    setSubmitting(false);

    if (result && result.success) {
      alert("Vote successfully cast and recorded in the database!");
    } else {
      alert("Error casting vote: " + (result?.error || "Unknown error"));
    }
  };

  return (
    <div className="campus-layout">
      <SidebarCommittee />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader title="Cast Vote" />

          <div className="donation-info-box">
            Verify voters using CNIC, Phone, OTP or PIN and allow them to cast votes in active elections.
          </div>

          <div className="donation-form-card">
            <AddClassForm fields={VotingFormSchema} onSubmit={handleCastVoteSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastVote2;