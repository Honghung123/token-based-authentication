import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import authStore from "./stateManagement/store/authStore.js";
import { Provider } from "react-redux";
import "./index.css";

/* Material UI default font: Roboto */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import MyRouterProvider from "./router/MyRouterProvider.jsx";
import Loading from "./components/Loading/index.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={authStore}>
            <Suspense fallback={<Loading />}>
                <MyRouterProvider />
            </Suspense>
        </Provider>
    </StrictMode>
);
