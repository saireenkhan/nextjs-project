export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ==================== AUTH HELPERS ====================

// Helper to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Helper to get refresh token
const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken');
  }
  return null;
};

// Helper to clear auth data
const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
  }
};

// ==================== AUTHORIZED REQUEST ====================

// Helper for authorized requests
export const authorizedRequest = async (url, options = {}) => {
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    // Handle different response types
    const contentType =
      response.headers.get('content-type') || '';

    let data;

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // ==================== UNAUTHORIZED ====================

    if (response.status === 401) {
      clearAuthData();

      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }

      throw new Error(
        'Session expired. Please login again.'
      );
    }

    // ==================== FORBIDDEN ====================

    if (response.status === 403) {
      throw new Error(
        data?.error ||
          'You do not have permission to perform this action.'
      );
    }

    // ==================== NOT FOUND ====================

    if (response.status === 404) {
      throw new Error(
        data?.error ||
          `Route not found: ${url}`
      );
    }

    // ==================== OTHER ERRORS ====================

    if (!response.ok) {
      throw new Error(
        data?.error ||
          data ||
          'Request failed'
      );
    }

    return data;

  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// ==================== AUTH FUNCTIONS ====================

export const loginUser = async (
  username,
  password
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      localStorage.setItem(
        'authToken',
        data.data.token
      );

      localStorage.setItem(
        'refreshToken',
        data.data.refreshToken
      );

      localStorage.setItem(
        'userData',
        JSON.stringify(data.data.user)
      );

      return data.data;

    } else {
      throw new Error(
        data.error || 'Login failed'
      );
    }

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await authorizedRequest('/auth/logout', {
      method: 'POST',
    });

  } catch (error) {
    console.error('Logout error:', error);

  } finally {
    clearAuthData();

    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
};

export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const userData =
      localStorage.getItem('userData');

    return userData
      ? JSON.parse(userData)
      : null;
  }

  return null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const hasPermission = (
  permission
) => {
  const user = getCurrentUser();

  return (
    user?.permissions?.[permission] === true
  );
};

export const hasRole = (role) => {
  const user = getCurrentUser();

  return user?.role === role;
};

// ==================== DONATION API ====================

export const fetchDonations = async () => {
  try {
    const result =
      await authorizedRequest('/donations');

    return result.success
      ? result.data
      : [];

  } catch (error) {
    console.error(
      'Failed to fetch donations:',
      error
    );

    return [];
  }
};

export const createDonation = async (
  donationData
) => {
  try {
    return await authorizedRequest(
      '/donations',
      {
        method: 'POST',
        body: JSON.stringify(
          donationData
        ),
      }
    );

  } catch (error) {
    console.error(
      'Failed to create donation:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== EXPENSE API ====================

export const fetchExpenses = async () => {
  try {
    const result =
      await authorizedRequest(
        '/expenses/admin'
      );

    return result.success
      ? result.data
      : [];

  } catch (error) {
    console.error(
      'Failed to fetch expenses:',
      error
    );

    return [];
  }
};

export const createExpense = async (
  expenseData
) => {
  try {
    return await authorizedRequest(
      '/expenses/admin',
      {
        method: 'POST',
        body: JSON.stringify(
          expenseData
        ),
      }
    );

  } catch (error) {
    console.error(
      'Failed to create expense:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== FUNDS API ====================

export const fetchFunds = async () => {
  try {
    const result =
      await authorizedRequest(
        '/funds/admin'
      );

    return result.success
      ? result.data
      : [];

  } catch (error) {
    console.error(
      'Error fetching funds:',
      error
    );

    return [];
  }
};

export const createFund = async (
  payload
) => {
  try {
    return await authorizedRequest(
      '/funds/admin',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

  } catch (error) {
    console.error(
      'Error creating fund:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== STAFF API ====================

export const fetchStaff = async () => {
  try {
    const result =
      await authorizedRequest('/staff');

    return result.success
      ? result.data
      : [];

  } catch (error) {
    console.error(
      'Failed to fetch staff:',
      error
    );

    return [];
  }
};

export const createStaff = async (
  payload
) => {
  try {
    return await authorizedRequest(
      '/staff',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

  } catch (error) {
    console.error(
      'Failed to create staff:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== EVENTS/KHATEEB API ====================

export const fetchEventsKhateeb =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/events-khateeb'
        );

      return result.success
        ? result.data
        : [];

    } catch (error) {
      console.error(
        'Failed to fetch events/khateeb:',
        error
      );

      return [];
    }
  };

export const createEventKhateeb =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/events-khateeb',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Failed to create event/khateeb:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== BANK & CASH API ====================

export const fetchBankCash =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/bank-cash/admin'
        );

      return result.success
        ? result.data
        : [];

    } catch (error) {
      console.error(
        'Failed to fetch bank & cash data:',
        error
      );

      return [];
    }
  };

export const createBankCash =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/bank-cash/admin',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Failed to create bank/cash record:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== REPORTS API ====================

export const fetchReports = async () => {
  try {
    const result =
      await authorizedRequest('/reports');

    return result;

  } catch (error) {
    console.error(
      'Error fetching reports:',
      error
    );

    return [];
  }
};

export const createReport = async (
  payload
) => {
  try {
    return await authorizedRequest(
      '/reports',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

  } catch (error) {
    console.error(
      'Error creating report:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== VOTERS API ====================

export const fetchVoters = async () => {
  try {
    const result =
      await authorizedRequest(
        '/voters/admin'
      );

    if (Array.isArray(result)) {
      return result;
    }

    return result.success
      ? result.data
      : [];

  } catch (error) {
    console.error(
      'Error fetching voters:',
      error
    );

    return [];
  }
};

export const createVoter = async (
  payload
) => {
  try {
    return await authorizedRequest(
      '/voters/admin',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

  } catch (error) {
    console.error(
      'Error creating voter:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== ELECTIONS API ====================

export const fetchAdminElections =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/elections/admin'
        );

      if (Array.isArray(result)) {
        return result;
      }

      return result.success
        ? result.data
        : [];

    } catch (error) {
      console.error(
        'Error fetching admin elections:',
        error
      );

      return [];
    }
  };

export const createElection =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/elections/admin',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error creating election:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== CANDIDATES API ====================

export const fetchCandidates =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/candidates/admin'
        );

      if (Array.isArray(result)) {
        return result;
      }

      return result.success
        ? result.data
        : [];

    } catch (error) {
      console.error(
        'Error fetching candidates:',
        error
      );

      return [];
    }
  };

export const createCandidate =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/candidates/admin',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error creating candidate:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== RATINGS API ====================

export const fetchRatings = async () => {
  try {
    const result =
      await authorizedRequest(
        '/ratings'
      );

    if (Array.isArray(result)) {
      return result;
    }

    return result.success
      ? result.data
      : [];

  } catch (error) {
    console.error(
      'Error fetching ratings:',
      error
    );

    return [];
  }
};

export const createRating = async (
  payload
) => {
  try {
    return await authorizedRequest(
      '/ratings',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

  } catch (error) {
    console.error(
      'Error creating rating:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== COMPLAINTS API ====================

export const fetchComplaints =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/complaints/admin'
        );

      if (Array.isArray(result)) {
        return result;
      }

      return result.success
        ? result.data
        : [];

    } catch (error) {
      console.error(
        'Error fetching complaints:',
        error
      );

      return [];
    }
  };

export const createComplaint =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/complaints/admin',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error creating complaint:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== USERS & ROLES API ====================

export const fetchUsersRoles =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/users-roles'
        );

      if (Array.isArray(result)) {
        return result;
      }

      return result.success
        ? result.data
        : [];

    } catch (error) {
      console.error(
        'Error fetching users & roles:',
        error
      );

      return [];
    }
  };

export const createUserRole =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/users-roles',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error creating user & role:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

export const updateUserRole =
  async (id, payload) => {
    try {
      return await authorizedRequest(
        `/users-roles/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error updating user & role:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

export const deleteUserRole =
  async (id) => {
    try {
      return await authorizedRequest(
        `/users-roles/${id}`,
        {
          method: 'DELETE',
        }
      );

    } catch (error) {
      console.error(
        'Error deleting user & role:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== AUDITS API ====================

export const fetchAudits = async () => {
  try {
    const result =
      await authorizedRequest('/audits');

    if (Array.isArray(result)) {
      return result;
    }

    return result.success
      ? result.data
      : [];

  } catch (error) {
    console.error(
      'Error fetching audits:',
      error
    );

    return [];
  }
};

export const createAudit = async (
  payload
) => {
  try {
    return await authorizedRequest(
      '/audits',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

  } catch (error) {
    console.error(
      'Error creating audit log:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== ASSIGNED TOPICS API ====================

export const fetchAssignedTopics =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/assigned-topics'
        );

      if (Array.isArray(result)) {
        return result;
      }

      return result.success
        ? result.data
        : [];

    } catch (error) {
      console.error(
        'Error fetching assigned topics:',
        error
      );

      return [];
    }
  };

export const createAssignedTopic =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/assigned-topics',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error creating assigned topic:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== VOTES API ====================

export const createVote = async (
  payload
) => {
  try {
    return await authorizedRequest(
      '/votes',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

  } catch (error) {
    console.error(
      'Error submitting vote:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== EVENTS API ====================

export const fetchEvents = async () => {
  try {
    const result =
      await authorizedRequest('/events');

    return result;

  } catch (error) {
    console.error(
      'Error fetching events:',
      error
    );

    return [];
  }
};

export const createEvent = async (
  eventData
) => {
  try {
    return await authorizedRequest(
      '/events',
      {
        method: 'POST',
        body: JSON.stringify(eventData),
      }
    );

  } catch (error) {
    console.error(
      'Error creating event:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ==================== QURAN CLASSES API ====================

export const fetchQuranClasses =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/quran-classes'
        );

      return result;

    } catch (error) {
      console.error(
        'Error fetching quran classes:',
        error
      );

      return [];
    }
  };

export const createQuranClass =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/quran-classes',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error creating quran class:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== ISLAMIC CALENDAR API ====================

export const fetchIslamicCalendar =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/islamic-calendar'
        );

      if (Array.isArray(result)) {
        return result;
      }

      return result.success
        ? result.data
        : [];

    } catch (error) {
      console.error(
        'Error fetching islamic calendar:',
        error
      );

      return [];
    }
  };

export const createIslamicCalendarEvent =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/islamic-calendar',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error creating islamic calendar event:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };

// ==================== SERVICE REQUESTS API ====================

export const fetchServiceRequests =
  async () => {
    try {
      const result =
        await authorizedRequest(
          '/service-requests'
        );

      return result;

    } catch (error) {
      console.error(
        'Error fetching service requests:',
        error
      );

      return [];
    }
  };

export const createServiceRequest =
  async (payload) => {
    try {
      return await authorizedRequest(
        '/service-requests',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    } catch (error) {
      console.error(
        'Error creating service request:',
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  };