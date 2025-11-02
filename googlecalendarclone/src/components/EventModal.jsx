
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  XMarkIcon,
  ClockIcon,
  Bars3CenterLeftIcon,
  CalendarDaysIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialDate,
  event,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const isEditMode = !!event;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setAllDay(event.allDay || false);
      setStartTime(event.startTime.format('YYYY-MM-DDTHH:mm'));
      setEndTime(event.endTime.format('YYYY-MM-DDTHH:mm'));
    } else {
      const base = (initialDate || dayjs()).startOf('hour').add(1, 'hour');
      setTitle('');
      setDescription('');
      setAllDay(false);
      setStartTime(base.format('YYYY-MM-DDTHH:mm'));
      setEndTime(base.add(1, 'hour').format('YYYY-MM-DDTHH:mm'));
    }
  }, [isOpen, event, initialDate, isEditMode]);

  const handleSave = () => {
    if (!title || !startTime || !endTime) {
      alert('Title, Start Time, and End Time are required.');
      return;
    }
    onSave({
      title,
      description,
      allDay,
      startTime: dayjs(startTime),
      endTime: dayjs(endTime),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2">
                <CalendarDaysIcon className="h-6 w-6 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {isEditMode ? 'Edit Event' : 'Create Event'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Add title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-lg font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
                />
              </div>

              {/* Date & Time */}
              <div>
                <div className="flex items-center mb-2 space-x-2 text-gray-600">
                  <ClockIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">Date & Time</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                  />
                  <span className="text-gray-500">—</span>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                  />
                  <label className="flex items-center space-x-2 text-sm text-gray-700 ml-2">
                    <input
                      type="checkbox"
                      checked={allDay}
                      onChange={(e) => setAllDay(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <span>All Day</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center mb-2 space-x-2 text-gray-600">
                  <Bars3CenterLeftIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">Description</span>
                </div>
                <textarea
                  placeholder="Add details or notes..."
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200">
              {isEditMode ? (
                <button
                  onClick={onDelete}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600 font-medium transition"
                >
                  <TrashIcon className="h-5 w-5" />
                  <span>Delete</span>
                </button>
              ) : (
                <div />
              )}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-7 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-gray-800 shadow-sm transition"
                >
                  {isEditMode ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
