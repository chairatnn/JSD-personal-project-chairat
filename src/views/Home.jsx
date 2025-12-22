import { useEffect, useState } from "react";
import { UserTable } from "../components/UserTable";
import { AdminTable } from "../components/AdminTable";
import axios from "axios";

// const API_GET = "https://jsd5-mock-backend.onrender.com/members";

// const API = "https://67eca027aa794fb3222e43e2.mockapi.io/members";
const API = "https://693fb530993d68afba696862.mockapi.io/api/1/maindata";
// const API = "http://localhost:3000/members";

export default function Home() {
  const [view, setView] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch {
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-6 gap-y-6 flex flex-col justify-start w-full">
      <section className="mt-20 text-5xl font-extrabold text-center">
        <h1>mini-ERP StartUp</h1>
        <h1 className="text-4xl py-2 hidden md:block" >Generation Thailand JSD#11</h1>
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-x-12 font-bold p-4">
        <button
          onClick={() => setView("admin")}
          className="w-full md:w-auto px-6 py-2 rounded-2xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Sale&Mkt Department
        </button>
        <button
          onClick={() => setView("admin")}
          className="w-full md:w-auto px-6 py-2 rounded-2xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Purchase Department
        </button>

        <button
          onClick={() => setView("admin")}
          className="w-full md:w-auto px-6 py-2 rounded-2xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Production Department
        </button>
        <button
          onClick={() => setView("admin")}
          className="w-full md:w-auto px-6 py-2 rounded-2xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          WareHouse Department
        </button>
      </section>

      <section className="w-full flex justify-center gap-x-3">
        {view === "user" ? (
          <section className=" p-5  flex">
            <UserTable users={users} />
          </section>
        ) : view === "admin" ? (
          <section className=" p-5  flex">
            {" "}
            <AdminTable
              users={users}
              setUsers={setUsers}
              fetchUsers={fetchUsers}
              API={API}
            />
          </section>
        ) : null}
      </section>

     <img src="artificial.gif" alt="dashboard image"
     className="relative z-10 w-auto h-auto object-cover rounded-lg shadow-lg p-0 md:p-4"
      />

    </div>
  );
}
