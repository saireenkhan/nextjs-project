"use client";

import React, { useState } from 'react';
import { Layers, LayoutGrid, Users, Search } from 'lucide-react';
import Sidebar2 from '@/components/Sidebar'; 
import Header from '@/components/Header';

// Shared UI Primitives
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import ModalWrapper from '@/components/ModalWrapper';

// Clean data wiring using the updated integration schemas
import AddClassForm from '@/components/AddClassForm';
import { crmFormSchema, crmIntegrationData } from '@/Data/Data'; 

import "../css/Pages.css"; 

const CRM = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader 
            title="CRM & ERP Integration"
            subtitle="Connect and synchronize external CRM pipelines and internal ERP data models effortlessly."
            btnText="Configure Integration"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Active Pipelines" value="2" dotColor="#555" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Data Streams" value="6" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Sync Health" value="Optimal" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search pipeline gateways..." style={{ paddingLeft: '40px' }} />
            </div>
            <select className="filter-select"><option>Filter by Domain</option></select>
            <select className="filter-select"><option>Payload Rules</option></select>
          </div>

         {/* FIXED: Shortened table headers array with crisp columns mapping to the 6 elements below */}
<DataTable headers={['Gateway', 'Synchronized Assets', 'Sync Mode', 'Protocol', 'Stream Status', 'Status']}>
  {crmIntegrationData.map((item) => (
    <tr key={item.id}>
      {/* 1. Gateway */}
      <td><strong>{item.name}</strong></td>
      
      {/* 2. Synchronized Assets (Mapped Sections Array Tags) */}
      <td>
        {item.sections.map((sec, idx) => (
          <span 
            key={idx} 
            style={{ 
              background: '#f3f4f6', 
              padding: '2px 8px', 
              borderRadius: '4px', 
              fontSize: '12px', 
              marginRight: idx === item.sections.length - 1 ? '0px' : '4px' 
            }}
          >
            {sec}
          </span>
        ))}
      </td>
      
      {/* 3. Sync Mode */}
      <td>{item.department}</td>
      
      {/* 4. Protocol */}
      <td>{item.fee}</td>
      
      {/* 5. Stream Status */}
      <td>{item.capacity}</td>
      
      {/* 6. Operational Status Badge */}
      <td>
        <span 
          className="status-badge" 
          style={{ 
            background: item.status === 'CONNECTED' ? '#dcfce7' : '#fee2e2', 
            color: item.status === 'CONNECTED' ? '#16a34a' : '#dc2626', 
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Provision Gateway Integration Profile">
        <AddClassForm fields={crmFormSchema} buttonText="Initialize Secure Cloud Pipeline" />
      </ModalWrapper>
    </div>
  );
};

export default CRM;