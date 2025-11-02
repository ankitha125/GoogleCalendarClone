
import React from 'react';
import dayjs from 'dayjs';

const HOUR_HEIGHT = 60;
const TOTAL_DAY_HEIGHT = HOUR_HEIGHT * 24;
const PIXELS_PER_MINUTE = HOUR_HEIGHT / 60;

const generateWeekDays = (date) => {
  const startOfWeek = date.startOf('week');
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.add(i, 'day'));
  }
  return days;
};

const calculatePosition = (event) => {
  const startMinutes = event.startTime.hour() * 60 + event.startTime.minute();
  const endMinutes = event.endTime.hour() * 60 + event.endTime.minute();
  const durationMinutes = Math.max(endMinutes - startMinutes, 30); 
  const top = startMinutes * PIXELS_PER_MINUTE;
  const height = durationMinutes * PIXELS_PER_MINUTE;
  return { top, height };
};

const TimeGutter = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const time = dayjs().hour(i).minute(0).format('h A');
    return time === '12 AM' ? '' : time;
  });

  return (
    <div className="w-16 pr-2 text-right">
      <div className="h-10" /> 
      {hours.map((hour, index) => (
        <div key={index} className="h-[60px] relative -top-3">
          {hour && <span className="text-xs text-gray-500">{hour}</span>}
        </div>
      ))}
    </div>
  );
};


const DayColumn = ({ day, events, onCellClick, onEventClick }) => {
  const today = dayjs();
  const isToday = day.isSame(today, 'day');
  const dayEvents = events.filter(e => e.startTime.isSame(day, 'day'));

  return (
    <div className="flex-1 border-r border-gray-200">
      <div className="h-12 pt-3 pb-1 border-b border-gray-200 flex flex-col items-center justify-center">
        <span className="text-xs text-gray-500">{day.format('ddd')}</span>
        <span className={`text-xl font-medium ${isToday ? 'text-blue-500' : 'text-gray-700'}`}>
          {day.format('D')}
        </span>
      </div>
      <div 
        className="relative" 
        style={{ height: `${TOTAL_DAY_HEIGHT}px` }}
        onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const minutes = (y / TOTAL_DAY_HEIGHT) * 24 * 60;
            const clickedTime = day.startOf('day').add(minutes, 'minutes');
            onCellClick(clickedTime);
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="h-[60px] border-b border-gray-200" />
        ))}
        {dayEvents.map(event => {
          const { top, height } = calculatePosition(event);
          return (
            <EventChip 
              key={event._id} 
              event={event} 
              style={{ top, height }} 
              onEventClick={onEventClick} 
            />
          );
        })}
      </div>
    </div>
  );
};


const EventChip = ({ event, style, onEventClick }) => (
  <div
    className="absolute w-[90%] left-[5%] rounded-lg p-2 text-xs text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-md overflow-hidden cursor-pointer"
    style={style}
    // UPDATED onClick
    onClick={(e) => { 
      e.stopPropagation(); 
      onEventClick(event); 
    }}
  >
    <p className="font-semibold">{event.title}</p>
    <p>{event.startTime.format('h:mm A')} - {event.endTime.format('h:mm A')}</p>
    <p className="truncate mt-1">{event.description}</p>
  </div>
);


export default function WeekView({ month, events, onCellClick, onEventClick }) {
  const weekDays = generateWeekDays(month);

  return (
    <div className="flex flex-1 overflow-auto bg-white border border-gray-200 rounded-lg shadow-md">
      <TimeGutter />
      <div className="flex-1 grid grid-cols-7">
        {weekDays.map(day => (
          <DayColumn 
            key={day.format('YYYY-MM-DD')} 
            day={day} 
            events={events}
            onCellClick={onCellClick}
            onEventClick={onEventClick} 
          />
        ))}
      </div>
    </div>
  );
}