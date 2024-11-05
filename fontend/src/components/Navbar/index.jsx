import React, { useState } from "react";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

const MAX_VISIBLE_ITEMS = 6;

export default function Navbar({ navItems }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Split the menu into visible items and remaining items for the dropdown
    const visibleItems = navItems.slice(0, MAX_VISIBLE_ITEMS);
    const remainingItems = navItems.slice(MAX_VISIBLE_ITEMS);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className="bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-12">
                    <div className="flex space-x-4">
                        {visibleItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-gray-800 hover:text-blue-600 hover:underline px-3 py-2 text-md font-medium"
                            >
                                {item.label}
                            </a>
                        ))}

                        {/* If there are remaining items, render the dropdown */}
                        {remainingItems.length > 0 && (
                            <div>
                                <IconButton
                                    onClick={handleClick}
                                    aria-controls="dropdown-menu"
                                    aria-haspopup="true"
                                    className="text-gray-800 hover:text-blue-600"
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="dropdown-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.2,
                                                transitionDuration: ".3s!important",
                                                "&::before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform: "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                >
                                    {remainingItems.map((item, index) => (
                                        <MenuItem key={index} onClick={handleClose} component="a" href={item.href}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
