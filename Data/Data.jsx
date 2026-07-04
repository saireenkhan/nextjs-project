// Data values matching your original table keys perfectly
export const quotationClassesData = [
  {
    id: 1,
    name: "System Ref: QT-001", // Maps to 'Class / Grade' column slot
    sections: ["15 kWh Battery", "Premium Inverter"], // Maps to 'Sections' tag container array
 // Maps to 'Department' column slot
    fee: "$14,200.00", // Maps to 'Monthly Fee' column slot
    capacity: "Margin: $3,550", // Maps to 'Capacity' column slot
    // Maps to your 'Status' badge styling rules
  },
  {
    id: 2,
    name: "System Ref: QT-002",
    sections: ["10 kWh Battery"],
    fee: "$9,800.00",
    capacity: "Margin: $2,156",
    
  }
];

// Structural Form Field Layout Schema mapping seamlessly to AddClassForm layout loop
export const quotationFormSchema = [
  {
    type: "row",
    fields: [
      { name: "className", label: "Annual Consumption (kWh)", placeholder: "e.g. 12500", required: true },
      { name: "Seq No", label: "Solar Production (kWh)", placeholder: "e.g. 10200", required: true }
    ]
  },
  {
    type: "row",
    fields: [
      { name: "gridConnection", label: "Grid Connection Type", placeholder: "e.g. 3-Phase", required: true },
      { name: "electricVehicle", label: "Electric Vehicle Load (kW)", placeholder: "e.g. 11kW (Optional)", required: false }
    ]
  },
  {
    name: "sections",
    label: "Heat Pump System Loads / Special Notes (Comma Separated)",
    placeholder: "e.g. 5kW, Low-Noise, EcoMode...",
    required: false
  }
];
// Keep exact structural keys while updating values for Support Tickets
export const supportTicketsData = [
  {
    id: 1,
    name: "TKT-1024: Inverter Offline", // Maps to 'Class / Grade' column slot
    sections: ["Hardware", "High Priority"], // Maps to 'Sections' tag list array
    department: "SolarTech Installer A", // Maps to 'Department' column slot
    fee: "2026-07-02", // Maps to 'Monthly Fee' column slot
    capacity: "battery issue", // Maps to 'Capacity' column slot
    status: "OPEN" // Maps to 'Status' badge styling
  },
  {
    id: 2,
    name: "TKT-1025: App Login Bug",
    sections: ["Software", "Low Priority"],
    department: "EcoHome Resident X",
    fee: "2026-07-01",
    capacity: "power issue......",
    status: "RESOLVED"
  }
];
export const supportFormSchema = [
  {
    type: "row",
    fields: [
      { name: "className", label: "Ticket Subject / Issue Title", placeholder: "e.g. Battery not charging", required: true },
      { name: "Seq No", label: "Client Reference ID", placeholder: "e.g. CL-882", required: true }
    ]
  },
  {
    type: "row",
    fields: [
      { name: "category", label: "Category Type", placeholder: "e.g. Hardware / Software", required: true },
      { name: "urgency", label: "Urgency Level", placeholder: "e.g. Critical / High / Low", required: true }
    ]
  },
  {
    name: "description",
    label: "Detailed Issue Description",
    placeholder: "Provide a detailed account of the issue...",
    type: "textarea",
    required: true
  },
];
// Data rows mapping client topics to the exact table data keys
export const knowledgeBaseData = [
  {
    id: 1,
    name: "PGS37-1 Storage Regulations", // Maps to Column 1 (Title)
    sections: ["Safety", "PGS37-1", "Compliance"], // Maps to Column 2 (Tags)
    department: "Battery Storage", // Maps to Column 3 (Topic)
    fee: "Official PDF", // Maps to Column 4 (Type)
    capacity: "Updated 2026", // Maps to Column 5 (Ref / Version)
  },
  {
    id: 2,
    name: "Commercial EMS System Overview",
    sections: ["EMS", "Optimization", "Software"],
    department: "Energy Management",
    fee: "Webinar Recording",
    capacity: "Duration: 45m",
  },
  {
    id: 3,
    name: "Hybrid Inverter Installation Guide",
    sections: ["Installation Guides", "Hardware"],
    department: "Inverter Systems",
    fee: "Video Masterclass",
    capacity: "Size: 240 MB",
  },
  {
    id: 4,
    name: "Solar & Battery Subsidy Changes",
    sections: ["Blogs", "Subsidy Info"],
    department: "Finance & Grants",
    fee: "Knowledge Base Article",
    capacity: "Read Time: 5m",
  }
];

// Form schema matching the layout fields
export const knowledgeFormSchema = [
  {
    type: "row",
    fields: [
      { name: "className", label: "Resource Title / Subject", placeholder: "e.g. PGS37-1 Compliance Guide", required: true },
      { name: "Seq No", label: "Reference / Version Info", placeholder: "e.g. v2.4 or 2026 Update", required: true }
    ]
  },
  {
    type: "row",
    fields: [
      { name: "department", label: "Topic Category", placeholder: "e.g. EMS Information / Subsidy", required: true },
      { name: "fee", label: "Format Type", placeholder: "e.g. Installation Video / Blog", required: true }
    ]
  },
  {
    name: "sections",
    label: "Filter Tags (Comma Separated)",
    placeholder: "e.g. Installation Guides, Masterclasses, Webinars...",
    required: false
  }
];

// Data rows mapping specific client gateways and real-time sync states
export const crmIntegrationData = [
  {
    id: 1,
    name: "HubSpot CRM Gateway", // Maps to 'Gateway'
    sections: ["Customer Info", "Orders"], // Maps to 'Sync Type' tags array
    department: "Real-time Sync", // Maps to 'Domain'
    fee: "REST Webhooks", // Maps to 'Protocol'
    capacity: "Active Stream", // Maps to 'Limits'
    status: "CONNECTED" // Maps to 'Status'
  },
  {
    id: 2,
    name: "Exact Online ERP",
    sections: ["Invoices", "Stock"],
    department: "Real-time Sync",
    fee: "REST API v3",
    capacity: "Active Stream",
    status: "CONNECTED"
  },
  {
    id: 3,
    name: "AFAS Integration Portal",
    sections: ["Orders", "Invoices", "Stock"],
    department: "Real-time Sync",
    fee: "Connect API",
    capacity: "Active Stream",
    status: "CONNECTED"
  },
  {
    id: 4,
    name: "ActiveCampaign Flow",
    sections: ["Customer Info"],
    department: "Real-time Sync",
    fee: "Event Webhooks",
    capacity: "Active Stream",
    status: "PAUSED"
  }
];

// Structural form fields configuration mapping directly to your AddClassForm layout loop
export const crmFormSchema = [
  {
    type: "row",
    fields: [
      { name: "className", label: "Gateway Platform Name", placeholder: "e.g. Exact Online / AFAS", required: true },
      { name: "Seq No", label: "Sync Mode Layer", placeholder: "e.g. Real-time Sync / Batch", required: true }
    ]
  },
  {
    type: "row",
    fields: [
      { name: "department", label: "Protocol / Interface Method", placeholder: "e.g. REST API v3 / Webhooks", required: true },
      { name: "fee", label: "Bandwidth / Buffer Status", placeholder: "e.g. Active Stream", required: true }
    ]
  },
  {
    name: "sections",
    label: "Synchronized Assets (Comma Separated)",
    placeholder: "e.g. Stock, Orders, Invoices, Customer Information",
    required: false
  }
];
// Keeping identical structural object keys for target rendering compliance
export const supportResponseData = [
  {
    id: 1,
    name: "Ticket RE: Battery Failure (CL-882)", // Maps to Column 1 (Subject)
    sections: ["Hardware", "Resolved"], // Maps to Column 2 (Tags)
    department: "Support Engineering", // Maps to Column 3 (Handled By)
    fee: "Inverter firmware rolled back to v2.1. System telemetry is stable.", // Maps to Column 4 (Resolution Message)
    capacity: "2 Hours ago", // Maps to Column 5 (Timestamp)
  },
  {
    id: 2,
    name: "Ticket RE: Portal Access Error",
    sections: ["Software", "In Progress"],
    department: "IT Ops Desk",
    fee: "Reset token issued to customer email address. Awaiting verification.",
    capacity: "1 Day ago",
  }
];
