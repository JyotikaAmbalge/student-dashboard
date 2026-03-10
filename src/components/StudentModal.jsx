import React, { useState, useEffect } from "react";

const StudentModal = ({ isOpen, onClose, onSave, student, loading }) => {

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        name: "",
        email: "",
        age: ""
      });
    }
  }, [student]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-violet-900">
          {student ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Student Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">
                {errors.age}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-violet-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
               className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:bg-gray-300 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentModal;