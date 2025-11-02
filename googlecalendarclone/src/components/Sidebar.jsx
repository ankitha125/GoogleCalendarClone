import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import MiniCalendar from './MiniCalendar'; 

export default function Sidebar({ currentMonth, setCurrentMonth, onCreateEvent }) {
  
  
  const handleCreateClick = () => {
    onCreateEvent(dayjs()); 
  };
  
  return (
    <aside className="w-64 p-4 border-r border-gray-200 bg-white hidden md:block">
      
      {/* Create Button (Floating Action Button style) */}
      <button 
        onClick={handleCreateClick}
        className="flex items-center space-x-3 px-6 py-3 bg-white rounded-full text-gray-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 transform hover:scale-[1.02]"
      >
        <PlusIcon className="h-6 w-6 text-blue-500" />
        <span className="text-lg">Create</span>
      </button>

      {/* Mini Calendar (A separate component) */}
      <div className="mt-8">
        {/* Simple placeholder for MiniCalendar  */}
        <MiniCalendar currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </div>

      {/* My Calendars List (Aesthetic Placeholder) */}
      <div className="mt-8 border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">My Calendars</h3>
        <div className="space-y-2 text-sm">
          {/* Note: the input `style` is for precise color matching */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded-sm" style={{ accentColor: '#4285F4' }} />
            <span className="text-gray-800">Work Events</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded-sm" style={{ accentColor: '#EA4335' }} />
            <span className="text-gray-800">Personal</span>
          </label>
        </div>
      </div>
    </aside>
  );
}