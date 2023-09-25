export const generateUserToken = async (userName: string, roomName: string) => {
  try {
    const response = await fetch("http://localhost:5000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: roomName,
        participantName: userName,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
