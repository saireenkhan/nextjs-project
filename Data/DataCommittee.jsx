export const VotersData = [
  {
    id: 1,
    voterId: "VOT-001",
    voterName: "Muhammad Ahmed",
    cnic: "42101-1234567-1",
    phone: "03001234567",
    verificationMethod: "OTP",
    votingStatus: "Not Voted",
  },
  {
    id: 2,
    voterId: "VOT-002",
    voterName: "Abdul Rehman",
    cnic: "42101-9876543-2",
    phone: "03111234567",
    verificationMethod: "PIN",
    votingStatus: "Voted",
  },
  {
    id: 3,
    voterId: "VOT-003",
    voterName: "Muhammad Usman",
    cnic: "42101-4567891-3",
    phone: "03221234567",
    verificationMethod: "OTP",
    votingStatus: "Verified",
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
          "OTP",
          "PIN",
          "CNIC Verification",
          "Manual Verification",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "OTP",
        label: "OTP / PIN",
        placeholder: "Optional",
      },
      {
        name: "VotingStatus",
        label: "Voting Status",
        type: "select",
        options: [
          "Not Voted",
          "Verified",
          "Voted",
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
    electionType: "Imam Election",
    voteType: "Secret Ballot",
    status: "Active",
    resultVisibility: "Public",
  },
  {
    id: 2,
    electionId: "ELEC-002",
    electionTitle: "Committee Member Election",
    electionType: "Committee Election",
    voteType: "Digital Voting",
    status: "Upcoming",
    resultVisibility: "Committee Only",
  },
  {
    id: 3,
    electionId: "ELEC-003",
    electionTitle: "Moazzin Selection",
    electionType: "Staff Election",
    voteType: "Secret Ballot",
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
          "Imam Election",
          "Committee Election",
          "Moazzin Election",
          "Staff Election",
          "General Poll",
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
          "Open Vote",
          "Digital Voting",
          "Hybrid Voting",
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
          "Upcoming",
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
          "Committee Only",
          "Admin Only",
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
      "Enter election details, candidates, voting instructions and options...",
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
    votePercentage: "52%",
    status: "Leading",
  },
  {
    id: 2,
    candidateId: "CAN-002",
    candidateName: "Qari Abdul Rehman",
    position: "Imam",
    election: "Imam Selection 2025",
    totalVotes: 98,
    votePercentage: "35%",
    status: "Active",
  },
  {
    id: 3,
    candidateId: "CAN-003",
    candidateName: "Mufti Muhammad Usman",
    position: "Imam",
    election: "Imam Selection 2025",
    totalVotes: 36,
    votePercentage: "13%",
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
          "Committee Member Election",
          "Moazzin Selection",
          "General Election",
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
    placeholder: "Candidate introduction and background...",
    rows: 5,
  },
];
export const VotingFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "VoterId",
        label: "Voter ID",
        placeholder: "Enter voter ID",
        required: true,
      },
      {
        name: "CNICPhone",
        label: "CNIC / Phone",
        placeholder: "CNIC or phone number",
        required: true,
      },
      {
        name: "OtpPin",
        label: "OTP / PIN",
        placeholder: "Enter OTP or PIN",
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "Election",
        label: "Select Election",
        type: "select",
        options: [
          "Imam Selection 2025",
          "Committee Election",
          "Moazzin Selection",
          "General Poll",
        ],
        required: true,
      },
      {
        name: "VoteType",
        label: "Vote Type",
        type: "select",
        options: [
          "Secret Ballot",
          "Open Vote",
          "Digital Voting",
          "Hybrid Voting",
        ],
        required: true,
      },
      {
        name: "Candidate",
        label: "Select Candidate / Option",
        type: "select",
        options: [
          "Mufti Ahmed",
          "Qari Abdul Rehman",
          "Muhammad Usman",
          "Abstain",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "VoteStatus",
        label: "Vote Status",
        type: "select",
        options: [
          "Pending",
          "Verified",
          "Submitted",
          "Rejected",
        ],
        required: true,
      },
      {
        name: "SubmittedTime",
        label: "Submitted Time",
        type: "datetime-local",
        required: true,
      },
      {
        name: "PhysicalPrintout",
        label: "Physical Printout",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },

  {
    type: "textarea",
    name: "Remarks",
    label: "Remarks",
    placeholder: "Additional voting remarks...",
    rows: 4,
  },
];
export const ComplaintsData = [
  {
    id: 1,
    complaintId: "CMP-001",
    complainantName: "Anonymous",
    personType: "Imam",
    personName: "Mufti Ahmed",
    category: "Behavior",
    priority: "High",
    status: "Pending",
    assignedTo: "Committee",
  },
  {
    id: 2,
    complaintId: "CMP-002",
    complainantName: "Muhammad Usman",
    personType: "Khateeb",
    personName: "Qari Abdul Rehman",
    category: "Attendance",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Admin",
  },
  {
    id: 3,
    complaintId: "CMP-003",
    complainantName: "Abdul Hameed",
    personType: "Committee Member",
    personName: "Ahmed Raza",
    category: "Management",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Committee",
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
          "Imam",
          "Khateeb",
          "Committee Member",
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
          "Khateeb",
          "Qari",
          "Committee Member",
          "Muazzin",
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
          "Management",
          "Financial",
          "Religious Matter",
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
        options: ["Low", "Medium", "High", "Urgent"],
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
        required: true,
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
    placeholder: "Write complaint details",
    rows: 4,
  },

  {
    type: "textarea",
    name: "AdminComment",
    label: "Admin Comment / Action Taken",
    placeholder: "Action taken by committee/admin...",
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
    generatedBy: "Admin",
    generatedDate: "07/01/2026",
  },
  {
    id: 2,
    reportId: "REP-002",
    reportType: "Expense Report",
    fundCategory: "Zakat Fund",
    exportFormat: "Excel",
    generatedBy: "Committee",
    generatedDate: "07/05/2026",
  },
  {
    id: 3,
    reportId: "REP-003",
    reportType: "Donation Report",
    fundCategory: "Construction Fund",
    exportFormat: "PDF",
    generatedBy: "Treasurer",
    generatedDate: "07/08/2026",
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
          "Construction Fund",
          "Madrasa Fund",
          "Welfare Fund",
          "Ramzan Fund",
          "Jummah Fund",
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
        placeholder: "Admin / Committee Member",
        required: true,
      },
    ],
  },
];