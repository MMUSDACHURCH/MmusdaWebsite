import { 
  FaBuilding, 
  FaCalendarCheck, 
  FaUsers, 
  FaMusic, 
  FaHome, 
  FaChurch, 
  FaBullhorn, 
  FaUserFriends,
  FaEnvelope,
  FaLightbulb,
  FaHandHoldingUsd,
  FaUserShield,
  FaPrayingHands
} from "react-icons/fa";

export const adminDrawerData = [
  { 
    id: "dashboard", 
    name: "Dashboard", 
    icon: FaPrayingHands, 
    link: "" 
  },
  { 
    id: "departments", 
    name: "Departments", 
    icon: FaBuilding, 
    link: "departments" 
  },
  { 
    id: "events", 
    name: "Events", 
    icon: FaCalendarCheck, 
    link: "events" 
  },
  { 
    id: "leaders", 
    name: "Leaders", 
    icon: FaUsers, 
    link: "leaders" 
  },
  { 
    id: "homechurches", 
    name: "Home Churches", 
    icon: FaHome, 
    link: "homechurches" 
  },
  { 
    id: "families", 
    name: "Families", 
    icon: FaUserFriends, 
    link: "families" 
  },
  { 
    id: "announcements", 
    name: "Announcements", 
    icon: FaBullhorn, 
    link: "announcements" 
  },
  { 
    id: "choirs", 
    name: "Choirs", 
    icon: FaMusic, 
    link: "choirs" 
  },
  { 
    id: "members", 
    name: "Members", 
    icon: FaUsers, 
    link: "members" 
  },
  { 
    id: "contacts", 
    name: "Contacts", 
    icon: FaEnvelope, 
    link: "contacts" 
  },
  { 
    id: "suggestions", 
    name: "Suggestions", 
    icon: FaLightbulb, 
    link: "suggestions" 
  },
  { 
    id: "offering", 
    name: "Offering", 
    icon: FaHandHoldingUsd, 
    link: "offering" 
  },
  { 
    id: "offeringdetails", 
    name: "Offering Details", 
    icon: FaChurch, 
    link: "offering-details" 
  },
  { 
    id: "admins", 
    name: "Admins", 
    icon: FaUserShield, 
    link: "admins" 
  },
];