import React, { useState } from 'react';

export default function SubjectList({ subjects, addSubject }) {
  const [newSubject, setNewSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSubject.trim()) {
      addSubject(newSubject.trim());
      setNewSubject('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Subjects</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="New Subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline">
            Add
          </button>
        </div>
      </form>
      <ul className="list-disc pl-5">
        {subjects.map((subject, index) => (
          <li key={index} className="mb-2 text-gray-700">{subject}</li>
        ))}
      </ul>
    </div>
  );
}

