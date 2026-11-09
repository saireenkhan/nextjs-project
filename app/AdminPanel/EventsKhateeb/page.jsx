"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { EventsKhateebFormSchema } from "@/Data/Data";
import { fetchEventsKhateeb, createEventKhateeb } from "@/utils/api";

import "../../css/Pages.css";

const EventsKhateeb = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchEventsKhateeb();
    setDataList(Array.isArray(result) ? result : []);
    setLoading(false);
  };

  const handleFormSubmit = async (formData) => {
    console.log("Submitted Event/Khateeb form data:", formData);

    const payload = {
      eventId: formData?.eventId || formData?.["Event ID"] || `EVT-${Math.floor(100 + Math.random() * 900)}`,
      eventType: formData?.eventType || formData?.["Event Type"] || "Jummah",
      eventDate: formData?.eventDate || formData?.["Event Date"] || "",
      eventTime: formData?.eventTime || formData?.["Event Time"] || "",
      needKhateeb: formData?.needKhateeb || formData?.["Need Khateeb"] || "",
      needQariTaraweeh: formData?.needQariTaraweeh || formData?.["Need Qari for Ramadan Taraweeh"] || "",
      personType: formData?.personType || formData?.["Person Type"] || "",
      fullName: formData?.fullName || formData?.["Full Name"] || "Unnamed Person",
      phone: formData?.phone || formData?.["Phone"] || "",
      cnic: formData?.cnic || formData?.["CNIC"] || "",
      qualification: formData?.qualification || formData?.["Qualification / Sanad"] || "",
      speciality: formData?.speciality || formData?.["Speciality"] || "",
      assignedTopic: formData?.assignedTopic || formData?.["Assigned Topic"] || "",
      hadiaFund: formData?.hadiaFund || formData?.["Hadia Fund"] || "",
      hadiaAmount: Number(formData?.hadiaAmount || formData?.["Hadia Amount"] || 0),
      paymentStatus: formData?.paymentStatus || formData?.["Payment Status"] || "Pending",
      status: formData?.status || formData?.["Status"] || "Verified"
    };

    const result = await createEventKhateeb(payload);
    if (result && result.success) {
      alert("Event / Khateeb record saved successfully!");
      setIsModalOpen(false); // Close modal on success
      loadData();
    } else {
      alert("Error saving record: " + (result?.error || "Unknown error"));
    }
  };

  const handleDownloadPdf = (id) => {
    window.open(`http://localhost:5000/api/events-khateeb/${id}/pdf`, "_blank");
  };

  const filteredData = dataList.filter((item) => {
    return (
      !searchQuery ||
      item.eventId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.eventType?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Header Row with Right-End Trigger Button */}
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
               <PageHeader title="Events & khateeb Management" />
             </div>
           
             <button className="btn-add-staff">
               <Plus size={18} />
               Add Events
             </button>
             </div>

          <div className="donation-info-box">
            Admin can create Khateeb/Qari profiles, assign Hadia Fund, appoint Qari for Ramadan Taraweeh and assign topics for Jummah or any event.
          </div>

          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search Event ID, Name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>
          </div>

          <DataTable
            headers={[
              "Event ID",
              "Event",
              "Person",
              "Topic",
              "Hadia",
              "Payment Status",
              "Action"
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Loading records...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No records found.
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item._id}>
                  <td>{item.eventId}</td>
                  <td>
                    <strong>{item.eventType}</strong>
                  </td>
                  <td>{item.fullName}</td>
                  <td>{item.assignedTopic || "N/A"}</td>
                  <td>Rs. {item.hadiaAmount?.toLocaleString()}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.paymentStatus === "Paid" || item.paymentStatus === "Verified"
                            ? "#dcfce7"
                            : item.paymentStatus === "Pending"
                            ? "#fef3c7"
                            : "#e5e7eb",
                        color:
                          item.paymentStatus === "Paid" || item.paymentStatus === "Verified"
                            ? "#166534"
                            : item.paymentStatus === "Pending"
                            ? "#92400e"
                            : "#374151",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(item._id)}
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

      {/* Modal Wrapper Containing Form */}
      <ModalWrapper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Event & Khateeb Record"
      >
        <AddClassForm fields={EventsKhateebFormSchema} onSubmit={handleFormSubmit} />
      </ModalWrapper>
    </div>
  );
};

export default EventsKhateeb;