import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="py-[5rem] flex flex-col justify-center items-center bg-white">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <h2 className="mt-4 text-2xl text-gray-600">Page Not Found</h2>
            <p className="mt-2 text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
            <button className="mt-6 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Link to="/">Go Home</Link>
            </button>
        </div>
    );
}
