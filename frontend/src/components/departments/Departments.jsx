import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, User, Mail, Sparkles, LayoutGrid } from "lucide-react";
import { fetchDepartments } from "../../Features/departments/departmentsAPI.js";
import "./Departments.css";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await fetchDepartments();
      setDepartments(data);
      setLoading(false);
    };
    loadDepartments();
  }, []);

  const filteredDepts = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <div className="dept-loader-wrapper">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="dept-spinner"
        />
        <p>Loading Ministries...</p>
      </div>
    );
  }

  return (
    <div className="dept-outer-wrapper">
      <div className="dept-page-card">
        <header className="dept-slim-hero">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="slim-hero-content"
          >
            <div className="mini-badge">
              <Sparkles size={16} />
              <span>CHURCH MINISTRIES</span>
            </div>
            <h1 className="slim-title">OUR <span className="highlight">DEPARTMENTS</span></h1>
            
            <div className="dept-search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Find a department..."
                  className="dept-modern-search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </header>

        <div className="dept-content-area">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="dept-intro-stripe"
          >
            <div className="verse-box-modern">
              <p>“For as the body is one and has many members, but all the members of that one body, being many, are one body, so also is Christ.”</p>
              <cite>— 1 Corinthians 12:12</cite>
            </div>
          </motion.section>

          <motion.div className="dept-grid-layout">
            <AnimatePresence mode='popLayout'>
              {filteredDepts.map((dept) => (
                <motion.div
                  layout
                  key={dept.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="dept-glass-card"
                >
                  <div className="dept-card-header">
                    <div className="dept-icon-circle">
                      <LayoutGrid size={20} />
                    </div>
                    <h3>{dept.name}</h3>
                  </div>

                  <p className="dept-card-desc">
                    {dept.description || "Dedicated to serving the community and growing in faith together."}
                  </p>

                  <div className="dept-leader-tag">
                    <div className="leader-avatar-mini">
                      {dept.adminLeader?.charAt(0) || <User size={14} />}
                    </div>
                    <div className="leader-info-text">
                      <span className="leader-role">Head of Dept</span>
                      <span className="leader-name-text">{dept.adminLeader || "Vacant"}</span>
                    </div>
                  </div>

                  <div className="dept-action-row">
                    <div className="contact-pill-modern">
                      <Mail size={14} />
                      <span>{dept.adminContact || "Contact Office"}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredDepts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dept-empty-state">
              <p>No ministries found matching your criteria.</p>
            </motion.div>
          )}
        </div>

        <footer className="dept-bottom-bar">
           <p>“Serve the Lord with gladness; come before His presence with singing.” <span>— Psalm 100:2</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Departments;