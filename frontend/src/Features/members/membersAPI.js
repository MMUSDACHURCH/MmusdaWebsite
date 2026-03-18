import { APIDomain } from "../../utils/APIDomain";

export async function createMember(memberData) {
  try {
    const response = await fetch(`${APIDomain}/api/members/`, { // add /api
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create member");
    }

    const newMember = await response.json();
    return newMember;
  } catch (err) {
    console.error("Error creating member:", err.message);
    throw err;
  }
}