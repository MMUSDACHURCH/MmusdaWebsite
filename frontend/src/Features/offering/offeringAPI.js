import { APIDomain } from "../../utils/APIDomain";

export async function createOffering(data) {
  const response = await fetch(`${APIDomain}/api/offerings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create offering");
  }

  const result = await response.json();
  return result.offering;
}