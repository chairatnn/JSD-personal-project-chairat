import axios from "axios";
import { useState } from "react";

export function ProductionTable({ users, setUsers, fetchUsers, API }) {
  const [form, setForm] = useState({
    production_date: "",
    product_name: "",
    production_output: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    production_date: "",
    product_name: "",
    production_output: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.data_id]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.data_id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form);
      await fetchUsers();
      // Reset the form
      setForm({
        production_date: "",
        product_name: "",
        production_output: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this data?")) return;
    await axios.delete(`${API}/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditForm({
      production_date: user.production_date,
      product_name: user.product_name,
      production_output: user.production_output,
    });
  };

  const handleEditSave = async (id) => {
    try {
      await axios.put(`${API}/${id}`, editForm);
      await fetchUsers();
      setEditId(null);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="pb-3 flex flex-col md:flex-row gap-3 w-full items-center">
        <input
          onChange={handleChange}
          value={form.production_date}
          customer_name="production_date"
          className="bg-white mx-1 w-34 px-2 rounded border"
          placeholder="Production Date"
        />
        <input
          onChange={handleChange}
          value={form.product_name}
          customer_address="product_name"
          className="bg-white mx-1 w-34 px-2 rounded border"
          placeholder="Product Name"
        />
        <input
          onChange={handleChange}
          value={form.production_output}
          order_date="production_output"
          className="bg-white mx-1 w-34 px-2 rounded border"
          placeholder="Production Output"
        />
        <button
          type="submit"
          className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 mx-1 rounded-4xl"
        >
          Save new data
        </button>
      </form>
      <table className="w-full border-separate">
        <thead>
          <tr className="text-center font-bold bg-gray-200">
            <th className="border p-2">Production_Date</th>
            <th className="border p-2">Product_Name</th>
            <th className="border p-2">Production_Output</th>
            <th className="border rounded-tr-lg p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white">
              {editId === user.id ? (
                <>
                  <td className="border p-2 ">
                    <input
                      value={editForm.production_date}
                      onChange={handleEditChange}
                      name="production_date"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.product_name}
                      onChange={handleEditChange}
                      name="product_name"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.production_output}
                      onChange={handleEditChange}
                      name="production_output"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <button
                      onClick={() => handleEditSave(user.id)}
                      className="cursor-pointer bg-teal-400 hover:bg-teal-500 text-white px-2 rounded-xl"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="cursor-pointer bg-gray-400 hover:bg-gray-500 text-white px-2 rounded-xl"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2 ">{user.production_date}</td>
                  <td className="border p-2 ">{user.product_name}</td>
                  <td className="border p-2 ">{user.production_output}</td>
                  <td className="border p-2 ">
                    <button
                      onClick={() => handleEdit(user)}
                      className="cursor-pointer bg-green-400 hover:bg-green-500 text-white px-2 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="cursor-pointer bg-rose-400 hover:bg-rose-500 text-white px-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
