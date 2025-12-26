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
        supplier_name: "",
        supplier_location: "",
        material_name: "",
        material_qty: "",
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
      supplier_name: user.supplier_name,
      supplier_location: user.supplier_location,
      material_name: user.material_name,
      material_qty: user.material_qty,
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
      <form onSubmit={handleSubmit} className="pb-3">
        <input
          onChange={handleChange}
          value={form.supplier_name}
          customer_name="supplier_name"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Supplier Name"
        />
        <input
          onChange={handleChange}
          value={form.supplier_location}
          customer_address="supplier_location"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Supplier Location"
        />
        <input
          onChange={handleChange}
          value={form.material_name}
          order_date="material_name"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Material Name"
        />
        <input
          onChange={handleChange}
          value={form.material_qty}
          order_qty="material_qty"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Material QTY"
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
            <th className="border p-2">Supplier_Name</th>
            <th className="border p-2">Supplier_Location</th>
            <th className="border p-2">Material_Name</th>
            <th className="border p-2">Material_QTY</th>
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
                  <td className="border p-2 ">{user.supplier_name}</td>
                  <td className="border p-2 ">{user.supplier_location}</td>
                  <td className="border p-2 ">{user.material_name}</td>
                  <td className="border p-2 ">{user.material_qty}</td>
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
