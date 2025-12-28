import { useEffect, useState } from "react";
import { SaleTable } from "./SaleTable";
import axios from "axios";
import { PurchaseTable } from "./PurchaseTable";
import { ProductionTable } from "./ProductionTable";
import { WarehouseTable } from "./WarehouseTable";

const API = "https://693fb530993d68afba696862.mockapi.io/api/1/maindata";

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
    <div className="min-h-screen p-4 md:p-4 gap-y-4 flex flex-col justify-start w-full">
      <section className="mt-2 text-2xl md:text-4xl font-extrabold text-center">
        <h1>mini-ERP for StartUp</h1>
        <h1 className="text-2xl text-gray-600 py-2 hidden md:block">
          Generation Thailand JSD#11
        </h1>
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-x-4 font-bold p-2">
        <button
          onClick={() => setView("sale")}
          className="w-full md:w-auto px-6 py-2 rounded-2xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Sale&Mkt Department
        </button>
        <button
          onClick={() => setView("purchase")}
          className="w-full md:w-auto px-6 py-2 rounded-2xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Purchase Department
        </button>

        <button
          onClick={() => setView("production")}
          className="w-full md:w-auto px-6 py-2 rounded-2xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Production Department
        </button>
        <button
          onClick={() => setView("warehouse")}
          className="w-full md:w-auto px-6 py-2 rounded-2xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          WareHouse Department
        </button>
      </section>

      <section className="w-full md:flex justify-center gap-x-3">
        {view === "sale" ? (
          <section className="p-1 flex">
            {" "}
            <SaleTable
              users={users}
              setUsers={setUsers}
              fetchUsers={fetchUsers}
              API={API}
            />
          </section>
        ) : view === "purchase" ? (
          <section className=" p-1 flex">
            {" "}
            <PurchaseTable
              users={users}
              setUsers={setUsers}
              fetchUsers={fetchUsers}
              API={API}
            />
          </section>
        ) : view === "production" ? (
          <section className=" p-1 flex">
            {" "}
            <ProductionTable
              users={users}
              setUsers={setUsers}
              fetchUsers={fetchUsers}
              API={API}
            />
          </section>
        ) : view === "warehouse" ? (
          <section className=" p-1 flex">
            {" "}
            <WarehouseTable
              users={users}
              setUsers={setUsers}
              fetchUsers={fetchUsers}
              API={API}
            />
          </section>
        ) : null}
      </section>

      {/* <img src="artificial.gif" alt="dashboard image"
     className="relative z-10 w-auto h-auto object-cover rounded-lg shadow-lg p-0 md:p-4"
      /> */}

      {view === null && (
        <div className="w-full max-w-7xl mx-auto mt-0.5">
          <video
            className="w-full aspect-video object-cover rounded-3xl shadow-2xl border-4 border-white"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="city.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-center mt-2 text-gray-900 font-medium italic">
            © 2025 Chairat Nuansamniang. Welcome to mini-ERP for StartUp
          </p>
        </div>
      )}
    </div>
  );
}
