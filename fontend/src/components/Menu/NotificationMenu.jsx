import React from "react";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import { ArrowForwardIos } from "@mui/icons-material";

export default function NotificationMenu({ notificationItems, children, title = "" }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title={title}>
                    <IconButton
                        onMouseOver={handleClick}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        {children}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
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
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <div className="max-w-md mx-auto overflow-hidden">
                    <div className="p-1">
                        <h3 className="text-lg font-semibold text-center">{title}</h3>
                    </div>
                    <div className="overflow-hidden">
                        {notificationItems.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                image={notification.image}
                                title={notification.title}
                                message={notification.message}
                            />
                        ))}
                    </div>
                    <div className="p-1 text-center">
                        <Link to="/notifications" className="text-sm text-blue-500">
                            View All
                        </Link>
                    </div>
                </div>
            </Menu>
        </>
    );
}

const NotificationItem = ({ image, title, message }) => {
    return (
        <div className="flex items-center p-2 bg-white hover:bg-gray-200 transition duration-300 cursor-pointer border-b-slate-300 border-b first:border-t-2 last:border-b-2 first:border-t-slate-300">
            {/* Image on the left */}
            <img src={image} alt="notification" className="w-12 h-12 rounded-sm" />

            {/* Title and message in the middle */}
            <div className="flex-1 ml-4 mr-2">
                <h3 className="text-sm font-semibold text-gray-800 truncate ">{title}</h3>
                <p className="text-sm text-gray-600">{message}</p>
            </div>

            {/* Arrow icon on the right */}
            <ArrowForwardIos className="text-gray-400" />
        </div>
    );
};
