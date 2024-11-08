export async function setAuthCookie(token: string) {
  try {
    const response = await fetch("/api/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to set cookie");
    }
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
}

export async function removeAuthCookie() {
  try {
    const response = await fetch("/api/remove-cookie", {
      method: "POST",
      credentials: "include", // Include credentials for cookies
    });

    if (!response.ok) {
      throw new Error("Failed to remove cookie");
    }
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
}
