import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. ลบสถานะการเข้าสู่ระบบออกจาก LocalStorage
    localStorage.removeItem("isAuthenticated");

    // 2. ส่งผู้ใช้กลับไปที่หน้า Login
    // ใช้ replace: true เพื่อไม่ให้ผู้ใช้กด Back กลับมาหน้าเดิมได้
    navigate("/login", { replace: true });
  };

  return (
    <nav>
      <ul className="flex items-center justify-center md:justify-end w-full bg-blue-500 h-14 border-b-2 border-black gap-x-6 text-xl text-white px-4">
        <li>
          <Link to="/" className=" hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/DashBoard" className=" hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/AboutUs" className=" hover:text-gray-300">
            AboutUs
          </Link>
        </li>

        {/* เพิ่มปุ่ม Logout */}
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 text-decoration: underline"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
