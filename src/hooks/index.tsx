import React from "react";
import { ToastProvider } from "./ToastContext";
//@ts-ignore
const AppProvider: React.FC = ({ children }) => (
  <>
    {/* @ts-ignore */}
    <ToastProvider>{children}</ToastProvider>
  </>
);

export default AppProvider;
