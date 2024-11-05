import React from "react";

import "./style.css";

export default function Loading() {
    return (
        <div id="loader-wrapper">
            <div id="loader"></div>
            <div class="loader-section section-left"></div>
            <div class="loader-section section-right"></div>
        </div>
    );
}
