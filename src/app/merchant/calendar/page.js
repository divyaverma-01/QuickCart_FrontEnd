"use client";
import { useEffect, useState } from "react";
import { getEvents } from "../../lib/API/eventApi";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MerchantCalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(
          data.map((ev) => ({
            title: ev.title,
            start: new Date(ev.date),
            end: new Date(ev.date),
            allDay: true,
            resource: ev,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Merchant Calendar</h1>
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      )}
    </div>
  );
}
