import React from "react";

export default function SearchHintMenu({ searchInput }) {
    return (
        <>
            <div className="absolute w-full bottom-0 left-0 translate-y-[calc(100%+.3rem)] z-50 shadow-card border rounded-lg bg-white px-4 py-2">
                <div className="hint-title">Search for: {searchInput}</div>
                <div className="hint-desc">Please enter a search term</div>
            </div>
        </>
    );
}
