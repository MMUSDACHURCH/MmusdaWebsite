import { APIDomain } from "../../utils/APIDomain";

export const fetchSermons = async () => {
  try {
    const response = await fetch(`${APIDomain}/sermons/all`);

    if (!response.ok) {
      throw new Error("Failed to fetch sermons");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return [];
  }
};

export const createSermon = async (sermonData) => {
  try {
    const response = await fetch(`${APIDomain}/sermons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sermonData),
    });

    if (!response.ok) {
      throw new Error("Failed to create sermon");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating sermon:", error);
    throw error;
  }
};

export const updateSermon = async (id, sermonData) => {
  try {
    const response = await fetch(`${APIDomain}/sermons/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sermonData),
    });

    if (!response.ok) {
      throw new Error("Failed to update sermon");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating sermon:", error);
    throw error;
  }
};

export const deleteSermon = async (id) => {
  try {
    const response = await fetch(`${APIDomain}/sermons/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete sermon");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting sermon:", error);
    throw error;
  }
};