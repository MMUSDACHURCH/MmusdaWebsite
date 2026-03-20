import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllLeaders, fetchLeadersByRole } from "../../Features/leaders/leadersAPI";
import { Search, User, ShieldCheck, Phone, Info, Quote } from "lucide-react";
import "./Leaders.css";

export default function Leaders() {
  const [leaders, setLeaders] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const loadLeaders = async () => {
    setLoading(true);
    try {
      const allLeaders = await fetchAllLeaders();
      setLeaders(allLeaders || []);
    } catch (error) {
      console.error(error);
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
        setLeaders(filteredLeaders || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaders();
  }, []);

  return (
    <div className="events-master-container">
      <section className="dynamic-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-text-content"
        >
          <h1 className="glitch-title">CHURCH LEADERS</h1>
          <p className="hero-tagline">Serving with Integrity & Faith</p>
        </motion.div>

        <div className="search-portal">
          <div className="search-glass-card">
            <Search className="inner-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by role (e.g. Elder, Deacon)..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchByRole()}
            />
            <button className="details-circle-btn" onClick={searchByRole} style={{width: 'auto', padding: '0 20px', borderRadius: '100px'}}>
              Search
            </button>
          </div>
        </div>
      </section>

      <main className="events-content-wrapper">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="verse-interactive-box"
        >
          <Quote className="quote-accent" size={40} />
          <p>“The greatest among you shall be your servant.”</p>
          <span className="bible-reference">Matthew 23:11</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <div className="loading-state-container">
              <div className="main-loader"></div>
              <p>Fetching Leadership...</p>
            </div>
          ) : leaders.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="table-responsive-wrapper"
            >
              <table className="modern-leaders-table">
                <thead>
                  <tr>
                    <th><User size={16} /> Name</th>
                    <th><ShieldCheck size={16} /> Department</th>
                    <th><Info size={16} /> Role</th>
                    <th><Phone size={16} /> Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {leaders.map((leader, index) => (
                    <motion.tr 
                      key={leader.leaderId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td data-label="Name">
                        <div className="leader-identity">
                          <div className="avatar-circle">{leader.name.charAt(0)}</div>
                          <span className="leader-name-bold">{leader.name}</span>
                        </div>
                      </td>
                      <td data-label="Department">
                        <span className="status-pill dept">{leader.department || "General"}</span>
                      </td>
                      <td data-label="Role">
                        <span className="status-pill role">{leader.role || "Officer"}</span>
                      </td>
                      <td data-label="Contact" className="contact-text">
                        {leader.contactInfo || "N/A"}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="null-state">
              <span>No Results</span>
              <p>Try searching for a different role</p>
              <button className="show-more-btn" onClick={loadLeaders}>Reset View</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}