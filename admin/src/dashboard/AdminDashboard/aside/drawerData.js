import {
    FaBuilding,
    FaCalendarCheck,
    FaUsers,
    FaMusic,
    FaHome,
    FaChurch,
    FaBullhorn,
    FaUserFriends
} from "react-icons/fa";

export const adminDrawerData = [
    {
        id: "departments",
        name: "Departments",
        icon: FaBuilding,
        link: "departments",
        description: "Manage department listings"
    },
    {
        id: "Admins",
        name: "Admins",
        link: "admins",
        description: "website admins"
    },
    {
        id: "events",
        name: "Events",
        icon: FaCalendarCheck,
        link: "events",
        description: "Event Management"
    },
    {
        id: "leaders",
        name: "Leaders",
        icon: FaUsers,
        link: "leaders",
        description: "Leadership Management"
    },
    {
        id: "homechurches",
        name: "Home Churches",
        icon: FaHome,
        link: "homechurches",
        description: "Home Churches"
    },
    {
        id: "families",
        name: "Families",
        icon: FaUserFriends,
        link: "families",
        description: "Families"
    },
    {
        id: "anouncements",
        name: "Announcements",
        icon: FaBullhorn,
        link: "anouncements",
        description: "Announcements"
    },
    {
        id: "choirs",
        name: "Choirs",
        icon: FaMusic,
        link: "choirs",
        description: "Church Choirs"
    },
    {
        id: "members",
        name: "Members",
        link: "members",
        description: "members"
    },
    {
        id: "contacts",
        name: "contacts",
        link: "contacts",
        description: "contacts"
    },
    {
        id: "Suggestions",
        name: "Suggestions",
        link: "suggestions",
        description: "Suggestions"
    },
    {
        id: "Offering",
        name: "Offering",
        link: "offering",
        description: "Offering"
    },
];