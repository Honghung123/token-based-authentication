import React from "react";
import NotificationMenu from "../Menu/NotificationMenu";

const notifications = [
    {
        id: 1,
        image: "https://via.placeholder.com/50",
        title: "New Message",
        message: "You have a new message from John.",
    },
    {
        id: 2,
        image: "https://via.placeholder.com/50",
        title: "Task Reminder",
        message: "Don’t forget to complete your project task.",
    },
    {
        id: 3,
        image: "https://via.placeholder.com/50",
        title: "Event Invitation",
        message:
            "You are invited to join the team meeting tomorrow. See you there. You are invited to join the team meeting tomorrow. See you there",
    },
];

export default function Notification({ children }) {
    return (
        <>
            <NotificationMenu notificationItems={notifications} title="Notifications">
                {children}
            </NotificationMenu>
        </>
    );
}
