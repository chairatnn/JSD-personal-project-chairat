import axios from "axios";
import { useState } from "react";

export function PurchaseTable({ users, setUsers, fetchUsers, API }) {
  const [form, setForm] = useState({
    supplier_name: "",
    supplier_location: "",
    material_name: "",
    material_qty: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    supplier_name: "",
    supplier_location: "",
    material_name: "",
    material_qty: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form);
      await fetchUsers();
      // Reset the form
      setForm({
        supplier_name: "",
        supplier_location: "",
        material_name: "",
        material_qty: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (data_id) => {
    if (!window.confirm("Delete this data?")) return;
    await axios.delete(`${API}/${data_id}`);
    setUsers(users.filter((user) => user.data_id !== data_id));
  };

  const handleEdit = (user) => {
    setEditId(user.data_id);
    setEditForm({
      supplier_name: user.supplier_name,
      supplier_location: user.supplier_location,
      material_name: user.material_name,
      material_qty: user.material_qty,
    });
  };

  const handleEditSave = async (data_id) => {
    try {
      await axios.put(`${API}/${data_id}`, editForm);
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
      <form onSubmit={handleSubmit} className="pb-3 flex flex-col items-baseline md:flex-row gap-3 w-full">
        <input
          onChange={handleChange}
          value={form.supplier_name}
          name="supplier_name"
          className="bg-white mx-1 w-40 px-2 rounded border"
          placeholder="Supplier Name"
        />
        <input
          onChange={handleChange}
          value={form.supplier_location}
          name="supplier_location"
          className="bg-white mx-1 w-40 px-2 rounded border"
          placeholder="Supplier Location"
        />
        <input
          onChange={handleChange}
          value={form.material_name}
          name="material_name"
          className="bg-white mx-1 w-40 px-2 rounded border"
          placeholder="Material Name"
        />
        <input
          onChange={handleChange}
          value={form.material_qty}
          name="material_qty"
          type="number"
          className="bg-white mx-1 w-40 px-2 rounded border"
          placeholder="Material QTY"
        />
        <button
          type="submit"
          className="cursor-pointer bg-sky-500 hover:bg-sky-400 text-white px-3 py-2 mx-2 rounded-4xl"
        >
          Save new data
        </button>
      </form>
      <table className="w-full border-separate border-spacing-0 text-left">
        <thead>
          <tr className="text-center font-bold bg-gray-200">
            <th className="border-b p-3 text-sm">Supplier_Name</th>
            <th className="border-b p-3 text-sm">Supplier_Location</th>
            <th className="border-b p-3 text-sm">Material_Name</th>
            <th className="border-b p-3 text-sm">Material_QTY</th>
            <th className="border rounded-tr-lg p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.data_id} className="bg-white">
              {editId === user.data_id ? (
                <>
                  <td className="border p-2 ">
                    <input
                      value={editForm.supplier_name}
                      onChange={handleEditChange}
                      name="supplier_name"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.supplier_location}
                      onChange={handleEditChange}
                      name="supplier_location"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.material_name}
                      onChange={handleEditChange}
                      name="material_name"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.material_qty}
                      onChange={handleEditChange}
                      name="material_qty"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <button
                      onClick={() => handleEditSave(user.data_id)}
                      className="cursor-pointer bg-teal-400 hover:bg-teal-500 text-white min-w-16 px-2 rounded-xl"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="cursor-pointer bg-gray-400 hover:bg-gray-500 text-white min-w-16 px-2 rounded-xl"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border-b p-3 text-sm">{user.supplier_name}</td>
                  <td className="border-b p-3 text-sm">{user.supplier_location}</td>
                  <td className="border-b p-3 text-sm">{user.material_name}</td>
                  <td className="border-b p-3 text-sm">{user.material_qty}</td>
                  <td className="border-b p-3 text-sm">
                    <button
                      onClick={() => handleEdit(user)}
                      className="cursor-pointer bg-green-400 hover:bg-green-500 text-white min-w-14 px-2 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.data_id)}
                      className="cursor-pointer bg-rose-400 hover:bg-rose-500 text-white min-w-14 px-2 rounded-xl"
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
          <p className="mt-2 text-[10px] text-slate-900 italic md:hidden text-left w-full px-1">
          * Scroll to see more table information.
        </p>
    </div>
  );
}
