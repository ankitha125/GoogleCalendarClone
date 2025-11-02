import React, { useState, useEffect } from "react";
import { getEvents } from "../api/events";
import EventModal from "./EventModal";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [existingEvent, setExistingEvent] = useState(null);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setExistingEvent(null);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Calendar View</h2>
      <div className="grid grid-cols-7 gap-1">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="border h-24 hover:bg-gray-100 cursor-pointer p-2"
            onClick={() => handleDayClick(new Date())}
          >
            <p className="text-sm text-gray-500">{i + 1}</p>
          </div>
        ))}
      </div>

      <EventModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
        fetchEvents={fetchEvents}
        existingEvent={existingEvent}
      />
    </div>
  );
};


export default CalendarView;
