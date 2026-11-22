"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus, GraduationCap, UserPlus, Clock } from "lucide-react";

import SidebarMuqtadi from "../../../components/SidebarMuqtadi";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { QuranClassesFormSchema } from "@/Data/DataMuqtadi";
import { fetchQuranClasses, createQuranClass } from "@/utils/api";

import "../../css/Pages.css";

const QuranClasses = () => {
  const [classesList, setClassesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats State
  const [activeCount, setActiveCount] = useState("04");
  const [admissionStatusText, setAdmissionStatusText] = useState("Open");
  const [nextClassText, setNextClassText] = useState({ title: "Kids Quran Class", time: "After Asr" });

  useEffect(() => {
    loadClassesData();
  }, []);

  const loadClassesData = async () => {
    setLoading(true);
    const data = await fetchQuranClasses();
    const list = Array.isArray(data) ? data : [];
    setClassesList(list);
    calculateMetrics(list);
    setLoading(false);
  };

  const calculateMetrics = (currentList) => {
    if (!currentList || currentList.length === 0) {
      setActiveCount("0");
      setAdmissionStatusText("Closed");
      setNextClassText({ title: "No classes scheduled", time: "--" });
      return;
    }

    const totalActive = currentList.length;
    setActiveCount(totalActive < 10 ? `0${totalActive}` : `${totalActive}`);

    const openClasses = currentList.filter(c => c.status && c.status.toLowerCase() === "open");
    setAdmissionStatusText(openClasses.length > 0 ? "Open" : "Closed");

    const first = currentList[0];
    setNextClassText({
      title: first.className || first.class || "Quran Class",
      time: first.timing || `${first.timeFrom || ""} - ${first.timeTo || ""}`
    });
  };
const handleAddClass = async (formData) => {
    // Debug what keys are actually coming from the form modal
    console.log("Submitted Form Data:", formData);

    const payload = {
      className: formData?.className || formData?.ClassName || formData?.["Class Name"] || formData?.classname || "",
      teacher: formData?.teacher || formData?.Teacher || formData?.["Teacher Name"] || "",
      timeFrom: formData?.timeFrom || formData?.TimeFrom || formData?.["Time From"] || formData?.timefrom || "",
      timeTo: formData?.timeTo || formData?.TimeTo || formData?.["Time To"] || formData?.timeto || "",
      ageGroup: formData?.ageGroup || formData?.AgeGroup || formData?.["Age Group"] || formData?.agegroup || "All Ages",
      status: formData?.status || formData?.Status || formData?.["Status"] || "Open",
    };

    if (!payload.className || !payload.teacher || !payload.timeFrom || !payload.timeTo) {
      alert("Please fill out all required fields (Class Name, Teacher, Time From, and Time To).");
      return;
    }

    const result = await createQuranClass(payload);
    if (result && result.success) {
      alert("Quran class added successfully!");
      setIsModalOpen(false);
      loadClassesData();
    } else {
      alert("Error adding class: " + (result?.error || "Unknown error"));
    }
  };
  
  const handleExportClassPDF = (id) => {
    window.open(`http://localhost:5002/api/quran-classes/${id}/export`, "_blank");
  };

  const filteredClasses = classesList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.className && item.className.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.teacher && item.teacher.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.ageGroup && item.ageGroup.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="campus-layout">
      <SidebarMuqtadi />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <PageHeader title="Quran / Madrasa Classes" />

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
              <Plus size={18} /> Add Class
            </button>
          </div>

          <div className="donation-info-box">
            Class timings, teacher details, age groups, admission status and Hifz/Nazra/Tajweed information.
          </div>

          <section className="stats-container">
            <StatCard
              icon={GraduationCap}
              title="Active Classes"
              value={activeCount}
              subtitle="Nazra, Hifz, Tajweed, Kids Class"
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />

            <StatCard
              icon={UserPlus}
              title="Admission Status"
              value={admissionStatusText}
              subtitle="New students can apply"
              dotColor="#f59e0b"
              iconColor="#f59e0b"
            />

            <StatCard
              icon={Clock}
              title="Next Class"
              value={nextClassText.time}
              subtitle={nextClassText.title}
              dotColor="var(--accent-blue)"
              iconColor="var(--accent-blue)"
            />
          </section>

          <div className="filters-row" style={{ marginTop: "20px" }}>
            <div className="search-box" style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search class, teacher, age group..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }} 
              />
            </div>
          </div>

          <DataTable
            headers={[
              "#",
              "Class",
              "Teacher",
              "Timing",
              "Age Group",
              "Status",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Loading database records...
                </td>
              </tr>
            ) : filteredClasses.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No Quran classes found.
                </td>
              </tr>
            ) : (
              filteredClasses.map((item, index) => (
                <tr key={item._id || item.id || index}>
                  <td>{index + 1}</td>

                  <td>
                    <strong>{item.className || item.class || "N/A"}</strong>
                  </td>

                  <td>{item.teacher || "N/A"}</td>

                  <td>{item.timing || `${item.timeFrom || ""} - ${item.timeTo || ""}`}</td>

                  <td>{item.ageGroup || "N/A"}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status && item.status.toLowerCase() === "open"
                            ? "#dcfce7"
                            : "#fef3c7",
                        color:
                          item.status && item.status.toLowerCase() === "open"
                            ? "#166534"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.status || "Open"}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleExportClassPDF(item._id || item.id)}
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

      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Quran Class"
      >
        <AddClassForm fields={QuranClassesFormSchema} onSubmit={handleAddClass} />
      </ModalWrapper>
    </div>
  );
};

export default QuranClasses;