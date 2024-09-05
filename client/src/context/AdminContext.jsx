import React, { createContext } from "react";

export const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  const backendUrl = process.env.VITE_BACKEND_URL;
  console.log("backend url:", backendUrl);
  return <AdminContext.Provider>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
