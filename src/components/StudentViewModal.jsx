import React from "react";
import { IoClose } from "react-icons/io5";

function StudentViewModal({ student, onClose }) {

  if (!student) return null;

  return (

    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4"
      onClick={onClose}
    >

      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-semibold text-violet-900 mb-6">
          Student Details
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium">{student.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium">{student.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Age</p>
            <p className="font-medium">{student.age}</p>
          </div>

          {student.course && (
            <div>
              <p className="text-gray-500 text-sm">Course</p>
              <p className="font-medium">{student.course}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default StudentViewModal;