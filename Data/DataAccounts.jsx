export const DonationsData = [
  {
    id: 1,
    donationId: "DON-0001",
    donorName: "Muhammad Ahmed",
    donationType: "Cash",
    fundCategory: "General Fund",
    amount: "Rs. 25,000",
    status: "Verified",
  },
  {
    id: 2,
    donationId: "DON-0002",
    donorName: "Abdul Rehman",
    donationType: "Online Transfer",
    fundCategory: "Zakat Fund",
    amount: "Rs. 15,000",
    status: "Pending",
  },
  {
    id: 3,
    donationId: "DON-0003",
    donorName: "Fatima Ali",
    donationType: "Cheque",
    fundCategory: "Construction Fund",
    amount: "Rs. 50,000",
    status: "Completed",
  },
];

export const DonationsFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "DonationId",
        label: "Donation ID",
        placeholder: "DON-0001",
        required: true,
      },
      {
        name: "DonorName",
        label: "Donor Name",
        placeholder: "Enter donor name",
        required: true,
      },
      {
        name: "DonorPhone",
        label: "Donor Phone",
        placeholder: "03xx-xxxxxxx",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "DonorCNIC",
        label: "Donor CNIC",
        placeholder: "42101-xxxxxxx-x",
        required: true,
      },
      {
        name: "DonationType",
        label: "Donation Type",
        type: "select",
        options: [
          "Cash",
          "Online Transfer",
          "Cheque",
          "Bank Deposit",
        ],
        required: true,
      },
      {
        name: "FundCategory",
        label: "Fund Category",
        type: "select",
        options: [
          "General Fund",
          "Zakat Fund",
          "Sadaqah Fund",
          "Construction Fund",
          "Madrasa Fund",
          "Ramzan Fund",
          "Welfare Fund",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Amount",
        label: "Amount",
        placeholder: "Enter amount",
        required: true,
      },
      {
        name: "DonationDate",
        label: "Donation Date",
        type: "date",
        required: true,
      },
      {
        name: "ReceiptNumber",
        label: "Receipt Number",
        placeholder: "Auto generated",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "QrVerificationCode",
        label: "QR Verification Code",
        placeholder: "QR code",
      },
      {
        name: "ReceiptProof",
        label: "Upload Receipt / Proof",
        type: "file",
      },
      {
        name: "Status",
        label: "Status",
        type: "select",
        options: [
          "Pending",
          "Verified",
          "Completed",
          "Rejected",
        ],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "Notes",
    label: "Notes",
    placeholder: "Donation notes...",
    rows: 4,
  },
];
export const ExpensesData = [
  {
    id: 1,
    expenseId: "EXP-0001",
    category: "Electricity",
    fundUsed: "General Fund",
    amount: "Rs. 18,000",
    vendor: "K-Electric",
    approvalStatus: "Approved",
    postingStatus: "Posted",
  },
  {
    id: 2,
    expenseId: "EXP-0002",
    category: "Staff Salary",
    fundUsed: "General Fund",
    amount: "Rs. 65,000",
    vendor: "Masjid Staff",
    approvalStatus: "Pending",
    postingStatus: "Draft",
  },
  {
    id: 3,
    expenseId: "EXP-0003",
    category: "Cleaning",
    fundUsed: "Welfare Fund",
    amount: "Rs. 7,500",
    vendor: "Cleaning Services",
    approvalStatus: "Approved",
    postingStatus: "Posted",
  },
];

export const ExpensesFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "ExpenseId",
        label: "Expense ID",
        placeholder: "EXP-0001",
        required: true,
      },
      {
        name: "ExpenseCategory",
        label: "Expense Category",
        type: "select",
        options: [
          "Electricity",
          "Water",
          "Cleaning",
          "Staff Salary",
          "Maintenance",
          "Internet",
          "Security",
          "Other",
        ],
        required: true,
      },
      {
        name: "FundUsed",
        label: "Fund Used",
        type: "select",
        options: [
          "General Fund",
          "Zakat Fund",
          "Sadaqah Fund",
          "Construction Fund",
          "Madrasa Fund",
          "Welfare Fund",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Amount",
        label: "Amount",
        placeholder: "Expense amount",
        required: true,
      },
      {
        name: "ExpenseDate",
        label: "Expense Date",
        type: "date",
        required: true,
      },
      {
        name: "PaymentMethod",
        label: "Payment Method",
        type: "select",
        options: [
          "Cash",
          "Cheque",
          "Online Transfer",
          "Bank Transfer",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "VendorPayeeName",
        label: "Vendor / Payee Name",
        placeholder: "Enter vendor or payee",
        required: true,
      },
      {
        name: "BillReceiptUpload",
        label: "Bill / Receipt Upload",
        type: "file",
      },
      {
        name: "ApprovalStatus",
        label: "Approval Status",
        type: "select",
        options: [
          "Pending",
          "Approved",
          "Rejected",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "ApprovedBy",
        label: "Approved By",
        placeholder: "Admin name",
        required: true,
      },
      {
        name: "PostingStatus",
        label: "Posting Status",
        type: "select",
        options: [
          "Draft",
          "Posted",
          "Cancelled",
        ],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "Description",
    label: "Description",
    placeholder: "Expense details...",
    rows: 4,
  },
];
export const FundsData = [
  {
    id: 1,
    fundCode: "FND-001",
    fundName: "General Fund",
    openingBalance: "Rs. 500,000",
    currentBalance: "Rs. 425,000",
    ledgerType: "Income & Expense",
    status: "Active",
  },
  {
    id: 2,
    fundCode: "FND-002",
    fundName: "Zakat Fund",
    openingBalance: "Rs. 250,000",
    currentBalance: "Rs. 190,000",
    ledgerType: "Restricted",
    status: "Active",
  },
  {
    id: 3,
    fundCode: "FND-003",
    fundName: "Construction Fund",
    openingBalance: "Rs. 1,000,000",
    currentBalance: "Rs. 875,000",
    ledgerType: "Project",
    status: "Active",
  },
];

export const FundsFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "FundCode",
        label: "Fund Code",
        placeholder: "FND-001",
        required: true,
      },
      {
        name: "FundName",
        label: "Fund Name",
        type: "select",
        options: [
          "General Fund",
          "Zakat Fund",
          "Madrasa Fund",
          "Construction Fund",
          "Welfare Fund",
          "Jummah Fund",
          "Hadia Fund",
        ],
        required: true,
      },
      {
        name: "OpeningBalance",
        label: "Opening Balance",
        placeholder: "0",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "CurrentBalance",
        label: "Current Balance",
        placeholder: "0",
        required: true,
      },
      {
        name: "LedgerType",
        label: "Ledger Type",
        type: "select",
        options: [
          "Income & Expense",
          "Restricted",
          "Project",
          "Donation",
          "Operational",
        ],
        required: true,
      },
      {
        name: "Status",
        label: "Status",
        type: "select",
        options: [
          "Active",
          "Inactive",
          "Closed",
        ],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "Description",
    label: "Description",
    placeholder: "Fund details and purpose...",
    rows: 4,
  },
];
export const BankCashData = [
  {
    id: 1,
    transactionId: "TRX-0001",
    accountType: "Bank",
    bankName: "Meezan Bank",
    transactionType: "Deposit",
    amount: "Rs. 50,000",
    reconcileStatus: "Reconciled",
  },
  {
    id: 2,
    transactionId: "TRX-0002",
    accountType: "Cash",
    bankName: "-",
    transactionType: "Withdrawal",
    amount: "Rs. 15,000",
    reconcileStatus: "Pending",
  },
  {
    id: 3,
    transactionId: "TRX-0003",
    accountType: "Bank",
    bankName: "HBL",
    transactionType: "Transfer",
    amount: "Rs. 100,000",
    reconcileStatus: "Reconciled",
  },
];

export const BankCashFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "TransactionId",
        label: "Transaction ID",
        placeholder: "TRX-0001",
        required: true,
      },
      {
        name: "AccountType",
        label: "Account Type",
        type: "select",
        options: ["Bank", "Cash"],
        required: true,
      },
      {
        name: "BankName",
        label: "Bank Name",
        placeholder: "Bank name",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "AccountNumber",
        label: "Account Number",
        placeholder: "Account number",
        required: true,
      },
      {
        name: "TransactionType",
        label: "Transaction Type",
        type: "select",
        options: [
          "Deposit",
          "Withdrawal",
          "Transfer",
          "Payment",
          "Receipt",
        ],
        required: true,
      },
      {
        name: "Amount",
        label: "Amount",
        placeholder: "Amount",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Date",
        label: "Date",
        type: "date",
        required: true,
      },
      {
        name: "ReferenceNumber",
        label: "Reference Number",
        placeholder: "Reference no",
      },
      {
        name: "ReconcileStatus",
        label: "Reconcile Status",
        type: "select",
        options: [
          "Pending",
          "Reconciled",
          "Mismatch",
        ],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "Remarks",
    label: "Remarks",
    placeholder: "Transaction remarks...",
    rows: 4,
  },
];
export const ReportsData = [
  {
    id: 1,
    reportId: "REP-001",
    reportType: "Monthly Income Report",
    fundCategory: "General Fund",
    exportFormat: "PDF",
    generatedBy: "Muhammad Ahmed",
    period: "Jan 2026",
  },
  {
    id: 2,
    reportId: "REP-002",
    reportType: "Expense Report",
    fundCategory: "Zakat Fund",
    exportFormat: "Excel",
    generatedBy: "Abdul Rehman",
    period: "Feb 2026",
  },
  {
    id: 3,
    reportId: "REP-003",
    reportType: "Donation Report",
    fundCategory: "Construction Fund",
    exportFormat: "PDF",
    generatedBy: "Fatima Ali",
    period: "Mar 2026",
  },
];

export const ReportsFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "ReportType",
        label: "Report Type",
        type: "select",
        options: [
          "Monthly Income Report",
          "Yearly Income Report",
          "Expense Report",
          "Donation Report",
          "Fund Summary Report",
          "Category Wise Report",
          "Donor Wise Report",
          "Date Wise Report",
        ],
        required: true,
      },
      {
        name: "FromDate",
        label: "From Date",
        type: "date",
        required: true,
      },
      {
        name: "ToDate",
        label: "To Date",
        type: "date",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "FundCategory",
        label: "Fund Category",
        type: "select",
        options: [
          "General Fund",
          "Zakat Fund",
          "Madrasa Fund",
          "Construction Fund",
          "Welfare Fund",
          "Jummah Fund",
          "Hadia Fund",
        ],
        required: true,
      },
      {
        name: "ExportFormat",
        label: "Export Format",
        type: "select",
        options: ["PDF", "Excel"],
        required: true,
      },
      {
        name: "GeneratedBy",
        label: "Generated By",
        placeholder: "Admin name",
        required: true,
      },
    ],
  },
];