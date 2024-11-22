import React, { useState } from 'react';

export default function StudentList({ students, addStudent }) {
  const [newStudent, setNewStudent] = useState({ name: '', id: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(newStudent);
    setNewStudent({ name: '', id: '' });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <input
          type="text"
          placeholder="Student ID"
          value={newStudent.id}
          onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Student
        </button>
      </form>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="mb-2">{student.name} (ID: {student.id})</li>
        ))}
      </ul>
    </div>
  );
}

