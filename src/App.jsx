import React, { useState } from 'react';
import { format } from 'date-fns';
import StudentList from './components/StudentList';
import Timetable from './components/Timetable';
import AttendanceSheet from './components/AttendanceSheet';
import SubjectList from './components/SubjectList';
import AttendanceHistory from './components/AttendanceHistory';

export default function App() {
  const [students, setStudents] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const addTimetableEntry = (entry) => {
    setTimetable([...timetable, entry]);
  };

  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  const markAttendance = (date, classId, studentId, status) => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    const historyEntry = { date: formattedDate, classId, studentId, status, timestamp: new Date().toISOString() };
    setAttendanceHistory(prevHistory => [historyEntry, ...prevHistory]);
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [formattedDate]: {
        ...(prevAttendance[formattedDate] || {}),
        [classId]: {
          ...(prevAttendance[formattedDate]?.[classId] || {}),
          [studentId]: status,
        },
      },
    }));
  };

  const getAttendanceForDate = (date) => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    return attendance[formattedDate] || {};
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-BLue-600">VIT BHOPAL-VTOP</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StudentList students={students} addStudent={addStudent} />
        <Timetable timetable={timetable} addTimetableEntry={addTimetableEntry} subjects={subjects} />
        <SubjectList subjects={subjects} addSubject={addSubject} />
      </div>
      <AttendanceSheet 
        students={students} 
        timetable={timetable} 
        getAttendanceForDate={getAttendanceForDate}
        markAttendance={markAttendance} 
        subjects={subjects}
      />
      <AttendanceHistory history={attendanceHistory} />
    </div>
  );
}

