import React from "react";
import dynamic from "next/dynamic";
import Footer from "./Footer";

const NavBar = dynamic(
  () => {
    return import("./NavBar");
  },
  { ssr: false }
);

function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main
        style={{
          marginTop: "100px",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
