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
        <h1>mini-ERP SMEs & StartUp</h1>
        <h1 className="text-4xl py-2" >Generation Thailand JSD#11</h1>
      </section>

      <section className="flex justify-center gap-x-12 font-bold">
        <button
          onClick={() => setView("user")}
          className="p-5 bg-emerald-400 flex rounded-2xl cursor-pointer border hover:bg-emerald-300"
        >
          Sale&Mkt Department
        </button>
        <button
          onClick={() => setView("admin")}
          className="p-5 bg-emerald-400 flex rounded-2xl cursor-pointer border hover:bg-emerald-300"
        >
          Purchase Department
        </button>

        <button
          onClick={() => setView("admin")}
          className="p-5 bg-emerald-400 flex rounded-2xl cursor-pointer border hover:bg-emerald-300"
        >
          Production Department
        </button>
        <button
          onClick={() => setView("admin")}
          className="p-5 bg-emerald-400 flex rounded-2xl cursor-pointer border hover:bg-emerald-300"
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

     <img src="dashboard2.jpg" alt="user image"
     className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 md:px-16"
      />

    </div>
  );
}
