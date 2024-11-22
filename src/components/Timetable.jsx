import React, { useState } from 'react';

export default function Timetable({ timetable, addTimetableEntry, subjects }) {
  const [newEntry, setNewEntry] = useState({ day: '', time: '', subject: '', id: '' });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEntry.day && newEntry.time && newEntry.subject) {
      addTimetableEntry({ ...newEntry, id: Date.now().toString() });
      setNewEntry({ day: '', time: '', subject: '', id: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Timetable</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="day" className="block text-gray-700 text-sm font-bold mb-2">Day</label>
          <select
            id="day"
            name="day"
            value={newEntry.day}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={newEntry.time}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <select
            id="subject"
            name="subject"
            value={newEntry.subject}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Add Timetable Entry
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Day</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Subject</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((entry) => (
              <tr key={entry.id}>
                <td className="border px-4 py-2">{entry.day}</td>
                <td className="border px-4 py-2">{entry.time}</td>
                <td className="border px-4 py-2">{entry.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

