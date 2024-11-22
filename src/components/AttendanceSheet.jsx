import React, { useState } from 'react';

const getWeekday = (dateString) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(dateString).getDay()];
};

export default function AttendanceSheet({ students, timetable, getAttendanceForDate, markAttendance }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleAttendanceChange = (classId, studentId, status) => {
    markAttendance(selectedDate, classId, studentId, status);
    setFeedback(`Attendance marked for ${studentId}: ${status}`);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const todayClasses = selectedDate
    ? timetable.filter((entry) => entry.day === getWeekday(selectedDate))
    : [];
  const dateAttendance = selectedDate ? getAttendanceForDate(selectedDate) : {};

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance Sheet</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Select Date</label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {feedback && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {feedback}
        </div>
      )}
      {selectedDate && todayClasses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Student</th>
                {todayClasses.map((entry) => (
                  <th key={entry.id} className="px-4 py-2 text-left">{entry.subject}<br/>({entry.time})</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border px-4 py-2">{student.name}</td>
                  {todayClasses.map((entry) => (
                    <td key={entry.id} className="border px-4 py-2">
                      <select
                        value={dateAttendance[entry.id]?.[student.id] || ''}
                        onChange={(e) => handleAttendanceChange(entry.id, student.id, e.target.value)}
                        className="w-full bg-transparent"
                      >
                        <option value="">-</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-700">
          {selectedDate
            ? "No classes scheduled for the selected date."
            : "Please select a date to view the attendance sheet."}
        </p>
      )}
    </div>
  );
}

