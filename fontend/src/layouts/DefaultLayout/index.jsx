import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function DefaultLayout({ children }) {
    const darkMode = false;
    return (
        <div className={darkMode ? "dark" : ""}>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );
}
