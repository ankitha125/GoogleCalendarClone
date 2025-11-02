import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function CalendarHeader({ currentMonth, goToToday, nextMonth, prevMonth, view, setView }) {
  const formattedMonth = currentMonth.format('MMMM YYYY');

  const navItemClass = (currentView) => 
    `px-3 py-1 text-sm font-medium transition-colors duration-150 ${
      view === currentView 
        ? 'bg-blue-100 text-blue-700 rounded-full' 
        : 'text-gray-600 hover:bg-gray-100 rounded-full'
    }`;

  return (
    <header className="h-16 px-4 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
      
      {/* Left Side: Logo, Today, Navigation */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {/* Google Logo Clone */}
          <div className="flex items-center space-x-0.5">
             <span className="text-2xl font-bold text-blue-600">G</span>
             <span className="text-2xl font-bold text-red-600">o</span>
             <span className="text-2xl font-bold text-yellow-600">o</span>
             <span className="text-2xl font-bold text-blue-600">g</span>
             <span className="text-2xl font-bold text-green-600">l</span>
             <span className="text-2xl font-bold text-red-600">e</span>
             <span className="text-2xl font-light text-gray-700 ml-1 hidden sm:inline">Calendar</span>
          </div>
        </div>
        
        {/* Today Button */}
        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-150"
        >
          Today
        </button>

        {/* Navigation Arrows */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors duration-150">
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
          </button>
          <div className="w-px h-6 bg-gray-300" />
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors duration-150">
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Current Month Name */}
        <h2 className="text-xl font-normal text-gray-700 ml-4 hidden md:block">{formattedMonth}</h2>
      </div>

      {/* Right Side: Search, User, View Switcher */}
      <div className="flex items-center space-x-4">
        {/* View Switcher */}
        <div className="hidden sm:flex border border-gray-300 rounded-lg p-0.5">
          <button onClick={() => setView('day')} className={navItemClass('day')}>Day</button>
          <button onClick={() => setView('week')} className={navItemClass('week')}>Week</button>
          <button onClick={() => setView('month')} className={navItemClass('month')}>Month</button>
        </div>
        
        {/* User Avatar (Placeholder) */}
        <button className="h-10 w-10 bg-indigo-200 text-indigo-700 rounded-full font-bold flex items-center justify-center hover:shadow-md transition-shadow duration-150">
          U
        </button>
      </div>
    </header>
  );
}