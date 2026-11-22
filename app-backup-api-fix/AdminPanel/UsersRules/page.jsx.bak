"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Plus, Edit, Trash2, Eye, EyeOff, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";

import Sidebar2 from "@/components/Sidebar";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import AddClassForm from "@/components/AddClassForm";
import ModalWrapper from "@/components/ModalWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";

import { UsersRolesFormSchema } from "@/Data/Data";
import { 
  fetchUsersRoles, 
  createUserRole, 
  updateUserRole, 
  deleteUserRole,
  getCurrentUser 
} from "@/utils/api";

import "../../../app/css/Pages.css";

const UsersRules = () => {
  const router = useRouter();
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Search & Status Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchUsersRoles();
      console.log('Fetched users:', response);
      
      // Fix: response is already an array from fetchUsersRoles
      if (Array.isArray(response)) {
        setUsersList(response);
      } else if (response && response.data) {
        setUsersList(response.data);
      } else {
        setUsersList([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading users:", error);
      setUsersList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchQuery, selectedStatusFilter, selectedRoleFilter]);

  const handleAddUserRole = async (formData) => {
    try {
      const payload = {
        userId: formData?.userId || formData?.["User ID"] || `USR-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: formData?.fullName || formData?.["Full Name"] || "",
        username: formData?.username || formData?.["Email / Username"] || formData?.["Username"] || "",
        password: formData?.password || formData?.["Password"] || "default123",
        role: formData?.role || formData?.["Role"] || "Viewer",
        twoFactor: formData?.twoFactor || formData?.["Two-Step Authentication"] || formData?.["2FA"] || "Disabled",
        status: formData?.status || formData?.["Status"] || "Active",
      };

      let result;
      if (editingUser) {
        result = await updateUserRole(editingUser._id, payload);
      } else {
        result = await createUserRole(payload);
      }

      if (result && result.success) {
        alert(editingUser ? "User updated successfully!" : "User created successfully!");
        setIsModalOpen(false);
        setEditingUser(null);
        loadUsers();
      } else {
        alert("Error saving user: " + (result?.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error saving user: " + error.message);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (user) => {
    if (confirm(`Are you sure you want to delete user ${user.fullName}?`)) {
      try {
        const result = await deleteUserRole(user._id);
        if (result.success) {
          alert("User deleted successfully!");
          loadUsers();
        } else {
          alert("Error deleting user: " + result.error);
        }
      } catch (error) {
        alert("Error deleting user: " + error.message);
      }
    }
  };

  const handleDownloadPdf = (user) => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api'}/users-roles/${user._id}/pdf`, "_blank");
  };

  const canManageUsers = currentUser?.role === 'Admin' || currentUser?.permissions?.canManageUsers;

  const roles = ["All", "Admin", "Accounts", "Imam", "Moazzin", "Committee Member", "Voter", "Muqtadi", "Viewer"];

  return (
    <ProtectedRoute allowedRoles={['Admin', 'Accounts', 'Committee Member']}>
      <div className="campus-layout">
        <Sidebar2 />

        <div className="main-content">
          <Header />

          <div className="page-container">
            {/* Header Row with Trigger Button */}
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
               <PageHeader title="User & Roles" />
             </div>
           
             <button className="btn-add-staff">
               <Plus size={18} />
               Add User
             </button>
             </div>

            <div className="donation-info-box">
              {currentUser?.role === 'Admin' 
                ? 'Admin access: Full control over all users and roles.'
                : 'Read-only access: You can view users but cannot modify them.'}
            </div>

            {/* Search & Filters */}
            <div className="filters-row">
              <div className="search-box" style={{ position: 'relative', flex: 1 }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
                <input 
                  type="text" 
                  placeholder="Search User ID, Name or Username..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '40px' }} 
                />
              </div>

              <select 
                className="filter-select"
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>

              <select 
                className="filter-select"
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <DataTable
              headers={[
                "#",
                "User ID",
                "Full Name",
                "Username",
                "Role",
                "2FA",
                "Status",
                "Actions",
              ]}
            >
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    Loading database records...
                  </td>
                </tr>
              ) : usersList.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    No user records found.
                  </td>
                </tr>
              ) : (
                usersList.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                    <td>
                      <strong>{item.userId}</strong>
                    </td>

                    <td>{item.fullName}</td>

                    <td>{item.username}</td>

                    <td>
                      <span className="role-badge">
                        {item.role}
                      </span>
                    </td>

                    <td>
                      <span className={item.twoFactor === 'Enabled' ? 'badge-success' : 'badge-warning'}>
                        {item.twoFactor}
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          background:
                            item.status === "Active"
                              ? "#dcfce7"
                              : item.status === "Inactive"
                              ? "#fee2e2"
                              : "#fef3c7",
                          color:
                            item.status === "Active"
                              ? "#166534"
                              : item.status === "Inactive"
                              ? "#991b1b"
                              : "#92400e",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(item)}
                          title="View Details"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            background: "#f3f4f6",
                            border: "1px solid #d1d5db",
                            padding: "6px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            color: "#4f46e5",
                          }}
                        >
                          <Eye size={14} />
                        </button>

                        {canManageUsers && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEditUser(item)}
                              title="Edit User"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "#f3f4f6",
                                border: "1px solid #d1d5db",
                                padding: "6px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: "#059669",
                              }}
                            >
                              <Edit size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteUser(item)}
                              title="Delete User"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "#f3f4f6",
                                border: "1px solid #d1d5db",
                                padding: "6px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: "#dc2626",
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </DataTable>

            {/* Pagination */}
            {usersList.length > 0 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '10px', 
                marginTop: '20px' 
              }}>
                {/* <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'pointer' }}
                >
                  Previous
                </button>
                <span style={{ padding: '8px 16px' }}>
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={usersList.length < itemsPerPage}
                  style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'pointer' }}
                >
                  Next
                </button> */}
              </div>
            )}
          </div>
        </div>

        {/* Modal Form Wrapper */}
        <ModalWrapper 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }} 
          title={editingUser ? "Edit User & Role" : "Add New User & Role"}
        >
          <AddClassForm 
            fields={UsersRolesFormSchema} 
            onSubmit={handleAddUserRole} 
            initialData={editingUser}
          />
        </ModalWrapper>
      </div>
    </ProtectedRoute>
  );
};

export default UsersRules;