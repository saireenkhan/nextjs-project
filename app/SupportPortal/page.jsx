"use client";

import React, { useState,  } from 'react';
import Link from 'next/link';
import { Layers, LayoutGrid, Users, Search } from 'lucide-react';
import Sidebar2 from '@/components/Sidebar'; 
import Header from '@/components/Header';

// Shared UI Primitives
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import ModalWrapper from '@/components/ModalWrapper';

// Dynamic Core Form and Data Configurations
import AddClassForm from '@/components/AddClassForm';
import { supportFormSchema, supportTicketsData } from '@/Data/Data'; 

import "../css/Pages.css"; 

const SupportPortal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader 
            title="Support Portal"
            subtitle="Manage support requests, track issue resolution, and provide timely assistance to users."
            btnText="Create Ticket"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Total Tickets" value="2" dotColor="#555" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Open Issues" value="1" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Avg. Response" value="14m" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by ticket name or issue id..." style={{ paddingLeft: '40px' }} />
            </div>
            <select className="filter-select"><option>Filter by Category</option></select>
            <select className="filter-select"><option>Urgency Capacity</option></select>
          </div>

          <DataTable headers={['Ticket ID & Title', 'Tracking Tags', 'Submitted By', 'Created Date', 'complain', 'Status']}>
            {supportTicketsData.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.name}</strong></td>
                <td>
                  {item.sections.map((sec, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        background: '#f3f4f6', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        marginRight: idx === 0 ? '4px' : '0px' 
                      }}
                    >
                      {sec}
                    </span>
                  ))}
                </td>
                <td>{item.department}</td>
                <td>{item.fee}</td>
              {/* 5. Updated timestamp with inline Read More Link */}
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
                <td>
                  <span 
                    className="status-badge" 
                    style={{ 
                      background: item.status === 'RESOLVED' ? '#dcfce7' : '#fef3c7', 
                      color: item.status === 'RESOLVED' ? '#16a34a' : '#d97706', 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '700' 
                    }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="File Support Incident Ticket">
        <AddClassForm fields={supportFormSchema} buttonText="Register Ticket Case Entry" />
      </ModalWrapper>
    </div>
  );
};

export default SupportPortal;