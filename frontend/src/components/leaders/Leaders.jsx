import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllLeaders, fetchLeadersByRole } from "../../Features/leaders/leadersAPI";
import { Search, User, ShieldCheck, Phone, Info } from "lucide-react";
import "./Leaders.css";

export default function Leaders() {
  const [leaders, setLeaders] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const loadLeaders = async () => {
    setLoading(true);
    try {
      const allLeaders = await fetchAllLeaders();
      setLeaders(allLeaders);
    } catch (error) {
      console.error("Failed to load leaders:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchByRole = async () => {
    setLoading(true);
    try {
      if (!role.trim()) {
        await loadLeaders();
      } else {
        const filteredLeaders = await fetchLeadersByRole(role);
        setLeaders(filteredLeaders);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaders();
  }, []);

  return (
    <div className="leaders-page-wrapper">
      <div className="leaders-container">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="leaders-header"
        >
          <div className="title-underline">
            <h1 className="title-interactive">MMUSDA CHURCH LEADERS</h1>
            <div className="line-animated"></div>
          </div>
          <p className="subtitle-interactive">Committed to service, anchored in faith.</p>
        </motion.header>

        <section className="quotes-grid">
          {[
            { q: "Obey your leaders and submit to them, for they are keeping watch over your souls.", c: "Hebrews 13:17" },
            { q: "The greatest among you shall be your servant.", c: "Matthew 23:11" },
            { q: "Where there is no guidance, a people falls, but in an abundance of counselors there is safety.", c: "Proverbs 11:14" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="quote-card-interactive"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <span className="quote-icon">“</span>
              <p>"{item.q}"</p>
              <cite>– {item.c}</cite>
            </motion.div>
          ))}
        </section>

        <div className="search-section">
          <div className="search-bar-interactive">
            <input
              type="text"
              placeholder="Search by role (e.g., Elder, Deacon)..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchByRole()}
            />
            <button className="search-btn-glow" onClick={searchByRole}>
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>

        <div className="content-area">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="loader-container"
              >
                <div className="spinner-dynamic"></div>
                <p className="loading-text">Fetching leadership data...</p>
              </motion.div>
            ) : leaders.length > 0 ? (
              <motion.div 
                key="table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="table-wrapper-glass"
              >
                <table className="leaders-table-interactive">
                  <thead>
                    <tr>
                      <th><div className="th-content"><User size={16} /> Name</div></th>
                      <th><div className="th-content"><ShieldCheck size={16} /> Department</div></th>
                      <th><div className="th-content"><Info size={16} /> Role</div></th>
                      <th><div className="th-content"><Phone size={16} /> Contact</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaders.map((leader, index) => (
                      <motion.tr 
                        key={leader.leaderId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="name-cell-interactive" data-label="Name">
                          <div className="avatar-bounce">{leader.name.charAt(0)}</div>
                          <span className="leader-name-text">{leader.name}</span>
                        </td>
                        <td data-label="Department">
                          <span className="badge-interactive dept-blue">{leader.department || "General"}</span>
                        </td>
                        <td data-label="Role">
                          <span className="badge-interactive role-orange">{leader.role || "Officer"}</span>
                        </td>
                        <td className="contact-cell-interactive" data-label="Contact">
                          {leader.contactInfo || "—"}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <div className="empty-icon-float">🕊️</div>
                <h3>No Leaders Found</h3>
                <button onClick={loadLeaders} className="reset-btn-interactive">View All Leaders</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}