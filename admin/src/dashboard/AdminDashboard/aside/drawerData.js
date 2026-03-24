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
  FaPrayingHands,
  FaBible,
  FaRegEdit,
  FaRegFileAlt
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
    id: "sermons",
    name: "Sermons",
    icon: FaBible,
    link: "sermons"
  },
  { 
    id: "offeringdetails", 
    name: "OfferingDetails", 
    icon: FaChurch, 
    link: "offeringdetails" 
  },
  { 
    id: "prayerrequests", 
    name: "PrayerRequests",
    icon: FaPrayingHands,  
    link: "prayer" 
  },
  
  {
    id: "dedications",
    name: "Dedications",
    icon: FaRegFileAlt,
    link: "dedications"
  },
  {
    id: "testimonies",
    name: "Testimonies",
    icon: FaRegEdit,
    link: "testimonies"
  },
  { 
    id: "admins", 
    name: "Admins", 
    icon: FaUserShield, 
    link: "admins" 
  },
  { 
    id: "elders",
    name: "Elders", 
    icon: FaUserShield,
    link: "elders" 
    },
  { 
    id: "pastors",
    name: "Pastors", 
    icon: FaUserShield, 
    link: "pastors" 
    },
  {
    id: "patrons", 
    name: "Patrons", 
    icon: FaUserFriends, 
    link: "patrons"
  }
];