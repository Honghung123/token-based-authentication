import React from "react";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your email submission logic here
        console.log("Email submitted:", email);
        setEmail("");
    };

    return (
        <footer className="shadow-xl bg-stone-950 py-2 bg-opacity-90 backdrop-filter backdrop-blur-lg">
            <div className="top-footer">
                <div className="max-w-screen-xl px-4 sm:grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 mx-auto">
                    <div className="p-5">
                        <h3 className="font-bold text-xl text-stone-100">Company Name</h3>
                    </div>
                    <div className="p-5">
                        <div className="text-xl uppercase text-stone-100 font-bold">Resources</div>
                        <a className="my-3 block text-stone-100 hover" href="/#">
                            Documentation
                        </a>
                        <a className="my-3 block text-stone-100 hover" href="/#">
                            Tutorials
                        </a>
                        <a className="my-3 block text-stone-100 hover" href="/#">
                            Support
                        </a>
                    </div>
                    <div className="p-5">
                        <div className="text-xl text-stone-100 uppercase font-bold">Support</div>
                        <a className="my-3 block text-stone-100 hover " href="/#">
                            Help Center
                        </a>
                        <a className="my-3 block text-stone-100 hover " href="/#">
                            Privacy Policy
                        </a>
                        <a className="my-3 block text-stone-100 hover " href="/#">
                            Conditions
                        </a>
                    </div>
                    <div className="p-5">
                        <div className="text-xl uppercase text-stone-100 font-bold">Contact us</div>
                        <a className="my-3 block text-stone-100 hover " href="/#">
                            XXX XXXX, Floor 4 San Francisco, CA
                        </a>
                        <a className="my-3 block text-stone-100 hover " href="/#">
                            contact@company.com
                        </a>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Subscribe to our Newsletter</h3>
                        <form onSubmit={handleSubmit} className="flex space-y-3 items-stretch gap-x-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 rounded-md placeholder-text-color"
                                placeholder="Enter your email"
                                required
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-600 text-white"
                            >
                                <SendIcon sx={{ fontSize: 18 }} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <div className="flex p-3 m-auto border-t flex-col max-w-screen-lg items-center">
                    <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex gap-3">
                        <a href="/#" className="flex justify-center items-center">
                            <button className="group flex justify-center p-[.1rem] rounded-md drop-shadow-xl from-gray-800 bg-[#317df6] text-white font-semibold hover:translate-y-1 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
                                <FacebookIcon />
                                <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:text-sm group-hover:-translate-y-7 duration-500">
                                    Facebook
                                </span>
                            </button>
                        </a>
                        <a href="/#" className="flex justify-center items-center">
                            <button className="group flex justify-center p-[.1rem] rounded-md drop-shadow-xl from-gray-800 bg-[#f6318a] text-white font-semibold hover:translate-y-1 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
                                <InstagramIcon />
                                <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:text-sm group-hover:-translate-y-7 duration-500">
                                    Instagram
                                </span>
                            </button>
                        </a>
                        <a href="/#" className="flex justify-center items-center">
                            <button className="group flex justify-center p-[.1rem] rounded-md drop-shadow-xl from-gray-800 bg-[#31c5f6] text-white font-semibold hover:translate-y-1 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
                                <TwitterIcon />
                                <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:text-sm group-hover:-translate-y-7 duration-500">
                                    Facebook
                                </span>
                            </button>
                        </a>
                    </div>

                    <div className="mt-5 text-stone-100">© Copyright 2025. All Rights Not Reserved.</div>
                </div>
            </div>
        </footer>
    );
}
