import "dotenv/config";
import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.Database_URL,
  ssl: { rejectUnauthorized: false }
});

const db = drizzle(pool);

async function seed() {
  try {
    await db.insert(schema.admins).values([
      { fullName: "Emmanuel Mose", email: "emmanuelmose806@gmail.com" },
      { fullName: "Emmanuel Ongera", email: "emmanuelmose10204@gmail.com" },
    ]);

    await db.insert(schema.members).values([
      { name: "John Doe", email: "john@example.com", areaOfResidence: "Nairobi" },
      { name: "Jane Smith", email: "jane@example.com", areaOfResidence: "Mombasa" },
      { name: "Mark Johnson", email: "mark@example.com", areaOfResidence: "Kisumu" },
      { name: "Emily Brown", email: "emily@example.com", areaOfResidence: "Eldoret" },
      { name: "Michael White", email: "michael@example.com", areaOfResidence: "Nakuru" }
    ]);

    await db.insert(schema.departments).values([
      { name: "Music", description: "Music department", adminLeader: "Admin One", assistant: "Assistant One", adminContact: "music@example.com" },
      { name: "Evangelism", description: "Evangelism department", adminLeader: "Admin Two", assistant: "Assistant Two", adminContact: "evangelism@example.com" },
      { name: "Youth", description: "Youth ministry", adminLeader: "Admin Three", assistant: "Assistant Three", adminContact: "youth@example.com" },
      { name: "Health", description: "Health department", adminLeader: "Admin Four", assistant: "Assistant Four", adminContact: "health@example.com" },
      { name: "Education", description: "Education department", adminLeader: "Admin Five", assistant: "Assistant Five", adminContact: "education@example.com" }
    ]);

    await db.insert(schema.events).values([
      { title: "Annual Day", description: "Annual celebration", eventDate: new Date(), photo: Buffer.from("") },
      { title: "Bible Camp", description: "Youth camp", eventDate: new Date(), photo: Buffer.from("") },
      { title: "Charity Drive", description: "Helping the community", eventDate: new Date(), photo: Buffer.from("") },
      { title: "Concert", description: "Music concert", eventDate: new Date(), photo: Buffer.from("") },
      { title: "Retreat", description: "Spiritual retreat", eventDate: new Date(), photo: Buffer.from("") }
    ]);

    await db.insert(schema.contacts).values([
      { name: "Alice", email: "alice@example.com", phone: "1234567890", message: "Hello" },
      { name: "Bob", email: "bob@example.com", phone: "2345678901", message: "Inquiry" },
      { name: "Charlie", email: "charlie@example.com", phone: "3456789012", message: "Question" },
      { name: "David", email: "david@example.com", phone: "4567890123", message: "Support" },
      { name: "Eve", email: "eve@example.com", phone: "5678901234", message: "Feedback" }
    ]);

    await db.insert(schema.sermons).values([
      { title: "Faith", sermonDate: new Date(), videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", description: "On faith" },
      { title: "Hope", sermonDate: new Date(), videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", description: "On hope" },
      { title: "Love", sermonDate: new Date(), videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", description: "On love" },
      { title: "Patience", sermonDate: new Date(), videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", description: "On patience" },
      { title: "Prayer", sermonDate: new Date(), videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", description: "On prayer" }
    ]);

    await db.insert(schema.choirs).values([
      { name: "Choir 1", description: "Description 1", leaderName: "Leader 1", videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", choirPhoto: Buffer.from(""), membersCount: 20 },
      { name: "Choir 2", description: "Description 2", leaderName: "Leader 2", videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", choirPhoto: Buffer.from(""), membersCount: 15 },
      { name: "Choir 3", description: "Description 3", leaderName: "Leader 3", videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", choirPhoto: Buffer.from(""), membersCount: 25 },
      { name: "Choir 4", description: "Description 4", leaderName: "Leader 4", videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", choirPhoto: Buffer.from(""), membersCount: 10 },
      { name: "Choir 5", description: "Description 5", leaderName: "Leader 5", videoUrl: "https://youtu.be/J8KJmCR3Ssg?si=QB7g2MLq3QQiqG3o", choirPhoto: Buffer.from(""), membersCount: 30 }
    ]);

    await db.insert(schema.announcements).values([
      { title: "Announcement 1", description: "Description 1", createdBy: 1 },
      { title: "Announcement 2", description: "Description 2", createdBy: 2 },
      { title: "Announcement 3", description: "Description 3", createdBy: 3 },
      { title: "Announcement 4", description: "Description 4", createdBy: 4 },
      { title: "Announcement 5", description: "Description 5", createdBy: 5 }
    ]);

    await db.insert(schema.homechurches).values([
      { name: "Homechurch 1", leaderName: "Leader 1", location: "Location 1" },
      { name: "Homechurch 2", leaderName: "Leader 2", location: "Location 2" },
      { name: "Homechurch 3", leaderName: "Leader 3", location: "Location 3" },
      { name: "Homechurch 4", leaderName: "Leader 4", location: "Location 4" },
      { name: "Homechurch 5", leaderName: "Leader 5", location: "Location 5" }
    ]);

    await db.insert(schema.families).values([
      { familyName: "Family 1", headOfFamily: "Head 1", contactInfo: "contact1@example.com" },
      { familyName: "Family 2", headOfFamily: "Head 2", contactInfo: "contact2@example.com" },
      { familyName: "Family 3", headOfFamily: "Head 3", contactInfo: "contact3@example.com" },
      { familyName: "Family 4", headOfFamily: "Head 4", contactInfo: "contact4@example.com" },
      { familyName: "Family 5", headOfFamily: "Head 5", contactInfo: "contact5@example.com" }
    ]);

    await db.insert(schema.prayerRequests).values([
      { firstName: "John", lastName: "Doe", phoneNumber: "0712345678", title: "Prayer 1", description: "Description 1", requestedBy: 1, isPublic: "yes" },
      { firstName: "Jane", lastName: "Smith", phoneNumber: null, title: "Prayer 2", description: "Description 2", requestedBy: 2, isPublic: "yes" },
      { firstName: "Peter", lastName: "Johnson", phoneNumber: "0723456789", title: "Prayer 3", description: "Description 3", requestedBy: 3, isPublic: "yes" },
      { firstName: "Mary", lastName: "Williams", phoneNumber: null, title: "Prayer 4", description: "Description 4", requestedBy: 4, isPublic: "yes" },
      { firstName: "David", lastName: "Brown", phoneNumber: "0734567890", title: "Prayer 5", description: "Description 5", requestedBy: 5, isPublic: "no" }
    ]);

    await db.insert(schema.leaders).values([
      { name: "Leader 1", department: "Music", contactInfo: "leader1@example.com", role: "Senior Leader" },
      { name: "Leader 2", department: "Evangelism", contactInfo: "leader2@example.com", role: "Assistant Leader" },
      { name: "Leader 3", department: "Youth", contactInfo: null, role: "Coordinator" },
      { name: "Leader 4", department: "Health", contactInfo: null, role: "Head" },
      { name: "Leader 5", department: "Education", contactInfo: "leader5@example.com", role: "Director" }
    ]);
    await db.insert(schema.suggestions).values([
  {
    name: "Anonymous Member",
    contactNumber: "0712345678",
    message: "I think we should start midweek Bible study."
  },
  {
    name: null,
    contactNumber: null,
    message: "Please improve the sound system during services."
  },
  {
    name: "Grace Mwangi",
    contactNumber: "0798765432",
    message: "Consider adding more youth programs."
  }
]);
await db.insert(schema.offerings).values([
  {
    phoneNumber: "0711111111",
    name: "John Kamau",
    amount: 500,
    purpose: "Tithe"
  },
  {
    phoneNumber: "0722222222",
    name: "Mary Wanjiku",
    amount: 1200,
    purpose: "Church Building Fund"
  },
  {
    phoneNumber: "0733333333",
    name: "Peter Otieno",
    amount: 300,
    purpose: "Youth Ministry Support"
  }
]);
await db.insert(schema.offeringDetails).values({
  name: "Emmanuel Mose",
  phoneNumber: "254718146250"
});

    console.log("Seeding complete!");
    await pool.end();
  } catch (err) {
    console.error(err);
    await pool.end();
  }
}

seed();