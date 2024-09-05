import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import Availability from "./component/Availability";
import Sessions from "./component/Sessions";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/sessions" element={<Sessions />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
