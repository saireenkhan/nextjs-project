export const RatingsData = [
  {
    id: 1,
    ratingId: "RAT-001",
    personType: "Imam",
    personName: "Mufti Ahmed",
    averageRating: "4.8 / 5",
    feedbackBy: "Muhammad Ali",
    publicDisplay: "Yes",
    date: "07/01/2026",
  },
  {
    id: 2,
    ratingId: "RAT-002",
    personType: "Moazzin",
    personName: "Qari Usman",
    averageRating: "4.5 / 5",
    feedbackBy: "Anonymous",
    publicDisplay: "No",
    date: "07/05/2026",
  },
  {
    id: 3,
    ratingId: "RAT-003",
    personType: "Committee Member",
    personName: "Hafiz Salman",
    averageRating: "4.7 / 5",
    feedbackBy: "Abdul Rehman",
    publicDisplay: "Yes",
    date: "07/08/2026",
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
        name: "AkhlaqAdab",
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
        name: "KhutbaAzanQuality",
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
        required: true,
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
    placeholder: "Write your feedback...",
    rows: 4,
  },
];
export const ComplaintsData = [
  {
    id: 1,
    complaintId: "CMP-001",
    category: "Attendance Issue",
    priority: "High",
    status: "Pending",
    submittedDate: "07/01/2026",
    assignedTo: "Admin",
  },
  {
    id: 2,
    complaintId: "CMP-002",
    category: "Salary Request",
    priority: "Medium",
    status: "In Review",
    submittedDate: "07/05/2026",
    assignedTo: "Committee",
  },
  {
    id: 3,
    complaintId: "CMP-003",
    category: "Equipment Issue",
    priority: "Low",
    status: "Resolved",
    submittedDate: "07/08/2026",
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
        name: "ComplaintCategory",
        label: "Complaint Category",
        type: "select",
        options: [
          "Attendance Issue",
          "Salary Request",
          "Equipment Issue",
          "Schedule Issue",
          "Administrative Matter",
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
          "Urgent",
        ],
        required: true,
      },
      {
        name: "AssignedTo",
        label: "Assigned To",
        type: "select",
        options: [
          "Admin",
          "Committee",
        ],
        required: true,
      },
      {
        name: "Status",
        label: "Status",
        type: "select",
        options: [
          "Pending",
          "In Review",
          "Resolved",
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
        name: "EvidenceUpload",
        label: "Evidence Upload",
        type: "file",
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