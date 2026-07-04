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

// Clean data wiring using the updated resource schemas
import AddClassForm from '@/components/AddClassForm';
import { knowledgeFormSchema, knowledgeBaseData } from '@/Data/Data'; 

import "../css/Pages.css"; 

const KnowledgeCenter = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader 
            title="Knowledge Center"
            subtitle="Centralize, organize, and access important knowledge, technical docs, and resources in one place."
            btnText="Add Knowledge"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Total Articles" value="2" dotColor="#555" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Categories" value="4" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Active Drivers" value="Shared" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search resources..." style={{ paddingLeft: '40px' }} />
            </div>
            <select className="filter-select"><option>Filter by Department</option></select>
            <select className="filter-select"><option>Storage Threshold</option></select>
          </div>
<DataTable headers={['Resource Title', 'Category Tags', 'Topic Area', 'Format Type', 'Ref / Version', 'Action']}>
  {knowledgeBaseData.map((item) => (
    <tr key={item.id}>
      {/* 1. Resource Title */}
      <td><strong>{item.name}</strong></td>
      
      {/* 2. Category Tags Array */}
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
      
      {/* 3. Topic Area */}
      <td>{item.department}</td>
      
      {/* 4. Format Type */}
      <td>{item.fee}</td>
      
      {/* 5. Ref / Version Info */}
      <td>{item.capacity}</td>

      {/* 6. Clean Export Action with Icon */}
      <td>
        <button 
          type="button" 
          onClick={() => alert(`Opening resource: ${item.name}`)}
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
          <span>Open</span>
        </button>
      </td>
    </tr>
  ))}
</DataTable>

```
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Documentation Resource">
        <AddClassForm fields={knowledgeFormSchema} buttonText="Publish Technical Resource" />
      </ModalWrapper>
    </div>
  );
};

export default KnowledgeCenter;