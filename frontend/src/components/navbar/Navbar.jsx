import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo1 from "../../assets/images/logo1.jpeg";
import {
  Menu, X, ChevronDown, ChevronRight, ArrowLeft,
  Home, GraduationCap, Info, Calendar, Phone,
  HandHeart, Users, BookOpen, Megaphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const navItems = [
  { label: "Home", path: "https://www.google.com", external: true, icon: <Home className="w-4 h-4" /> },
  { label: "Departments", path: "/departments", icon: <GraduationCap className="w-4 h-4" /> },
  {
    label: "About",
    icon: <Info className="w-4 h-4" />,
    children: [
      { label: "About MMUSDA", path: "/about/mmusda" },
      { label: "About SDA", path: "/about/sda" },
      { label: "Beliefs", path: "/about/beliefs" },
      { label: "Members", path: "/members" },
      { label: "Message From Elders", path: "/elder" },
      { label: "Message From Pastor", path: "/pastor" },
      { label: "Message From Patrons", path: "/patron" },
    ]
  },
  { label: "Events", path: "/events", icon: <Calendar className="w-4 h-4" /> },
  { label: "Contact", path: "/contact", icon: <Phone className="w-4 h-4" /> },
  { label: "Offering", path: "/offering", icon: <HandHeart className="w-4 h-4" /> },
  { label: "Leaders", path: "/leadership", icon: <Users className="w-4 h-4" /> },
  {
    label: "Evangelism",
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      { label: "Sermons", path: "/sermons" },
      { label: "HomeChurches", path: "/homechurches" },
      { label: "Families", path: "/families" },
      { label: "Choirs", path: "/choirs" },
      { label: "Testmonies", path: "/testimonies" },
      { label: "Baptism", path: "/baptism" },
      { label: "Prayer Requests", path: "/prayers" },
      { label: "Child Dedication", path: "/dedication" },
      { label: "Books", path: "/books" },
    ]
  },
  {
    label: "Others",
    icon: <Megaphone className="w-4 h-4" />,
    children: [
      { label: "Announcements", path: "/announcements" },
      { label: "Prayer Requests", path: "/prayers" },
      { label: "Donations", path: "/donations" },
      { label: "Child Dedication", path: "/dedication" },
      { label: "Suggestions", path: "/suggestions" },
      { label: "Membership Transfer", path: "/transfer" },
      { label: "Admins", path: "https://mmusdaadmin.vercel.app", external: true },
    ]
  },
];

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [activeSubMenu, setActiveSubMenu] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
    setActiveSubMenu(null)
  }

  const renderLink = (item, className = "") => {
    if (item.external) {
      return (
        <a
          href={item.path}
          target="_blank"
          rel="noreferrer"
          className={className}
          onClick={closeMenu}
        >
          {item.label}
        </a>
      )
    }
    return (
      <Link to={item.path} className={className} onClick={closeMenu}>
        {item.label}
      </Link>
    )
  }

  return (
    <>
      <header className="header-ticker">
        <div className="ticker-wrapper">
          <h1 className="main-heading">
            Masinde Muliro University Seventh Day Adventist Church - Welcome to the Light of Truth**
          </h1>
        </div>
      </header>

      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">

          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="logo-img-wrapper">
              <img src={logo1} alt="MMUSDA Logo" />
            </div>
            <span>MMUSDA</span>
          </Link>

          <ul className="nav-links desktop-only">

            {navItems.map((item) => (
              <li key={item.label} className={item.children ? "dropdown" : ""}>

                {item.children ? (
                  <>
                    <button className="nav-link-btn">
                      {item.label}
                      <ChevronDown className="arrow-icon" />
                    </button>

                    <div className="dropdown-content">
                      {item.children.map((child) =>
                        child.external ? (
                          <a key={child.label} href={child.path} target="_blank" rel="noreferrer">
                            {child.label}
                          </a>
                        ) : (
                          <Link key={child.label} to={child.path}>
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  renderLink(item, "nav-link-btn")
                )}

              </li>
            ))}

          </ul>

          <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

        </div>

        <AnimatePresence>

          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mobile-overlay"
                onClick={closeMenu}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="mobile-menu"
              >

                <div className="mobile-menu-header">

                  {activeSubMenu ? (
                    <button
                      onClick={() => setActiveSubMenu(null)}
                      className="back-btn"
                    >
                      <ArrowLeft size={20} />
                      Back
                    </button>
                  ) : (
                    <span className="menu-title">Menu</span>
                  )}

                  <button onClick={closeMenu} className="close-btn">
                    <X size={24} />
                  </button>

                </div>

                <div className="mobile-menu-content">

                  <AnimatePresence mode="wait">

                    {!activeSubMenu ? (
                      <motion.div
                        key="main"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="mobile-links"
                      >

                        {navItems.map((item) => (
                          <div key={item.label} className="mobile-item">

                            {item.children ? (
                              <button
                                className="mobile-link-btn"
                                onClick={() => setActiveSubMenu(item)}
                              >
                                <span className="label-with-icon">
                                  {item.icon}
                                  {item.label}
                                </span>
                                <ChevronRight size={18} />
                              </button>
                            ) : item.external ? (
                              <a
                                href={item.path}
                                target="_blank"
                                rel="noreferrer"
                                className="mobile-link-btn"
                                onClick={closeMenu}
                              >
                                <span className="label-with-icon">
                                  {item.icon}
                                  {item.label}
                                </span>
                              </a>
                            ) : (
                              <Link
                                to={item.path}
                                className="mobile-link-btn"
                                onClick={closeMenu}
                              >
                                <span className="label-with-icon">
                                  {item.icon}
                                  {item.label}
                                </span>
                              </Link>
                            )}

                          </div>
                        ))}

                      </motion.div>
                    ) : (
                      <motion.div
                        key="sub"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="mobile-links"
                      >

                        <div className="submenu-title">
                          {activeSubMenu.label}
                        </div>

                        {activeSubMenu.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.label}
                              href={child.path}
                              target="_blank"
                              rel="noreferrer"
                              className="mobile-link-btn submenu-item"
                              onClick={closeMenu}
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="mobile-link-btn submenu-item"
                              onClick={closeMenu}
                            >
                              {child.label}
                            </Link>
                          )
                        )}

                      </motion.div>
                    )}

                  </AnimatePresence>

                </div>

              </motion.div>
            </>
          )}

        </AnimatePresence>

      </nav>
    </>
  )
}

export default Navbar;