import React, { useState, useEffect } from "react";
import StudentTable from "./components/StudentsTable";
import StudentModal from "./components/StudentModal";
import StudentViewModal from "./components/StudentViewModal";
import mockStudents from "./data/mockStudents";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IoMdSearch } from "react-icons/io";

function App() {

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : mockStudents;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const openAddModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const saveStudent = (studentData) => {
    setLoading(true);
    setTimeout(() => {

      if (selectedStudent) {
        setStudents(
          students.map((s) =>
            s.id === selectedStudent.id
              ? { ...studentData, id: selectedStudent.id }
              : s
          )
        );
      } else {
        const newStudent = {
          ...studentData,
          id: Date.now()
        };

        setStudents([...students, newStudent]);
      }

      setLoading(false);
      closeModal();
    }, 800);
  };

  const deleteStudent = (student) => {
    setStudentToDelete(student);
  };

  const handleViewStudent = (student) => {
    setViewStudent(student);
  };

  const exportToExcel = () => {

    const dataToExport = students.map(({ name, email, age }) => ({
      Name: name,
      Email: email,
      Age: age
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(data, "students.xlsx");
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (

    <div className="min-h-screen bg-violet-50 p-4 md:p-8">

      <h1 className="text-2xl md:text-3xl font-bold text-violet-900 mb-6">
        Student Management Dashboard
      </h1>


      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">

          <IoMdSearch
            className="absolute left-3 top-3 text-violet-400"
            size={22}
          />

          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-violet-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
          />

        </div>

        <div className="flex gap-2 flex-wrap">

          <button
            onClick={exportToExcel}
            disabled={students.length === 0}
            className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 disabled:bg-gray-300"
          >
            Export Excel
          </button>

          <button
            onClick={openAddModal}
            className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
          >
            + Add Student
          </button>

        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 border border-violet-100 overflow-x-auto">

        {loading && (
          <p className="text-violet-600 mb-4">Loading...</p>
        )}

        <StudentTable
          students={currentStudents}
          onEdit={openEditModal}
          onDelete={deleteStudent}
          onView={handleViewStudent}
        />

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 gap-3">

          <p className="text-sm text-gray-500">
            Showing {indexOfFirstStudent + 1} -{" "}
            {Math.min(indexOfLastStudent, filteredStudents.length)} of{" "}
            {filteredStudents.length} students
          </p>

          <div className="flex gap-1 flex-wrap">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (

              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1
                    ? "bg-violet-600 text-white"
                    : "border"
                  }`}
              >
                {i + 1}
              </button>

            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveStudent}
        student={selectedStudent}
        loading={loading}
      />

      <StudentViewModal
        student={viewStudent}
        onClose={() => setViewStudent(null)}
      />


      {studentToDelete && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">

            <h3 className="text-lg font-semibold mb-4 text-violet-900">
              Delete Student
            </h3>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this student?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2 border border-violet-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setStudents(
                    students.filter(s => s.id !== studentToDelete.id)
                  );
                  setStudentToDelete(null);
                }}
                className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;