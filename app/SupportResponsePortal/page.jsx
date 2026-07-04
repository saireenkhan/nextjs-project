"use client";

import React, { useState } from 'react';
import { Layers, LayoutGrid, Users, Search, ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import Sidebar2 from '@/components/Sidebar'; 
import Header from '@/components/Header';

// Shared UI Primitives
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';

// Load the custom response documentation data
import { supportResponseData } from '@/Data/Data'; 

import "../css/Pages.css"; 

const SupportResponsePortal = () => {
  // Modal tracking states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleOpenReplyModal = (ticket) => {
    setActiveTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveTicket(null);
    setReplyText("");
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    alert(`Reply submitted for ${activeTicket?.name}: \n"${replyText}"`);
    handleCloseModal();
  };

  return (
    <div className="campus-layout" style={{ position: 'relative' }}>
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          {/* Reused layout primitive with navigation support back to main portal */}
          <div style={{ marginBottom: '12px' }}>
            <Link href="/SupportPortal" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: '500' }}>
              <ChevronLeft size={16} />
              Back to Support Tickets
            </Link>
          </div>

          <PageHeader 
            title="Ticket Response Log"
            subtitle="Review active resolutions, technician updates, and diagnostic outputs from engineering teams."
            btnText="" 
            onBtnClick={() => {}}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Resolved Items" value="1" dotColor="#16a34a" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Under Review" value="1" dotColor="#f59e0b" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Avg Clear Rate" value="94%" dotColor="#555" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search operational resolutions..." style={{ paddingLeft: '40px' }} />
            </div>
            <select className="filter-select"><option>Filter by Status</option></select>
            <select className="filter-select"><option>Sort by Age</option></select>
          </div>

          {/* Balanced 6-column layout containing structural actions column */}
          <DataTable headers={['Ticket Reference', 'Categorization', 'Resolving Group', 'Technician Feedback Log', 'Updated', 'Action']}>
            {supportResponseData.map((item) => (
              <tr key={item.id}>
                {/* 1. Ticket Reference */}
                <td><strong>{item.name}</strong></td>
                
                {/* 2. Categorization tags vertically stacked */}
                <td style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                  {item.sections.map((sec, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        background: sec === 'Resolved' ? '#dcfce7' : sec === 'In Progress' ? '#fef3c7' : '#f3f4f6', 
                        color: sec === 'Resolved' ? '#16a34a' : sec === 'In Progress' ? '#d97706' : '#4b5563', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {sec}
                    </span>
                  ))}
                </td>
                
                {/* 3. Resolving Group */}
                <td>{item.department}</td>
                
                {/* 4. Technician Feedback Log */}
                <td style={{ whiteSpace: 'normal', minWidth: '250px', fontSize: '13px', color: '#374151' }}>
                  {item.fee}
                </td>
                
                {/* 5. Updated timestamp */}
              <td>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
               <span>{item.capacity}</span>
              <Link 
               href={`/SupportResponse/${item.id}`} 
                style={{ 
               fontSize: '12px', 
                color: '#25aceb', 
               textDecoration: 'none', 
                    fontWeight: '500' 
                }}
            >
                Read more
               </Link>
             </div>
             </td>

                {/* 6. Reply Action Configuration */}
                <td>
                  <button
                    type="button"
                    onClick={() => handleOpenReplyModal(item)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: '#f3f4f6',
                      border: '1px solid #d1d5db',
                      padding: '3px 5px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#2563eb',
                      fontWeight: '600'
                    }}
                  >
                    <span>Reply</span>
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* Pop-up Interactive Modal Overlay Portal Markup */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={handleCloseModal}
        >
          <div 
            style={{
              background: '#ffffff',
              width: '100%',
              maxWidth: '500px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
              padding: '24px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Post Reply to Ticket
              </h3>
              <button 
                type="button" 
                onClick={handleCloseModal} 
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} color="#6b7280" />
              </button>
            </div>

            {/* Context Meta Box */}
            <div style={{ background: '#f3f4f6', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px', color: '#4b5563' }}>
              <strong>Target:</strong> {activeTicket?.name}
            </div>

            {/* Form Input Area */}
            <form onSubmit={handleSubmitReply}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Your Message / Update</label>
                <textarea
                  required
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response details or update status logs..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    color:'grey',
                  }}
                />
              </div>

              {/* Action Operations Buttons Panel */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '8px 16px',
                    background: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    background: '#dc2626',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  Send Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportResponsePortal;