import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";

function StudentsTable({ students, onEdit, onDelete, onView }) {

  return (

    <div className="w-full overflow-x-auto">

      <table className="min-w-[600px] w-full">

        <thead>
          <tr className="bg-violet-100 text-violet-900">
            <th className="p-3 text-left">S.No</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 pl-6 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (

            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No students found
              </td>
            </tr>
          ) : (
            students.map((student, index) => (

              <tr
                key={student.id}
                className="border-t hover:bg-violet-50 transition"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.age}</td>
                <td className="p-3 flex gap-1">
                  <button
                    onClick={() => onEdit(student)}
                    className="text-violet-600 hover:bg-violet-100 p-2 rounded"
                  >
                    <MdModeEditOutline size={20} />
                  </button>

                  <button
                    onClick={() => onDelete(student)}
                    className="text-violet-700 hover:bg-violet-100 p-2 rounded"
                  >
                    <MdDeleteForever size={21} />
                  </button>

                  <button
                    onClick={() => onView(student)}
                    className="text-violet-600 hover:bg-violet-100 p-2 rounded"
                  >
                    <FaEye size={19} />
                  </button>

                </td>
              </tr>
            ))
          )}

        </tbody>
      </table>
      
    </div>
  );
}

export default StudentsTable;