export const AssignedTopicsData = [
  {
    id: 1,
    imamId: "IMAM-001",
    imamName: "Mufti Ahmed",
    assignedEvent: "Jummah Prayer",
    assignedTopic: "Importance of Salah",
    preparationStatus: "Ready",
    complaintStatus: "Pending",
  },
  {
    id: 2,
    imamId: "IMAM-002",
    imamName: "Qari Abdul Rehman",
    assignedEvent: "Ramadan Taraweeh",
    assignedTopic: "Virtues of Ramadan",
    preparationStatus: "In Progress",
    complaintStatus: "Resolved",
  },
  {
    id: 3,
    imamId: "IMAM-003",
    imamName: "Mufti Usman",
    assignedEvent: "Eid Prayer",
    assignedTopic: "Unity of Muslims",
    preparationStatus: "Completed",
    complaintStatus: "Under Review",
  },
];

export const AssignedTopicsFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "ImamId",
        label: "Imam ID",
        placeholder: "IMAM-001",
        required: true,
      },
      {
        name: "ImamName",
        label: "Imam Name",
        placeholder: "Your name",
        required: true,
      },
      {
        name: "AssignedEvent",
        label: "Assigned Event",
        type: "select",
        options: [
          "Jummah Prayer",
          "Ramadan Taraweeh",
          "Eid Prayer",
          "Islamic Conference",
          "Special Bayan",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "AssignedTopic",
        label: "Assigned Topic",
        placeholder: "Topic shown from admin",
        required: true,
      },
      {
        name: "PreparationStatus",
        label: "Preparation Status",
        type: "select",
        options: [
          "Not Started",
          "In Progress",
          "Ready",
          "Completed",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "ComplaintCategory",
        label: "Complaint / Request Category",
        type: "select",
        options: [
          "Schedule Issue",
          "Topic Change Request",
          "Equipment Issue",
          "Salary Matter",
          "General Complaint",
          "Leave Request",
        ],
        required: true,
      },
      {
        name: "ComplaintPriority",
        label: "Complaint Priority",
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
    placeholder:
      "Write your complaint, request or additional information...",
    rows: 5,
  },
];
export const RatingsData = [
  {
    id: 1,
    ratingId: "RAT-001",
    personType: "Imam",
    personName: "Mufti Ahmed",
    averageRating: "4.8 / 5",
    feedbackBy: "Muhammad Ahmed",
    date: "07/01/2026",
    publicDisplay: "Yes",
  },
  {
    id: 2,
    ratingId: "RAT-002",
    personType: "Khateeb",
    personName: "Qari Abdul Rehman",
    averageRating: "4.5 / 5",
    feedbackBy: "Anonymous",
    date: "07/03/2026",
    publicDisplay: "No",
  },
  {
    id: 3,
    ratingId: "RAT-003",
    personType: "Qari",
    personName: "Mufti Muhammad Usman",
    averageRating: "4.9 / 5",
    feedbackBy: "Abdul Hameed",
    date: "07/05/2026",
    publicDisplay: "Yes",
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
        options: ["Imam", "Khateeb", "Qari"],
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
    placeholder: "Write feedback...",
    rows: 5,
  },
];