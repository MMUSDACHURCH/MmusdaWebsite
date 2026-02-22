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
        id: "events",
        name: "Events",
        icon: FaCalendarCheck,
        link: "events",
        description: "Event Management"
    },
    {
        id: "bookings",
        name: "Bookings",
        icon: FaCalendarCheck,
        link: "bookings",
        description: "Reservation Management"
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
        id: "music",
        name: "Music",
        icon: FaMusic,
        link: "music",
        description: "Music"
    }
];