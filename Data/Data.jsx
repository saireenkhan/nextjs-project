// Data for admin panel

export const DonationData = [
  {
    id: "DON-0001",
    donorName: "Muhammad Ahmed",
    donationType: "Zakat",
    amount: "Rs. 25,000",
    status: "Verified",
  },
  {
    id: "DON-0002",
    donorName: "Abdul Rehman",
    donationType: "Masjid Fund",
    amount: "Rs. 10,000",
    status: "Pending",
  },
  {
    id: "DON-0003",
    donorName: "Fatima Ali",
    donationType: "Sadaqah",
    amount: "Rs. 5,000",
    status: "Completed",
  },
];

export const DonationFormSchema = [
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
        name: "donorName",
        label: "Donor Name",
        placeholder: "Enter donor name",
        required: true,
      },
      {
        name: "donorPhone",
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
        name: "donorCnic",
        label: "Donor CNIC",
        placeholder: "42101-1234567-1",
        required: true,
      },
      {
        name: "donationType",
        label: "Donation Type",
        type: "select",
        options: [
          "Cash",
          "Online Transfer",
          "Bank Transfer",
          "Cheque",
        ],
        required: true,
      },
      {
        name: "fundCategory",
        label: "Fund Category",
        type: "select",
        options: [
          "General Donation",
          "Zakat",
          "Sadaqah",
          "Masjid Fund",
          "Building Fund",
          "Education Fund",
        ],
        required: true,
      },
    ],
  },


  {
    type: "row",
    fields: [
      {
        name: "amount",
        label: "Amount",
        placeholder: "Enter amount",
        required: true,
      },
      {
        name: "donationDate",
        label: "Donation Date",
        type: "date",
        required: true,
      },
      {
        name: "receiptNumber",
        label: "Receipt Number",
        placeholder: "Auto Generated",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "qrCode",
        label: "QR Verification",
        placeholder: "Enter QR code",
      },
      {
        name: "receiptProof",
        label: "Upload Receipt",
        type: "file",
      },
      {
        name: "status",
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
    name: "notes",
    label: "Notes",
    placeholder: "Donation notes...",
    rows: 4,
  },
];
export const ExpensesData = [
  {
    id: "EX-0001",
    vendor: "Muhammad Ahmed",
    expenseType: "Zakat",
    amount: "Rs. 25,000",
    status: "Verified",
  },
  {
    id: "EX-0002",
    vendor: "Abdul Rehman",
    expenseType: "Masjid Fund",
    amount: "Rs. 10,000",
    status: "Pending",
  },
  {
    id: "EX-0003",
    vendor: "Fatima Ali",
    expenseType: "Sadaqah",
    amount: "Rs. 5,000",
    status: "Completed",
  },
];

export const ExpensesFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "ExpensesId",
        label: "Expenses ID",
        placeholder: "Ex-0001",
        required: true,
      },
            {
        name: "Amount",
        label: "Amount",
        placeholder: "Expenses amount",
        required: true,
      },
      {
        name: "Vender",
        label: "Vender",
        placeholder: "Enter vendor",
        required: true,
      },
    ],
  },
{
    type: "row",
    fields: [
      {
        name: "ExpensesCategory",
        label: "Expenses Category",
        type: "select",
        options: [
          "Electricity",
          "Water",
          "Cleaning",
          "Staff salary",
          "Maintenance",
          "Utility Bills",
          "hadia",
          "Ramzan Bonus",
          "Other",
        ],
        required: true,
      },
            {
        name: "FundUsed",
        label: "Fund Used",
        type: "select",
        options: [
          "Masjid general fund",
          "Zakat fund",
          "Construction fund",
          "Madrasa fund",
          "WellFare",
          "Jummah",
          "hadia fund",
          "Ramzan Bonus",
          "Other",
        ],
        required: true,
      },
      {
        name: "Paymentmethod",
        label: "Payment method",
        type: "select",
        options: [
          "cash",
          "cheque",
          "online transfer",
          "bank transfer",

        ],
        required: true,
      },
    ],
  },
  
  {
    type: "row",
    fields: [
      {
        name: "Approved",
        label: "Approved by",
        placeholder: "name",
        required: true,
      },
      {
        name: "ExpenseDate",
        label: "Expense Date",
        type: "date",
        required: true,
      },
      {
        name: "status",
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
    type: "row",
    fields: [
      {
        name: "Bill / Receipt Upload",
        label: "Bill / Receipt Upload",
        type: "file",
      },
    ],
  },

  {
    type: "textarea",
    name: "notes",
    label: "Notes",
    placeholder: "Donation notes...",
    rows: 4,
  },
];
export const FundsData = [
  {
    id :1,
    fundCode: "FND-001",
    fundName: "Masjid General Fund",
    openingBalance: "Rs. 500,000",
    currentBalance: "Rs. 425,000",
    ledgerType: "Income",
    status: "Active",
  },
  {
      id :2,
    fundCode: "FND-002",
    fundName: "Zakat Fund",
    openingBalance: "Rs. 200,000",
    currentBalance: "Rs. 150,000",
    ledgerType: "Restricted Fund",
    status: "Active",
  },
  {
     id :3,
    fundCode: "FND-003",
    fundName: "Construction Fund",
    openingBalance: "Rs. 1,000,000",
    currentBalance: "Rs. 850,000",
    ledgerType: "Capital Fund",
    status: "Inactive",
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
          "Masjid General Fund",
          "Zakat Fund",
          "Construction Fund",
          "Madrasa Fund",
          "Welfare Fund",
          "Jummah Fund",
          "Hadia Fund",
          "Ramzan Fund",
          "Other",
        ],
        required: true,
      },
      {
        name: "OpeningBalance",
        label: "Opening Balance",
        type: "number",
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
        type: "number",
        placeholder: "0",
        required: true,
      },
      {
        name: "LedgerType",
        label: "Ledger Type",
        type: "select",
        options: [
          "Income",
          "Expense",
          "Asset",
          "Liability",
          "Capital Fund",
          "Restricted Fund",
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
    placeholder: "Fund details...",
    rows: 4,
  },
];
export const StaffData = [
  {
    id : 1 ,
    staffId: "STF-001",
    name: "Qari Abdul Rehman",
    role: "Imam",
    currentSalary: "RS: 45,000",
    bonus: "RS: 10,000",
    status: "Active",
  },
  {
    id : 2 ,
    staffId: "STF-002",
    name: "Mufti Muhammad Usman",
    role: "Khateeb",
    currentSalary: "RS: 55,000",
    bonus: "RS: 15,000",
    status: "Active",
  },
  {
    id : 3 ,
    staffId: "STF-003",
    name: "Hafiz Bilal Ahmed",
    role: "Qari",
    currentSalary: "RS: 35,000",
    bonus: "RS: 8,000",
    status: "Active",
  },
  {
    id : 4 ,
    staffId: "STF-004",
    name: "Muhammad Salman",
    role: "Moazzin",
    currentSalary: "RS: 28,000",
    bonus: "RS: 5,000",
    status: "Inactive",
  },
];
export const StaffFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "StaffId",
        label: "Staff ID",
        placeholder: "STF-001",
        required: true,
      },
      {
        name: "ProfilePicture",
        label: "Profile Picture",
        type: "file",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "FullName",
        label: "Full Name",
        placeholder: "Enter full name",
        required: true,
      },
      {
        name: "FatherName",
        label: "Father Name",
        placeholder: "Father name",
        required: true,
      },
      {
        name: "CNIC",
        label: "CNIC",
        placeholder: "CNIC",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Phone",
        label: "Phone",
        placeholder: "Phone number",
        required: true,
      },
      {
        name: "Email",
        label: "Email",
        placeholder: "Email",
      },
      {
        name: "Address",
        label: "Address",
        placeholder: "Complete address",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Designation",
        label: "Designation",
        type: "select",
        options: [
          "Imam",
          "Khateeb",
          "Qari",
          "Moazzin",
          "Teacher",
          "Administrator",
          "Caretaker",
          "Other",
        ],
        required: true,
      },
      {
        name: "Education",
        label: "Education / Sanad",
        placeholder: "Religious/academic qualification",
      },
      {
        name: "Experience",
        label: "Experience",
        placeholder: "Experience years",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "JoiningDate",
        label: "Joining Date",
        type: "date",
        required: true,
      },
      {
        name: "CurrentSalary",
        label: "Current Monthly Salary",
        placeholder: "Salary amount",
        required: true,
      },
      {
        name: "PreviousSalary",
        label: "Previous Salary",
        placeholder: "Previous amount",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "SalaryIncreaseAmount",
        label: "Salary Increase Amount",
        placeholder: "Increase amount",
      },
      {
        name: "SalaryIncreaseDate",
        label: "Salary Increase Date",
        type: "date",
      },
      {
        name: "IncreaseReason",
        label: "Increase Reason",
        placeholder: "Reason",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "RamadanBonus",
        label: "Ramadan Special Bonus",
        placeholder: "Bonus amount",
      },
      {
        name: "BonusMonth",
        label: "Bonus Month",
        type: "select",
        options: [
          "Muharram",
          "Safar",
          "Rabi-ul-Awwal",
          "Rabi-us-Sani",
          "Jumada-ul-Awwal",
          "Jumada-us-Sani",
          "Rajab",
          "Shaban",
          "Ramadan",
          "Shawwal",
          "Zul-Qa'dah",
          "Zul-Hijjah",
        ],
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "AttendanceStatus",
        label: "Attendance Status",
        type: "select",
        options: [
          "Present",
          "Absent",
          "On Leave",
          "Half Day",
        ],
      },
      {
        name: "SalaryStatus",
        label: "Salary Status",
        type: "select",
        options: [
          "Paid",
          "Partially Paid",
          "Unpaid",
        ],
      },
      {
        name: "PaidAmount",
        label: "Paid Amount",
        placeholder: "Paid salary",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "UnpaidAmount",
        label: "Unpaid Amount",
        placeholder: "Remaining salary",
      },
    ],
  },

  {
    type: "textarea",
    name: "BioData",
    label: "Complete Bio Data",
    placeholder: "Enter complete staff profile, qualifications, responsibilities, and other details...",
    rows: 5,
  },
];
export const EventsKhateebData = [
  {
    id: 1,
    eventId: "EVT-001",
    event: "Jummah",
    person: "Mufti Ahmed",
    topic: "Importance of Salah",
    hadia: "RS: 15,000",
    status: "Assigned",
  },
  {
    id: 2,
    eventId: "EVT-002",
    event: "Ramadan Taraweeh",
    person: "Qari Abdul Rehman",
    topic: "Quran Recitation",
    hadia: "RS: 25,000",
    status: "Completed",
  },
  {
    id: 3,
    eventId: "EVT-003",
    event: "Eid-ul-Adha Bayan",
    person: "Mufti Muhammad Usman",
    topic: "Sacrifice and Taqwa",
    hadia: "RS: 20,000",
    status: "Pending",
  },
];
export const EventsKhateebFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "EventId",
        label: "Event ID",
        placeholder: "EVT-001",
        required: true,
      },
      {
        name: "EventType",
        label: "Event Type",
        type: "select",
        options: [
          "Jummah",
          "Ramadan Taraweeh",
          "Eid-ul-Fitr",
          "Eid-ul-Adha",
          "Nikah",
          "Janazah",
          "Khatm-e-Quran",
          "Special Bayan",
          "Dars",
          "Other",
        ],
        required: true,
      },
      {
        name: "EventDate",
        label: "Event Date",
        type: "date",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "EventTime",
        label: "Event Time",
        type: "time",
        required: true,
      },
      {
        name: "NeedKhateeb",
        label: "Need Khateeb",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        name: "NeedQari",
        label: "Need Qari for Ramadan Taraweeh",
        type: "select",
        options: ["Yes", "No"],
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "PersonType",
        label: "Person Type",
        type: "select",
        options: [
          "Khateeb",
          "Qari",
          "Imam",
          "Guest Scholar",
        ],
        required: true,
      },
      {
        name: "FullName",
        label: "Full Name",
        placeholder: "Khateeb/Qari name",
        required: true,
      },
      {
        name: "ProfilePicture",
        label: "Profile Picture",
        type: "file",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Phone",
        label: "Phone",
        placeholder: "Phone number",
      },
      {
        name: "CNIC",
        label: "CNIC",
        placeholder: "CNIC",
      },
      {
        name: "Qualification",
        label: "Qualification / Sanad",
        placeholder: "Qualification",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Speciality",
        label: "Speciality",
        placeholder: "Bayan, Qirat, Taraweeh, Dars",
      },
      {
        name: "AssignedTopic",
        label: "Assigned Topic",
        placeholder: "Topic for Jummah or event",
      },
      {
        name: "HadiaFund",
        label: "Hadia Fund",
        type: "select",
        options: [
          "General Fund",
          "Jummah Fund",
          "Ramadan Fund",
          "Hadia Fund",
          "Welfare Fund",
          "Other",
        ],
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "HadiaAmount",
        label: "Hadia Amount",
        placeholder: "Hadia amount",
      },
      {
        name: "PaymentStatus",
        label: "Payment Status",
        type: "select",
        options: [
          "Pending",
          "Paid",
          "Partially Paid",
        ],
      },
      {
        name: "EventStatus",
        label: "Status",
        type: "select",
        options: [
          "Assigned",
          "Pending",
          "Completed",
          "Cancelled",
        ],
      },
    ],
  },
  {
    type: "textarea",
    name: "AdminInstructions",
    label: "Admin Instructions",
    placeholder: "Instructions for Khateeb/Qari/Imam...",
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
    status: "Reconciled",
  },
  {
    id: 2,
    transactionId: "TRX-0002",
    accountType: "Cash",
    bankName: "-",
    transactionType: "Withdrawal",
    amount: "Rs. 15,000",
    status: "Pending",
  },
  {
    id: 3,
    transactionId: "TRX-0003",
    accountType: "Bank",
    bankName: "HBL",
    transactionType: "Transfer",
    amount: "Rs. 25,000",
    status: "Reconciled",
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
          "Not Reconciled",
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
    reportType: "Income Report",
    fromDate: "01/01/2026",
    toDate: "01/31/2026",
    fundCategory: "Masjid General Fund",
    format: "PDF",
    generatedBy: "Admin",
  },
  {
    id: 2,
    reportType: "Expense Report",
    fromDate: "02/01/2026",
    toDate: "02/28/2026",
    fundCategory: "Zakat Fund",
    format: "Excel",
    generatedBy: "Manager",
  },
  {
    id: 3,
    reportType: "Donation Report",
    fromDate: "03/01/2026",
    toDate: "03/31/2026",
    fundCategory: "Ramadan Fund",
    format: "PDF",
    generatedBy: "Admin",
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
          "Income Report",
          "Expense Report",
          "Donation Report",
          "Fund Report",
          "Staff Salary Report",
          "Audit Report",
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
          "Masjid General Fund",
          "Zakat Fund",
          "Construction Fund",
          "Madrasa Fund",
          "Welfare Fund",
          "Ramadan Fund",
        ],
        required: true,
      },
      {
        name: "ExportFormat",
        label: "Export Format",
        type: "select",
        options: ["PDF", "Excel", "CSV"],
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
export const VotersData = [
  {
    id: 1,
    voterId: "VOT-001",
    voterName: "Muhammad Ahmed",
    cnic: "42101-1234567-1",
    verificationMethod: "CNIC",
    votingStatus: "Eligible",
  },
  {
    id: 2,
    voterId: "VOT-002",
    voterName: "Abdul Rehman",
    cnic: "42101-9876543-2",
    verificationMethod: "OTP",
    votingStatus: "Voted",
  },
  {
    id: 3,
    voterId: "VOT-003",
    voterName: "Muhammad Usman",
    cnic: "42101-4567891-3",
    verificationMethod: "Phone",
    votingStatus: "Pending",
  },
];

export const VotersFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "VoterId",
        label: "Voter ID",
        placeholder: "VOT-001",
        required: true,
      },
      {
        name: "VoterName",
        label: "Voter Name",
        placeholder: "Committee member / Musalli name",
        required: true,
      },
      {
        name: "CNIC",
        label: "CNIC",
        placeholder: "CNIC",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Phone",
        label: "Phone",
        placeholder: "Phone",
        required: true,
      },
      {
        name: "Email",
        label: "Email",
        placeholder: "Email",
      },
      {
        name: "VerificationMethod",
        label: "Verification Method",
        type: "select",
        options: [
          "CNIC",
          "Phone",
          "Email",
          "OTP",
          "PIN",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "OTP_PIN",
        label: "OTP / PIN",
        placeholder: "Optional",
      },
      {
        name: "VotingStatus",
        label: "Voting Status",
        type: "select",
        options: [
          "Eligible",
          "Voted",
          "Pending",
          "Blocked",
        ],
        required: true,
      },
      {
        name: "DuplicateCheck",
        label: "Duplicate Check",
        type: "select",
        options: [
          "Passed",
          "Duplicate Found",
          "Under Review",
        ],
        required: true,
      },
    ],
  },
];
export const ElectionsData = [
  {
    id: 1,
    electionId: "ELEC-001",
    electionTitle: "Imam Selection 2025",
    electionType: "Election",
    voteType: "Secret Ballot",
    status: "Active",
    resultVisibility: "After Election Ends",
  },
  {
    id: 2,
    electionId: "ELEC-002",
    electionTitle: "Committee Member Selection",
    electionType: "Election",
    voteType: "One Person One Vote",
    status: "Scheduled",
    resultVisibility: "Admin Only",
  },
  {
    id: 3,
    electionId: "ELEC-003",
    electionTitle: "Masjid Improvement Poll",
    electionType: "Poll",
    voteType: "Open Voting",
    status: "Completed",
    resultVisibility: "Public",
  },
];

export const ElectionsFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "ElectionId",
        label: "Election ID",
        placeholder: "ELEC-001",
        required: true,
      },
      {
        name: "ElectionTitle",
        label: "Election Title",
        placeholder: "Imam Selection 2025",
        required: true,
      },
      {
        name: "ElectionType",
        label: "Election Type",
        type: "select",
        options: [
          "Election",
          "Poll",
          "Referendum",
          "Committee Selection",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "VoteType",
        label: "Vote Type",
        type: "select",
        options: [
          "Secret Ballot",
          "Open Voting",
          "One Person One Vote",
          "Multiple Choice",
        ],
        required: true,
      },
      {
        name: "StartTime",
        label: "Start Time",
        type: "datetime-local",
        required: true,
      },
      {
        name: "EndTime",
        label: "End Time",
        type: "datetime-local",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Status",
        label: "Status",
        type: "select",
        options: [
          "Scheduled",
          "Active",
          "Completed",
          "Cancelled",
        ],
        required: true,
      },
      {
        name: "ResultVisibility",
        label: "Result Visibility",
        type: "select",
        options: [
          "Public",
          "Admin Only",
          "After Election Ends",
        ],
        required: true,
      },
      {
        name: "AllowPaperPrintout",
        label: "Allow Paper Printout",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "Description",
    label: "Description / Options",
    placeholder:
      "Enter election description, candidates, voting instructions or poll options...",
    rows: 5,
  },
];
export const CandidatesData = [
  {
    id: 1,
    candidateId: "CAN-001",
    candidateName: "Mufti Ahmed",
    position: "Imam",
    election: "Imam Selection 2025",
    totalVotes: 145,
    votePercentage: "48%",
    status: "Leading",
  },
  {
    id: 2,
    candidateId: "CAN-002",
    candidateName: "Qari Abdul Rehman",
    position: "Imam",
    election: "Imam Selection 2025",
    totalVotes: 120,
    votePercentage: "40%",
    status: "Active",
  },
  {
    id: 3,
    candidateId: "CAN-003",
    candidateName: "Hafiz Bilal Ahmed",
    position: "Imam",
    election: "Imam Selection 2025",
    totalVotes: 35,
    votePercentage: "12%",
    status: "Active",
  },
];

export const CandidatesFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "CandidateId",
        label: "Candidate ID",
        placeholder: "CAN-001",
        required: true,
      },
      {
        name: "CandidateName",
        label: "Candidate Name",
        placeholder: "Candidate name",
        required: true,
      },
      {
        name: "Position",
        label: "Position",
        placeholder: "Position",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Election",
        label: "Election",
        type: "select",
        options: [
          "Imam Selection 2025",
          "Committee Election 2025",
          "Masjid Board Election",
          "General Poll",
        ],
        required: true,
      },
      {
        name: "Photo",
        label: "Photo",
        type: "file",
      },
      {
        name: "TotalVotes",
        label: "Total Votes",
        placeholder: "0",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "VotePercentage",
        label: "Vote Percentage",
        placeholder: "0%",
      },
      {
        name: "Status",
        label: "Status",
        type: "select",
        options: [
          "Active",
          "Leading",
          "Winner",
          "Disqualified",
          "Withdrawn",
        ],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "ShortBio",
    label: "Short Bio",
    placeholder:
      "Enter candidate background, qualifications, experience and introduction...",
    rows: 5,
  },
];
export const RatingsData = [
  {
    id: 1,
    ratingId: "RAT-001",
    personType: "Imam",
    personName: "Qari Abdul Rehman",
    averageRating: "4.8 / 5",
    feedbackBy: "Muhammad Ahmed",
    date: "07/01/2026",
  },
  {
    id: 2,
    ratingId: "RAT-002",
    personType: "Moazzin",
    personName: "Muhammad Salman",
    averageRating: "4.5 / 5",
    feedbackBy: "Anonymous",
    date: "07/03/2026",
  },
  {
    id: 3,
    ratingId: "RAT-003",
    personType: "Committee Member",
    personName: "Abdul Hameed",
    averageRating: "4.2 / 5",
    feedbackBy: "Muhammad Usman",
    date: "07/05/2026",
  },
];

export const RatingsFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "RatingId",
        label: "Rating ID",
        placeholder: "RAT-001",
        required: true,
      },
      {
        name: "PersonType",
        label: "Person Type",
        type: "select",
        options: [
          "Imam",
          "Moazzin",
          "Committee Member",
          "Khateeb",
          "Qari",
        ],
        required: true,
      },
      {
        name: "PersonName",
        label: "Person Name",
        placeholder: "Name",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Knowledge",
        label: "Knowledge",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
        required: true,
      },
      {
        name: "Akhlaq",
        label: "Akhlaq / Adab",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
        required: true,
      },
      {
        name: "Punctuality",
        label: "Punctuality",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "KhutbaQuality",
        label: "Khutba / Azan Quality",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
        required: true,
      },
      {
        name: "CommunityBehavior",
        label: "Community Behavior",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
        required: true,
      },
      {
        name: "AverageRating",
        label: "Average Rating",
        placeholder: "Auto calculated",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "FeedbackBy",
        label: "Feedback By",
        placeholder: "Name or Anonymous",
      },
      {
        name: "Date",
        label: "Date",
        type: "date",
        required: true,
      },
      {
        name: "PublicDisplay",
        label: "Public Display",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "Comment",
    label: "Comment",
    placeholder: "Enter feedback comments...",
    rows: 5,
  },
];
export const ComplaintsData = [
  {
    id: 1,
    complaintId: "CMP-001",
    personName: "Qari Abdul Rehman",
    category: "Behavior",
    priority: "High",
    status: "In Progress",
    assignedTo: "Admin",
  },
  {
    id: 2,
    complaintId: "CMP-002",
    personName: "Muhammad Salman",
    category: "Attendance",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Committee",
  },
  {
    id: 3,
    complaintId: "CMP-003",
    personName: "Abdul Hameed",
    category: "Misconduct",
    priority: "High",
    status: "Resolved",
    assignedTo: "Admin",
  },
];

export const ComplaintsFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "ComplaintId",
        label: "Complaint ID",
        placeholder: "CMP-001",
        required: true,
      },
      {
        name: "ComplaintSource",
        label: "Complaint Source",
        type: "select",
        options: [
          "Muqtadi",
          "Committee Member",
          "Imam",
          "Staff",
          "Anonymous",
        ],
        required: true,
      },
      {
        name: "ComplainantName",
        label: "Complainant Name",
        placeholder: "Optional / Anonymous",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Anonymous",
        label: "Anonymous",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
      {
        name: "PersonType",
        label: "Person Type",
        type: "select",
        options: [
          "Imam",
          "Moazzin",
          "Committee Member",
          "Khateeb",
          "Qari",
          "Staff",
        ],
        required: true,
      },
      {
        name: "PersonName",
        label: "Person Name",
        placeholder: "Person name",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "ComplaintCategory",
        label: "Complaint Category",
        type: "select",
        options: [
          "Behavior",
          "Attendance",
          "Misconduct",
          "Financial",
          "Service Quality",
          "Other",
        ],
        required: true,
      },
      {
        name: "ComplaintDate",
        label: "Complaint Date",
        type: "date",
        required: true,
      },
      {
        name: "EvidenceUpload",
        label: "Evidence Upload",
        type: "file",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Priority",
        label: "Priority",
        type: "select",
        options: [
          "Low",
          "Medium",
          "High",
          "Critical",
        ],
        required: true,
      },
      {
        name: "Status",
        label: "Status",
        type: "select",
        options: [
          "Pending",
          "In Progress",
          "Resolved",
          "Rejected",
        ],
        required: true,
      },
      {
        name: "AssignedTo",
        label: "Assigned To",
        placeholder: "Admin / Committee",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "NotifyComplainant",
        label: "Notify Complainant",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "ComplaintDescription",
    label: "Complaint Description",
    placeholder: "Write complaint details...",
    rows: 4,
  },
];
export const UsersRolesData = [
  {
    id: 1,
    userId: "USR-001",
    fullName: "Muhammad Ahmed",
    username: "admin@masjid.com",
    role: "Admin",
    twoFactor: "Enabled",
    status: "Active",
  },
  {
    id: 2,
    userId: "USR-002",
    fullName: "Qari Abdul Rehman",
    username: "imam@masjid.com",
    role: "Imam",
    twoFactor: "Enabled",
    status: "Active",
  },
  {
    id: 3,
    userId: "USR-003",
    fullName: "Abdul Hameed",
    username: "committee@masjid.com",
    role: "Committee Member",
    twoFactor: "Disabled",
    status: "Inactive",
  },
];

export const UsersRolesFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "UserId",
        label: "User ID",
        placeholder: "USR-001",
        required: true,
      },
      {
        name: "FullName",
        label: "Full Name",
        placeholder: "Full name",
        required: true,
      },
      {
        name: "Username",
        label: "Email / Username",
        placeholder: "Email or username",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        required: true,
      },
      {
        name: "Role",
        label: "Role",
        type: "select",
        options: [
          "Admin",
          "Accounts",
          "Imam",
          "Moazzin",
          "Committee Member",
          "Voter",
          "Muqtadi",
          "Viewer",
        ],
        required: true,
      },
      {
        name: "CanAdd",
        label: "Can Add",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "CanEdit",
        label: "Can Edit",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
      {
        name: "CanDelete",
        label: "Can Delete",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
      {
        name: "TwoFactor",
        label: "Two-Step Authentication",
        type: "select",
        options: ["Enabled", "Disabled"],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Status",
        label: "Status",
        type: "select",
        options: [
          "Active",
          "Inactive",
          "Suspended",
        ],
        required: true,
      },
    ],
  },
];
export const AuditData = [
  {
    id: 1,
    auditId: "AUD-001",
    user: "Muhammad Ahmed",
    module: "Donation Management",
    action: "Add Record",
    timestamp: "07/01/2026 09:30 AM",
    ipAddress: "192.168.1.1",
  },
  {
    id: 2,
    auditId: "AUD-002",
    user: "Admin User",
    module: "Staff Profile",
    action: "Edit Record",
    timestamp: "07/03/2026 11:15 AM",
    ipAddress: "192.168.1.25",
  },
  {
    id: 3,
    auditId: "AUD-003",
    user: "Accounts Manager",
    module: "Bank & Cash Book",
    action: "Delete Record",
    timestamp: "07/05/2026 04:20 PM",
    ipAddress: "192.168.1.45",
  },
];

export const AuditFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "AuditId",
        label: "Audit ID",
        placeholder: "AUD-001",
        required: true,
      },
      {
        name: "User",
        label: "User",
        placeholder: "User name",
        required: true,
      },
      {
        name: "Module",
        label: "Module",
        type: "select",
        options: [
          "Dashboard",
          "Donation Management",
          "Expenses",
          "Funds",
          "Staff Profile",
          "Events & Khateeb",
          "Bank & Cash Book",
          "Reports",
          "Voters",
          "Elections",
          "Candidates",
          "Ratings",
          "Complaints",
          "Users & Roles",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Action",
        label: "Action",
        type: "select",
        options: [
          "Add Record",
          "Edit Record",
          "Delete Record",
          "Login",
          "Logout",
          "Export Report",
          "Backup",
        ],
        required: true,
      },
      {
        name: "Timestamp",
        label: "Timestamp",
        type: "datetime-local",
        required: true,
      },
      {
        name: "IPAddress",
        label: "IP Address",
        placeholder: "192.168.1.1",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "BackupFrequency",
        label: "Backup Frequency",
        type: "select",
        options: [
          "Daily",
          "Weekly",
          "Monthly",
          "Manual",
        ],
        required: true,
      },
      {
        name: "BackupType",
        label: "Backup Type",
        type: "select",
        options: [
          "Local Backup",
          "Cloud Backup",
          "Full Backup",
          "Incremental Backup",
        ],
        required: true,
      },
      {
        name: "DeploymentType",
        label: "Deployment Type",
        type: "select",
        options: [
          "Local Server",
          "Cloud Server",
          "Hybrid",
        ],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "AuditDetails",
    label: "Audit Details",
    placeholder:
      "Enter audit trail details, security notes, backup information and activity logs...",
    rows: 5,
  },
];