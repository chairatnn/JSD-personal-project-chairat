import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <ul className="flex items-center justify-center md:justify-end w-full bg-blue-500 h-14 border-b-2 border-black gap-x-6 text-xl text-white px-8">
        <li>
          <Link to="/" className=" hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/DashBoard" className=" hover:text-gray-300">
            DashBoard
          </Link>
        </li>
           <li>
          <Link to="/AboutUs" className=" hover:text-gray-300">
            AboutUs
          </Link>
        </li>
      </ul>
    </nav>
  );
}
