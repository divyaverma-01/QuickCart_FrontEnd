import { getCookie } from "cookies-next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/events";

function getAuthHeaders() {
  const token = getCookie("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Create a new event
export async function createEvent(event) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    credentials: "include",
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

// Get all events for the logged-in merchant
export async function getEvents() {
  const res = await fetch(`${API_BASE}`, {
    headers: {
      ...getAuthHeaders(),
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

// Get a single event by ID
export async function getEventById(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

// Update an event
export async function updateEvent(id, event) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    credentials: "include",
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Failed to update event");
  return res.json();
}

// Delete an event
export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete event");
  return res.json();
}
