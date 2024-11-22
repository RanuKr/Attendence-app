import React from 'react';

export default function AttendanceHistory({ history }) {
  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Student ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.date}</td>
                <td className="border px-4 py-2">{entry.classId}</td>
                <td className="border px-4 py-2">{entry.studentId}</td>
                <td className="border px-4 py-2">{entry.status}</td>
                <td className="border px-4 py-2">{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

