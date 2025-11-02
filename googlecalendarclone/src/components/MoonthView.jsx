
import React from 'react';
import dayjs from 'dayjs';

const generateMonthGrid = (date) => {
  const firstDayOfMonth = date.startOf('month');
  const startDayOfWeek = firstDayOfMonth.day(); 
  let day = firstDayOfMonth.subtract(startDayOfWeek, 'day'); 
  
  const calendar = [];
  for (let i = 0; i < 42; i++) {
    calendar.push(day);
    day = day.add(1, 'day');
  }
  return calendar;
};


const EventChip = ({ event, onEventClick }) => {
  const colorMap = {
    'Work': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    'Personal': 'bg-green-100 text-green-700 hover:bg-green-200',
    'Meeting': 'bg-red-100 text-red-700 hover:bg-red-200',
  };
  const eventColorClass = colorMap[event.title.split(' ')[0]] || 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200';
  
  return (
    <div 
      key={event._id}
      className={`text-xs rounded-lg p-0.5 mt-0.5 cursor-pointer truncate transition-colors duration-150 ${eventColorClass}`}
      
      onClick={(e) => { 
        e.stopPropagation(); 
        onEventClick(event); 
      }}
    >
      <span className="font-semibold mr-1">{event.allDay ? '' : event.startTime.format('h A')}</span>
      {event.title}
    </div>
  );
};

export default function MonthView({ month, events, onCellClick, onEventClick }) {
  const gridDays = generateMonthGrid(month);
  const today = dayjs();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const eventsByDay = gridDays.reduce((acc, day) => {
    const dayEvents = events.filter(event => 
      event.startTime.isSame(day, 'day') || 
      (event.startTime.isSameOrBefore(day, 'day') && event.endTime.isSameOrAfter(day, 'day'))
    );
    acc[day.format('YYYY-MM-DD')] = dayEvents;
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2 text-center text-sm font-medium text-gray-600 uppercase tracking-wider hidden sm:block">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 flex-1" style={{ gridAutoRows: 'minmax(120px, 1fr)' }}>
        {gridDays.map((day, index) => {
          const isCurrentMonth = day.month() === month.month();
          const isToday = day.isSame(today, 'day');
          const dayKey = day.format('YYYY-MM-DD');
          const dayEvents = eventsByDay[dayKey] || [];
          
          return (
            <div 
              key={index}
              className={`border border-gray-200 p-1 flex flex-col cursor-pointer transition-colors duration-100 ${
                !isCurrentMonth ? 'bg-gray-50/50' : 'bg-white'
              } hover:bg-blue-50`}
              onClick={() => onCellClick(day)}
            >
              
              <div className="flex justify-end pr-1 pt-1">
                <span className={`text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full transition-all ${
                  isToday 
                    ? 'bg-blue-500 text-white font-bold shadow-md' 
                    : isCurrentMonth 
                      ? 'text-gray-800' 
                      : 'text-gray-400'
                }`}>
                  {day.date()}
                </span>
              </div>
              
              <div className="flex flex-col overflow-y-auto mt-1 space-y-0.5">
                {/* UPDATED: Pass 'onEventClick' down to EventChip */}
                {dayEvents.map(event => <EventChip key={event._id} event={event} onEventClick={onEventClick} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}