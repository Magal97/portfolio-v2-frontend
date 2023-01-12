import React from "react";
import GlobalStyle from "./styles/global";
import Routes from "./routes";
import AppProvider from "./hooks";

function App() {
  return (
    <>
      {/* @ts-ignore */}
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
