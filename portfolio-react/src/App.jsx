import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default App;
