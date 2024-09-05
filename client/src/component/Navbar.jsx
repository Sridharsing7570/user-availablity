import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log("backend url:", backendUrl);
  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <div className="text-lg font-semibold">Scheduling System</div>
      <div className="space-x-4">
        <Link to="/">
          <Button colorScheme="whiteAlpha">Dashboard</Button>
        </Link>
        <Link to="/availability">
          <Button colorScheme="whiteAlpha">Availability</Button>
        </Link>
        <Link to="/sessions">
          <Button colorScheme="whiteAlpha">Sessions</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
