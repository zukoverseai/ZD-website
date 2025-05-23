import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, CalendarIcon } from "lucide-react";

// Helper function to get ordinal suffix for a number
const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Helper function to format date as "Thursday 22nd May 2025"
const formatDate = (date: Date): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

  return `${dayOfWeek} ${dayOfMonth}${ordinalSuffix} ${month} ${year}`;
};

// Helper function to format time as "10:30 AM"
const formatTime = (hours: number, minutes: number): string => {
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

// Generate time slots from 9 AM to 5 PM on the hour (1-hour intervals) to allow buffers
const generateTimeSlots = (): { hours: number; minutes: number }[] => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push({ hours: hour, minutes: 0 });
  }
  return slots;
};

export function CyberCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<{
    hours: number;
    minutes: number;
  } | null>(null);
  const [showTimeSelector, setShowTimeSelector] = useState(false);

  // Get days in month
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Handle month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected);
    setShowTimeSelector(true);
    setSelectedTime(null);
  };

  // Handle time selection
  const handleTimeSelect = (hours: number, minutes: number) => {
    setSelectedTime({ hours, minutes });
  };

  // Check if a date is today
  const isToday = (day: number): boolean => {
    const checkDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  // Display month and year
  const monthYearDisplay = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[currentMonth]} ${currentYear}`;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-[#3ecef7]/10 p-2 border border-[#3ecef7]/30 shadow-[0_0_10px_rgba(62,206,247,0.3)]">
            <CalendarIcon className="h-5 w-5 text-[#3ecef7]" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Schedule a Consultation
          </h3>
        </div>
      </div>
      {/* Calendar Header */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="group flex h-8 w-8 items-center justify-center rounded-full bg-[#0a0a12] border border-[#1a1a2e] transition-colors hover:border-[#3ecef7]/50 hover:bg-[#0a0a12]/80"
          >
            <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-[#3ecef7]" />
          </button>
          <h3 className="text-lg font-medium text-white">
            {monthYearDisplay()}
          </h3>
          <button
            onClick={goToNextMonth}
            className="group flex h-8 w-8 items-center justify-center rounded-full bg-[#0a0a12] border border-[#1a1a2e] transition-colors hover:border-[#3ecef7]/50 hover:bg-[#0a0a12]/80"
          >
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#3ecef7]" />
          </button>
        </div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
          {generateCalendarDays().map((day, idx) => (
            <div key={idx} className="aspect-square relative">
              {day !== null ? (
                <button
                  onClick={() => handleDateSelect(day)}
                  className={`relative w-full h-full flex items-center justify-center text-sm rounded-md transition-all ${
                    isSelected(day)
                      ? "bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] text-black font-medium shadow-[0_0_15px_rgba(62,206,247,0.5)]"
                      : isToday(day)
                      ? "bg-[#1a1a2e] text-white border border-[#3ecef7] shadow-[0_0_8px_rgba(62,206,247,0.3)]"
                      : "bg-[#0f0f1a] text-gray-300 border border-[#1a1a2e] hover:border-[#3ecef7]/50 hover:bg-[#0a0a12]/80"
                  }`}
                >
                  {day}
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Selected Date Display */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-md bg-[#0a0a12] border border-[#1a1a2e]"
          >
            <p className="text-white text-center">
              You&apos;ve selected{" "}
              {
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                  {formatDate(selectedDate)}
                </span>
              }
              {selectedTime && (
                <>
                  {" "}
                  at{" "}
                  {
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                      {formatTime(selectedTime.hours, selectedTime.minutes)}
                    </span>
                  }
                </>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Time Selector */}
      <AnimatePresence>
        {showTimeSelector && selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="rounded-full bg-[#7deb7d]/10 p-2 border border-[#7deb7d]/30 shadow-[0_0_10px_rgba(125,235,125,0.3)]">
                <Clock className="h-4 w-4 text-[#7deb7d]" />
              </div>
              <h4 className="text-sm font-medium text-white">Select a time</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(slot.hours, slot.minutes)}
                  className={`${
                    selectedTime &&
                    selectedTime.hours === slot.hours &&
                    selectedTime.minutes === slot.minutes
                      ? "bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] text-black"
                      : "bg-[#1a1a2e] text-white hover:bg-[#252542]"
                  } py-2 px-4 rounded-md transition-colors`}
                >
                  {formatTime(slot.hours, slot.minutes)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Confirm Button */}
      <AnimatePresence>
        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4"
          >
            <button className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] text-black font-medium shadow-[0_0_15px_rgba(62,206,247,0.3)] hover:shadow-[0_0_20px_rgba(62,206,247,0.5)] transition-all">
              Confirm Appointment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
