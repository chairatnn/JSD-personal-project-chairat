import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./views/Home";
import AboutUs from "./views/AboutUs";
import DashBoard from "./views/DashBoard";
import { Login } from "./views/Login";

/**
 * 1. สร้างตัว Check สถานะเพียงอันเดียว
 * ทำหน้าที่ตรวจสอบว่ามี 'isAuthenticated' ใน localStorage หรือไม่
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // ถ้าไม่มีค่าล็อกอิน ให้ส่งกลับไปหน้า Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ถ้ามีค่าล็อกอิน ให้แสดง Component ที่อยู่ข้างใน (ในที่นี้คือ Layout)
  return children;
};

/**
 * 2. กำหนดโครงสร้าง Route
 */
const router = createBrowserRouter([
  {
    // หน้า Login จะอยู่นอก Layout (ไม่มี Navbar)
    path: "/login",
    element: <Login />,
  },
  {
    // หน้าหลักที่ต้องมีการป้องกัน
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { 
        // ใช้ index: true เพื่อบอกว่าเป็นหน้าแรกของ Layout นี้
        index: true, 
        element: <Home />, 
      },
      { path: "/AboutUs", element: <AboutUs /> },
      { path: "/DashBoard", element: <DashBoard /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
