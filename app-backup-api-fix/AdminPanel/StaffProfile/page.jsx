"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus } from "lucide-react";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";

import { StaffFormSchema } from "@/Data/Data";
import { fetchStaff, createStaff } from "@/utils/api";

import "../../css/Pages.css";

const StaffProfile = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdFilter, setSelectedIdFilter] = useState("All");
  const [selectedNameFilter, setSelectedNameFilter] = useState("All");

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    setLoading(true);
    const data = await fetchStaff();
    setStaffList(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleAddStaff = async (formData) => {
    console.log("Raw Staff Form Data Received:", formData);

    const payload = {
      staffId: formData?.staffId || formData?.["Staff ID"] || `STF-${Math.floor(100 + Math.random() * 900)}`,
      fullName: formData?.fullName || formData?.["Full Name"] || "Unnamed Staff",
      fatherName: formData?.fatherName || formData?.["Father Name"] || "",
      cnic: formData?.cnic || formData?.["CNIC"] || "",
      phone: formData?.phone || formData?.["Phone"] || "",
      email: formData?.email || formData?.["Email"] || "",
      address: formData?.address || formData?.["Address"] || "",
      designation: formData?.designation || formData?.["Designation"] || "Teacher",
      education: formData?.education || formData?.["Education / Sanad"] || "",
      experience: formData?.experience || formData?.["Experience"] || "",
      joiningDate: formData?.joiningDate || formData?.["Joining Date"] || "",
      currentMonthlySalary: Number(formData?.currentMonthlySalary || formData?.["Current Monthly Salary"] || 0),
      previousSalary: Number(formData?.previousSalary || formData?.["Previous Salary"] || 0),
      salaryIncreaseAmount: Number(formData?.salaryIncreaseAmount || formData?.["Salary Increase Amount"] || 0),
      salaryIncreaseDate: formData?.salaryIncreaseDate || formData?.["Salary Increase Date"] || "",
      increaseReason: formData?.increaseReason || formData?.["Increase Reason"] || "",
      ramadanBonus: Number(formData?.ramadanBonus || formData?.["Ramadan Special Bonus"] || 0),
      bonusMonth: formData?.bonusMonth || formData?.["Bonus Month"] || "",
      status: formData?.status || formData?.["Status"] || "Verified"
    };

    console.log("Processed Staff Payload:", payload);

    const result = await createStaff(payload);
    if (result && result.success) {
      alert("Staff profile saved successfully: " + payload.fullName);
      setIsModalOpen(false); // Close modal on success
      loadStaff();
    } else {
      alert("Error saving staff: " + (result?.error || "Unknown error"));
    }
  };

  const handleDownloadPdf = (id) => {
    window.open(`http://localhost:5002/api/staff/${id}/pdf`, "_blank");
  };

  // Filtering & Searching Logic
  const filteredStaff = staffList.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      (item.fullName && item.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.staffId && item.staffId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.designation && item.designation.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesId = selectedIdFilter === "All" || item.staffId === selectedIdFilter;
    const matchesName = selectedNameFilter === "All" || item.fullName?.toLowerCase() === selectedNameFilter.toLowerCase();

    return matchesSearch && matchesId && matchesName;
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
               <PageHeader title="Staff Profile Mangement" />
             </div>
           
             <button className="btn-add-staff">
               <Plus size={18} />
               Add Staff
             </button>
             </div>

          <div className="donation-info-box">
            Manage staff profiles, designations, salary structures, bonuses, and record verification.
          </div>

          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Search staff ID or name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }} 
              />
            </div>

            <select 
              className="filter-select"
              value={selectedIdFilter}
              onChange={(e) => setSelectedIdFilter(e.target.value)}
            >
              <option value="All">All Staff IDs</option>
              {staffList.map((s) => (
                <option key={s._id} value={s.staffId}>{s.staffId}</option>
              ))}
            </select>

            <select 
              className="filter-select"
              value={selectedNameFilter}
              onChange={(e) => setSelectedNameFilter(e.target.value)}
            >
              <option value="All">All Staff Names</option>
              {staffList.map((s) => (
                <option key={s._id} value={s.fullName}>{s.fullName}</option>
              ))}
            </select>
          </div>

          <DataTable
            headers={[
              "Staff ID",
              "Staff Name",
              "Role / Designation",
              "Current Salary",
              "Ramadan Bonus",
              "Status",
              "Action"
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Loading staff records...
                </td>
              </tr>
            ) : filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No staff records found.
                </td>
              </tr>
            ) : (
              filteredStaff.map((item) => (
                <tr key={item._id}>
                  <td>{item.staffId}</td>
                  <td>
                    <strong>{item.fullName}</strong>
                  </td>
                  <td>{item.designation}</td>
                  <td>Rs. {item.currentMonthlySalary?.toLocaleString()}</td>
                  <td>Rs. {item.ramadanBonus?.toLocaleString()}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          item.status === "Verified" || item.status === "Active"
                            ? "#dcfce7"
                            : item.status === "Pending"
                            ? "#fef3c7"
                            : "#e5e7eb",
                        color:
                          item.status === "Verified" || item.status === "Active"
                            ? "#166534"
                            : item.status === "Pending"
                            ? "#92400e"
                            : "#374151",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.status}
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
        title="Add New Staff"
      >
        <AddClassForm fields={StaffFormSchema} onSubmit={handleAddStaff} />
      </ModalWrapper>
    </div>
  );
};

export default StaffProfile;