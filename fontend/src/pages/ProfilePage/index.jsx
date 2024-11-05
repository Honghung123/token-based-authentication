import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProfilePage() {
    const userGlobal = useSelector((state) => state.userGlobal);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(userGlobal);
        if (!userGlobal.authenticated || userGlobal.user == null) {
            sessionStorage.setItem("accessDenied", "Unauthorized! Access Denied!");
            navigate("/login");
        }
    }, []);
    return (
        <>
            <h2 className="mt-4 text-2xl text-gray-600 text-center">Profile Page</h2>
            <div className="py-[5rem] flex flex-col justify-center items-center bg-white">
                <div className="border p-3 my-4 bg-slate-200 min-w-[20rem] min-h-[10rem]">
                    <p className="pb-2 font-bold text-lg text-gray-500 text-center">User info</p>
                    {userGlobal.authenticated && userGlobal.user ? (
                        <>
                            <p className="pb-2">Username: {userGlobal.user.username || "Unknown"}</p>
                            <p className="pb-2">Email: {userGlobal.user.email || "Unknown"}</p>
                            <p className="pb-2">CreateAt: {userGlobal.user.createdAt || "Unknown"}</p>
                        </>
                    ) : (
                        <CircularProgress />
                    )}
                </div>
                <button className="mt-6 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Link to="/">Go Home</Link>
                </button>
            </div>
        </>
    );
}
