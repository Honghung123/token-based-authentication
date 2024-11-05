import React, { useState } from "react";

export default function HomePage() {
    const [openModal, setOpenModal] = useState(true);
    const [toaster, setToaster] = useState({
        open: false,
        message: "",
        title: "",
        type: "info",
    });
    const onOpenClick = () => {
        setOpenModal(!openModal);
    };

    return (
        <div className="relative">
            {toaster.open && <Toaster openStatus={toaster.open} message={toaster.message} type={toaster.type} />}
            <div
                aria-hidden="true"
                className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-[-1]"
            >
                <div className="blur-3xl h-80 bg-gradient-to-br from-lime-300 to-purple-400 dark:from-blue-700 -hue-rotate-15 -mt-6"></div>
                <div className="blur-3xl h-32 bg-gradient-to-r from-cyan-300 to-fuchsia-300 dark:to-indigo-600"></div>
            </div>
            <div className="relative pt-24 ml-auto">
                <div className="lg:w-2/3 text-center mx-auto">
                    <h1 className="text-gray-700 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                        Shaping a world with <span className="text-primary dark:text-sky-400">reimagination.</span>
                    </h1>
                    <p className="mt-8 text-sky-700 dark:text-fuchsia-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi
                        error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae
                        ipsum soluta!
                    </p>
                    <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                        <a
                            href="#"
                            className="relative bg-rose-500 flex h-11 rounded-md items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                        >
                            <span className="relative text-base font-semibold text-white">Get started</span>
                        </a>
                        <a
                            href="#"
                            className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                        >
                            <span className="relative text-base font-semibold text-primary dark:text-white">
                                Learn more
                            </span>
                        </a>
                    </div>

                    <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
                        <div className="text-left">
                            <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
                            <p className="mt-2 text-gray-500">Some text here</p>
                        </div>
                        <div className="text-left">
                            <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                The fastest on the market
                            </h6>
                            <p className="mt-2 text-gray-500">Some text here</p>
                        </div>
                        <div className="text-left">
                            <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The most loved</h6>
                            <p className="mt-2 text-gray-500">Some text here</p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                    <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                        <img
                            src="./images/clients/microsoft.svg"
                            className="h-12 w-auto mx-auto"
                            loading="lazy"
                            alt="client logo"
                            width=""
                            height=""
                        />
                    </div>
                    <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                        <img
                            src="./images/clients/airbnb.svg"
                            className="h-12 w-auto mx-auto"
                            loading="lazy"
                            alt="client logo"
                            width=""
                            height=""
                        />
                    </div>
                    <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                        <img
                            src="./images/clients/google.svg"
                            className="h-9 w-auto m-auto"
                            loading="lazy"
                            alt="client logo"
                            width=""
                            height=""
                        />
                    </div>
                    <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                        <img
                            src="./images/clients/ge.svg"
                            className="h-12 w-auto mx-auto"
                            loading="lazy"
                            alt="client logo"
                            width=""
                            height=""
                        />
                    </div>
                    <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                        <img
                            src="./images/clients/netflix.svg"
                            className="h-8 w-auto m-auto"
                            loading="lazy"
                            alt="client logo"
                            width=""
                            height=""
                        />
                    </div>
                    <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                        <img
                            src="./images/clients/google-cloud.svg"
                            className="h-12 w-auto mx-auto"
                            loading="lazy"
                            alt="client logo"
                            width=""
                            height=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
