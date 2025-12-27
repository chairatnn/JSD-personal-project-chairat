import axios from "axios";
import { useState } from "react";

export function SaleTable({ users, setUsers, fetchUsers, API }) {
  const [form, setForm] = useState({
    customer_name: "",
    customer_address: "",
    order_date: "",
    order_qty: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    customer_name: "",
    customer_address: "",
    order_date: "",
    order_qty: "",
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
        customer_name: "",
        customer_address: "",
        order_date: "",
        order_qty: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (data_id) => {
    if (!window.confirm("Delete this data?")) return;
    try {
      await axios.delete(`${API}/${data_id}`);
      setUsers(users.filter((user) => user.data_id !== data_id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.data_id);
    setEditForm({
      customer_name: user.customer_name,
      customer_address: user.customer_address,
      order_date: user.order_date,
      order_qty: user.order_qty,
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
      <form
        onSubmit={handleSubmit}
        className="pb-3 flex flex-col md:flex-row gap-3 w-full items-center"
      >
        <input
          onChange={handleChange}
          value={form.customer_name}
          name="customer_name"
          className="bg-white mx-1 w-34 px-2 rounded border"
          placeholder="Customer Name"
        />
        <input
          onChange={handleChange}
          value={form.customer_address}
          name="customer_address"
          className="bg-white mx-1 w-34 px-2 rounded border"
          placeholder="Customer Address"
        />
        <input
          onChange={handleChange}
          value={form.order_date}
          name="order_date"
          type="date"
          className="bg-white mx-1 w-34 px-2 rounded border"
          placeholder="Order Date"
        />
        <input
          onChange={handleChange}
          value={form.order_qty}
          name="order_qty"
          type="number"
          className="bg-white mx-1 w-34 px-2 rounded border"
          placeholder="Order QTY"
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
            <th className="border p-2">Customer_Name</th>
            <th className="border p-2">Customer_Address</th>
            <th className="border p-2">Order_Date</th>
            <th className="border p-2">Order_QTY</th>
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
                      value={editForm.customer_name}
                      onChange={handleEditChange}
                      name="customer_name"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.customer_address}
                      onChange={handleEditChange}
                      name="customer_address"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.order_date}
                      onChange={handleEditChange}
                      name="order_date"
                      type="date"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.order_qty}
                      onChange={handleEditChange}
                      name="order_qty"
                      type="number"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <button
                      onClick={() => handleEditSave(user.data_id)}
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
                  <td className="border p-2 ">{user.customer_name}</td>
                  <td className="border p-2 ">{user.customer_address}</td>
                  <td className="border p-2 ">{user.order_date}</td>
                  <td className="border p-2 ">{user.order_qty}</td>
                  <td className="border p-2 ">
                    <button
                      onClick={() => handleEdit(user)}
                      className="cursor-pointer bg-green-400 hover:bg-green-500 text-white px-2 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.data_id)}
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
