import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import MonthView from './components/MoonthView';
import WeekView from './components/WeekView';   
import DayView from './components/DayView';     
import EventModal from './components/EventModal';

const API_URL = 'http://localhost:3000/events';

const fetchEvents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch events');
    const data = await response.json();
    return data.map(event => ({
      ...event,
      startTime: dayjs(event.startTime),
      endTime: dayjs(event.endTime),
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};


const sendEventToBackend = async (eventData, method, id = null) => {
  const url = id ? `${API_URL}/${id}` : API_URL;
  try {
    const response = await fetch(url, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...eventData,
        startTime: eventData.startTime.toISOString(),
        endTime: eventData.endTime.toISOString(),
      }),
    });
    if (!response.ok) throw new Error(`API failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error ${method} event:`, error);
  }
};


const deleteEventFromBackend = async (id) => {
  if (!id) return;
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('API failed to delete');
    return await response.json();
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};


function App() {
  const [currentMonth, setCurrentMonth] = useState(dayjs()); 
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedEvent, setSelectedEvent] = useState(null); 

  useEffect(() => {
    const loadEvents = async () => {
      const loadedEvents = await fetchEvents();
      setEvents(loadedEvents);
    };
    loadEvents();
  }, []);

  const goToToday = () => setCurrentMonth(dayjs());

  const nextMonth = () => { 
    const unit = view === 'month' ? 'month' : (view === 'week' ? 'week' : 'day');
    setCurrentMonth(currentMonth.add(1, unit));
  };

  const prevMonth = () => {
    const unit = view === 'month' ? 'month' : (view === 'week' ? 'week' : 'day');
    setCurrentMonth(currentMonth.subtract(1, unit));
  };


  const handleCreateEvent = (day) => {
    setSelectedDate(day);
    setSelectedEvent(null); 
    setIsModalOpen(true);
  };
  

  const handleEditEvent = (event) => {
    setSelectedEvent(event); 
    setSelectedDate(event.startTime); 
    setIsModalOpen(true);
  };


  const handleSaveEvent = async (eventData) => {
    let savedEvent;
    if (selectedEvent) {

      savedEvent = await sendEventToBackend(eventData, 'PUT', selectedEvent._id);
    } else {

      savedEvent = await sendEventToBackend(eventData, 'POST'); 
    }
    
    if (savedEvent) {

        const updatedEvents = await fetchEvents();
        setEvents(updatedEvents);
        setIsModalOpen(false);
        setSelectedEvent(null);
    }
  };


  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    const result = await deleteEventFromBackend(selectedEvent._id);
    
    if (result) {

      setEvents(events.filter(e => e._id !== selectedEvent._id));
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };


  const renderCalendarView = () => {
    switch(view) {
      case 'month':
        return <MonthView 
                  month={currentMonth} 
                  events={events} 
                  onCellClick={handleCreateEvent}
                  onEventClick={handleEditEvent} 
                />;
      case 'week':
        return <WeekView 
                  month={currentMonth} 
                  events={events} 
                  onCellClick={handleCreateEvent}
                  onEventClick={handleEditEvent} 
                />;
      case 'day':
        return <DayView 
                  month={currentMonth} 
                  events={events} 
                  onCellClick={handleCreateEvent}
                  onEventClick={handleEditEvent} 
                />;
      default:
        return <MonthView 
                  month={currentMonth} 
                  events={events} 
                  onCellClick={handleCreateEvent}
                  onEventClick={handleEditEvent} 
                />;
    }
  }

  return (
    <div className="h-screen flex flex-col antialiased">
      
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null); 
        }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent} 
        initialDate={selectedDate}
        event={selectedEvent}        
      />
      
      <CalendarHeader 
        currentMonth={currentMonth} 
        goToToday={goToToday}
        nextMonth={nextMonth} 
        prevMonth={prevMonth} 
        view={view}
        setView={setView}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentMonth={currentMonth} 
          setCurrentMonth={setCurrentMonth} 
          onCreateEvent={handleCreateEvent} 
        />
        
        <main className="flex-1 flex overflow-auto p-4 transition-all duration-300">
          {renderCalendarView()}
        </main>
      </div>
    </div>
  );
}

export default App;