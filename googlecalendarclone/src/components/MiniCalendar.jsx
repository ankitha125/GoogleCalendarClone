import React from 'react';
import dayjs from 'dayjs';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';


const generateMiniMonthGrid = (month) => {
    const firstDayOfMonth = month.startOf('month');
    const startDayOfWeek = firstDayOfMonth.day(); 
    let day = firstDayOfMonth.subtract(startDayOfWeek, 'day'); 
    
    const calendar = [];
    for (let i = 0; i < 42; i++) { 
      calendar.push(day);
      day = day.add(1, 'day');
    }
    return calendar;
};

export default function MiniCalendar({ currentMonth, setCurrentMonth }) {
    const today = dayjs();
    const gridDays = generateMiniMonthGrid(currentMonth);
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
    const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

    return (
        <div className="p-2">
            {/* Header: Month and Arrows */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-normal text-gray-700">
                    {currentMonth.format('MMMM YYYY')}
                </h3>
                <div className="flex space-x-1">
                    <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-200">
                        <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-200">
                        <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-xs text-gray-500 font-medium">
                        {day}
                    </div>
                ))}
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-1 mt-1">
                {gridDays.map((day, index) => {
                    const isCurrentMonth = day.month() === currentMonth.month();
                    const isToday = day.isSame(today, 'day');
                    const isSelectedMonth = day.isSame(currentMonth, 'month'); 

                    return (
                        <div key={index} className="flex justify-center items-center">
                            <span 
                                onClick={() => setCurrentMonth(day)}
                                className={`
                                    w-7 h-7 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors duration-100
                                    ${!isCurrentMonth ? 'text-gray-400' : ''}
                                    ${isToday ? 'bg-blue-500 text-white font-bold' : ''}
                                    ${!isToday && isCurrentMonth ? 'text-gray-800 hover:bg-blue-100' : ''}
                                `}
                            >
                                {day.date()}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}