"use client";

import React, { useState } from 'react';
import { Layers, LayoutGrid, Users, Search, FileText } from 'lucide-react';
import Sidebar2 from '@/components/Sidebar'; 
import Header from '@/components/Header';

// Shared UI Primitives
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import ModalWrapper from '@/components/ModalWrapper';

// Clean data wiring using the updated schemas
import AddClassForm from '@/components/AddClassForm';
import { quotationFormSchema, quotationClassesData } from '@/Data/Data'; 

import "../css/Pages.css"; 

const QuotationTool = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader 
            title="Quotation Tool"
            subtitle="Create, manage, and track professional energy valuations with automatic configurations."
            btnText="Calculate System"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Calculated Setups" value="2" dotColor="#555" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Accumulated Margins" value="$5,706" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Active Status" value="Online" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search parameters..." style={{ paddingLeft: '40px' }} />
            </div>
            <select className="filter-select"><option>Filter by System Size</option></select>
            <select className="filter-select"><option>Margin Target Filter</option></select>
          </div>

       {/* FIXED: Exactly 5 headers matching the 5 column elements underneath */}
<DataTable headers={['Energy storage advice', 'Recommended Products', 'Selling Price', 'Installer Margin', 'Export Action']}>
  {quotationClassesData.map((item) => (
    <tr key={item.id}>
      {/* 1. Energy Storage Advice */}
      <td><strong>{item.name}</strong></td>
      
      {/* 2. Recommended Products */}
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
      
      {/* 3. Selling Price */}
      <td>{item.fee}</td>
      
      {/* 4. Installer Margin */}
      <td>{item.capacity}</td>
    {/* 5. Export Action (With PDF Icon) */}
<td>
  <button 
    type="button" 
    onClick={() => alert(`Downloading PDF report configuration for ${item.name}`)}
    style={{ 
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: '#f3f4f6', 
      border: '1px solid #d1d5db', 
      padding: '4px 10px', 
      borderRadius: '4px', 
      cursor: 'pointer', 
      fontSize: '12px',
      color: '#dc2626',
      fontWeight: '600'
    }}
  >
    {/* Make sure you have 'FileText' imported from 'lucide-react' at the top of the file */}
    <FileText size={14} color="#dc2626" />
    <span>PDF</span>
  </button>
</td>
    </tr>
  ))}
</DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Energy Model">
        <AddClassForm fields={quotationFormSchema} buttonText="Generate Automatic Profile Run" />
      </ModalWrapper>
    </div>
  );
};

export default QuotationTool;