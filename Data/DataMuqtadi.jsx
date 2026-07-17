export const PrayerTimingsData = [
  {
    id: 1,
    prayer: "Fajr",
    azanTime: "5:10 AM",
    iqamahTime: "5:35 AM",
    status: "Completed",
  },
  {
    id: 2,
    prayer: "Zuhr",
    azanTime: "1:15 PM",
    iqamahTime: "1:30 PM",
    status: "Completed",
  },
  {
    id: 3,
    prayer: "Asr",
    azanTime: "4:30 PM",
    iqamahTime: "4:45 PM",
    status: "Next",
  },
  {
    id: 4,
    prayer: "Maghrib",
    azanTime: "Sunset",
    iqamahTime: "After Azan",
    status: "Upcoming",
  },
  {
    id: 5,
    prayer: "Isha",
    azanTime: "8:15 PM",
    iqamahTime: "8:30 PM",
    status: "Upcoming",
  },
];
export const AnnouncementData = [
  {
    id: 1,
    title: "Jummah Bayan Topic",
    category: "Jummah",
    date: "15/09/2024",
    priority: "Important",
    details: "Rights of Parents in Islam",
  },
  {
    id: 2,
    title: "Ramadan Taraweeh Schedule",
    category: "Ramadan",
    date: "20/09/2024",
    priority: "Active",
    details: "1 Juz daily after Isha",
  },
  {
    id: 3,
    title: "Masjid Cleaning Drive",
    category: "Maintenance",
    date: "22/09/2024",
    priority: "Normal",
    details: "Volunteers required after Asr",
  },
];

export const AnnouncementFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "AnnouncementCategory",
        label: "Announcement Category",
        type: "select",
        options: [
          "All",
          "Jummah",
          "Ramadan",
          "Eid",
          "Donations",
          "Janazah",
          "Maintenance",
          "Community",
        ],
      },
      {
        name: "SearchAnnouncement",
        label: "Search Announcement",
        placeholder: "Search by title",
      },
      {
        name: "Date",
        label: "Date",
        type: "date",
      },
    ],
  },
];
export const UpcomingEventsData = [
  {
    id: 1,
    event: "Jummah Bayan",
    date: "15/09/2024",
    time: "1:00 PM",
    speaker: "Imam Hafiz Abdul Rahman",
    location: "Main Hall",
  },
  {
    id: 2,
    event: "Quran Class",
    date: "16/09/2024",
    time: "After Maghrib",
    speaker: "Qari Bilal",
    location: "Madrasa Room",
  },
  {
    id: 3,
    event: "Seerat Program",
    date: "20/09/2024",
    time: "8:30 PM",
    speaker: "Guest Khateeb",
    location: "Main Hall",
  },
];

export const UpcomingEventsFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "NextEvent",
        label: "Next Event",
        placeholder: "Friday - Jummah Bayan",
      },
      {
        name: "EventTime",
        label: "Event Time",
        placeholder: "1:00 PM - Main Hall",
      },
      {
        name: "GuestKhateeb",
        label: "Guest Khateeb",
        placeholder: "Mufti Saad",
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "ThisMonthEvents",
        label: "This Month Events",
        placeholder: "06",
      },
      {
        name: "MonthlySummary",
        label: "Monthly Summary",
        placeholder: "3 bayan, 2 classes, 1 welfare event",
      },
      {
        name: "Status",
        label: "Guest Khateeb Status",
        type: "select",
        options: [
          "Confirmed",
          "Pending",
          "Cancelled",
        ],
      },
    ],
  },
];
export const DonationTransparencyData = [
  {
    id: 1,
    fundCategory: "Masjid General Fund",
    collected: "RS: 30,000",
    spent: "RS: 12,000",
    balance: "RS: 18,000",
    status: "Healthy",
  },
  {
    id: 2,
    fundCategory: "Zakat Fund",
    collected: "RS: 10,000",
    spent: "RS: 5,000",
    balance: "RS: 5,000",
    status: "Active",
  },
  {
    id: 3,
    fundCategory: "Madrasa Fund",
    collected: "RS: 15,000",
    spent: "RS: 3,000",
    balance: "RS: 12,000",
    status: "Healthy",
  },
];
export const MyDonationHistoryData = [
  {
    id: 1,
    receiptNo: "DON-0001",
    date: "15/09/2024",
    fund: "Masjid Fund",
    amount: "RS: 5,000",
    payment: "Verified",
    receipt: "Download PDF",
  },
  {
    id: 2,
    receiptNo: "DON-0002",
    date: "20/09/2024",
    fund: "Zakat",
    amount: "RS: 10,000",
    payment: "Pending",
    receipt: "Waiting",
  },
];

export const MyDonationHistoryFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "FromDate",
        label: "From Date",
        type: "date",
      },
      {
        name: "ToDate",
        label: "To Date",
        type: "date",
      },
      {
        name: "FundCategory",
        label: "Fund Category",
        type: "select",
        options: [
          "All",
          "Masjid Fund",
          "Zakat",
          "Madrasa Fund",
          "Construction Fund",
          "Welfare Fund",
          "Jummah Fund",
          "Hadia Fund",
        ],
      },
    ],
  },
];
export const QuranClassesData = [
  {
    id: 1,
    className: "Nazra Quran",
    teacher: "Qari Bilal",
    timing: "After Asr",
    ageGroup: "7-14 Years",
    status: "Open",
  },
  {
    id: 2,
    className: "Hifz Class",
    teacher: "Hafiz Usman",
    timing: "After Fajr",
    ageGroup: "8-16 Years",
    status: "Limited Seats",
  },
  {
    id: 3,
    className: "Tajweed Class",
    teacher: "Qari Ahmed",
    timing: "After Maghrib",
    ageGroup: "All Ages",
    status: "Open",
  },
];
export const IslamicCalendarData = [
  {
    id: 1,
    event: "Ramadan Begins",
    hijriDate: "1 Ramadan",
    gregorianDate: "Expected",
    program: "Taraweeh Schedule",
    status: "Upcoming",
  },
  {
    id: 2,
    event: "Laylat-ul-Qadr",
    hijriDate: "Odd Nights",
    gregorianDate: "Last Ashra",
    program: "Special Qiyam",
    status: "Planned",
  },
  {
    id: 3,
    event: "Eid-ul-Fitr",
    hijriDate: "1 Shawwal",
    gregorianDate: "Moon Sighting",
    program: "Eid Prayer",
    status: "Upcoming",
  },
  {
    id: 4,
    event: "Ashura",
    hijriDate: "10 Muharram",
    gregorianDate: "Expected",
    program: "Bayan / Fasting Reminder",
    status: "Info",
  },
];
export const ServiceRequestData = [
  {
    id: 1,
    requestId: "REQ-001",
    requestType: "Nikah Request",
    requesterName: "Muhammad Ahmed",
    phone: "0300-1234567",
    requiredDate: "15/10/2024",
    priority: "Normal",
    status: "Submitted",
  },
  {
    id: 2,
    requestId: "REQ-002",
    requestType: "Janazah Request",
    requesterName: "Abdul Rehman",
    phone: "0311-9876543",
    requiredDate: "18/10/2024",
    priority: "Urgent",
    status: "In Review",
  },
  {
    id: 3,
    requestId: "REQ-003",
    requestType: "Qari Request",
    requesterName: "Bilal Khan",
    phone: "0322-4567890",
    requiredDate: "20/10/2024",
    priority: "Normal",
    status: "Approved",
  },
];

export const ServiceRequestFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "RequestID",
        label: "Request ID",
        placeholder: "REQ-001",
        required: true,
      },
      {
        name: "RequestType",
        label: "Request Type",
        type: "select",
        options: [
          "Nikah Request",
          "Janazah Request",
          "Dua Request",
          "Qari Request",
          "Khateeb Request",
          "Event Booking",
          "Masjid Space Arrangement",
        ],
        required: true,
      },
      {
        name: "RequesterName",
        label: "Requester Name",
        placeholder: "Full name",
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
        placeholder: "03xx-xxxxxxx",
        required: true,
      },
      {
        name: "RequiredDate",
        label: "Required Date",
        type: "date",
        required: true,
      },
      {
        name: "RequiredTime",
        label: "Required Time",
        type: "time",
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
        options: ["Low", "Normal", "Urgent"],
        required: true,
      },
      {
        name: "Status",
        label: "Status",
        type: "select",
        options: [
          "Submitted",
          "In Review",
          "Approved",
          "Rejected",
          "Completed",
        ],
        required: true,
      },
      {
        name: "RequestDetails",
        label: "Request Details",
        placeholder: "Write complete request details",
        required: true,
      },
    ],
  },
];
export const RatingData = [
  {
    id: 1,
    ratingId: "RAT-001",
    personType: "Imam",
    personName: "Hafiz Abdul Rahman",
    averageRating: "4.8",
    feedbackBy: "Muhammad Ahmed",
    date: "15/09/2024",
    publicDisplay: "No",
  },
  {
    id: 2,
    ratingId: "RAT-002",
    personType: "Moazzin",
    personName: "Bilal Ahmed",
    averageRating: "4.5",
    feedbackBy: "Anonymous",
    date: "18/09/2024",
    publicDisplay: "Yes",
  },
  {
    id: 3,
    ratingId: "RAT-003",
    personType: "Committee Member",
    personName: "Abdul Rehman",
    averageRating: "4.2",
    feedbackBy: "Ali Khan",
    date: "20/09/2024",
    publicDisplay: "Yes",
  },
];

export const RatingFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "RatingID",
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
      },
      {
        name: "AkhlaqAdab",
        label: "Akhlaq / Adab",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        name: "Punctuality",
        label: "Punctuality",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
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
      },
      {
        name: "CommunityBehavior",
        label: "Community Behavior",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
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
      },
      {
        name: "PublicDisplay",
        label: "Public Display",
        type: "select",
        options: ["Yes", "No"],
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
export const ComplaintData = [
  {
    id: 1,
    complaintId: "CMP-001",
    personType: "Imam",
    personName: "Hafiz Abdul Rahman",
    category: "Mismanagement",
    status: "Pending",
    assignedTo: "Admin",
    complaintDate: "15/09/2024",
  },
  {
    id: 2,
    complaintId: "CMP-002",
    personType: "Committee Member",
    personName: "Muhammad Usman",
    category: "Late Prayers",
    status: "In Review",
    assignedTo: "Committee",
    complaintDate: "18/09/2024",
  },
  {
    id: 3,
    complaintId: "CMP-003",
    personType: "Moazzin",
    personName: "Bilal Ahmed",
    category: "Misbehavior",
    status: "Resolved",
    assignedTo: "Admin",
    complaintDate: "20/09/2024",
  },
];

export const ComplaintFormSchema = [
  {
    type: "row",
    fields: [
      {
        name: "ComplaintID",
        label: "Complaint ID",
        placeholder: "CMP-001",
        required: true,
      },
      {
        name: "ComplainantName",
        label: "Complainant Name",
        placeholder: "Optional / Anonymous",
      },
      {
        name: "Anonymous",
        label: "Anonymous",
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
      {
        name: "ComplaintCategory",
        label: "Complaint Category",
        type: "select",
        options: [
          "Mismanagement",
          "Late Prayers",
          "Misbehavior",
          "Financial Misuse",
          "Maintenance Issue",
          "Other",
        ],
        required: true,
      },
    ],
  },

  {
    type: "row",
    fields: [
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
      },
    ],
  },

  {
    type: "row",
    fields: [
      {
        name: "AssignedTo",
        label: "Assigned To",
        placeholder: "Admin / Committee",
      },
      {
        name: "NotifyComplainant",
        label: "Notify Complainant",
        type: "select",
        options: ["SMS", "Email", "None"],
      },
      {
        name: "AdminComment",
        label: "Admin Comment / Action Taken",
        placeholder: "Admin remarks",
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