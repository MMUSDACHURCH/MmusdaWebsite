import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import youtubeRoutes from "./youtube/youtube.router.js";
import sermonsRouter from "./sermons/sermons.router.js";
import { announcementsRouter } from "./announcements/announcements.router.js";
import { eventsRouter } from "./events/events.router.js";
import { authRouter } from "./auth/auth.router.js";
import { departmentRouter } from "./departments/departments.router.js";
import { contactsRouter } from "./contacts/contacts.router.js";
import { leadersRouter } from "./leaders/leaders.router.js";
import homeChurchesRouter from "./homechurches/homechurches.router.js";
import familiesRouter from "./families/families.router.js";
import choirsRouter from "./choirs/choirs.router.js";
import prayerRouter from "./prayerRequest/prayerRequest.router.js";
import { membersRouter } from "./members/members.router.js";
import { suggestionsRouter } from "./suggestions/suggestions.router.js";
import offeringsRouter from "./offering/offering.router.js";
import offeringDetailsRouter from "./offeringDetails/offeringDetails.router.js";
import { AdminsRouter } from "./admins/admins.router.js";
import testimoniesRouter from "./testimonies/testimonies.router.js";
import dedicationsRouter from "./dedications/dedications.router.js";
import eldersRouter from "./elders/elders.router.js";
import pastorsRouter from "./pastors/pastors.router.js";
import patronsRouter from "./patrons/patrons.router.js";
import subscribeRouter from "./subscribe/subscribe.router.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://mmusda.vercel.app",
  "https://mmusdaadmin.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/sermons", sermonsRouter);
app.use("/youtube", youtubeRoutes);
app.use("/api/prayer-requests", prayerRouter);
app.use("/api/announcements", announcementsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/leaders", leadersRouter);
app.use("/api/homechurches", homeChurchesRouter);
app.use("/api/families", familiesRouter);
app.use("/api/choirs", choirsRouter);
app.use("/api/members", membersRouter);
app.use("/api/suggestions", suggestionsRouter);
app.use("/api/offerings", offeringsRouter);
app.use("/api/offeringsdetails", offeringDetailsRouter);
app.use("/api/admins", AdminsRouter);
app.use("/api/testimonies", testimoniesRouter);
app.use("/api/dedications", dedicationsRouter);
app.use("/api/elders", eldersRouter);
app.use("/api/pastors", pastorsRouter);
app.use("/api/patrons", patronsRouter);
app.use("/api", subscribeRouter);

app.get("/", (req, res) =>
  res.send(
    "MKUU HAPA NI BACKEND, HUWEZI ONA KITU INAFANYIKA, MAYBE UTUHACK WHICH HUWEZI, SISI NDO SIFUNA!!!!!"
  )
);

app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({ error: "CORS policy restriction" });
  } else {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;