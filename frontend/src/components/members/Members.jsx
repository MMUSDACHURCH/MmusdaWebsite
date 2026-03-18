import { useState } from "react";
import { createMember } from "../../Features/members/membersAPI";
import { UserPlus, MapPin, Mail, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import "./Members.css";

const Members = () => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const memberData = {
        name: formData.name,
        areaOfResidence: formData.area,
        email: formData.email,
        phone: formData.phone,
      };
      const newMember = await createMember(memberData);
      setMessage({
        type: "success",
        text: `Welcome ${newMember.name}! You have been registered successfully.`,
      });
      setFormData({ name: "", area: "", email: "", phone: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Registration failed: " + err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="members-page-wrapper">
      <div className="members-card">
        <div className="members-header">
          <div className="accent-bar"></div>
          <h2 className="members-title">Membership Form</h2>
          <p className="members-subtitle">Fill in your details to join the MMUSDA community</p>
        </div>

        <form onSubmit={handleSubmit} className="members-form">
          <div className="form-section">
            <label>Full Name</label>
            <div className="input-group">
              <UserPlus className="input-icon" size={18} />
              <input
                name="name"
                type="text"
                placeholder="e.g. Johnathan Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <label>Current Residence</label>
            <div className="input-group">
              <MapPin className="input-icon" size={18} />
              <input
                name="area"
                type="text"
                placeholder="e.g. Nairobi, Westlands"
                value={formData.area}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-section">
              <label>Email Address</label>
              <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-section">
              <label>Phone Number</label>
              <div className="input-group">
                <Phone className="input-icon" size={18} />
                <input
                  name="phone"
                  type="tel"
                  placeholder="e.g. +254 700 000 000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spinner" size={18} />
                Registering...
              </>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>

        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;