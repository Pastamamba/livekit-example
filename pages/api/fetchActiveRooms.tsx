export const fetchActiveRooms = async () => {
  try {
    const response = await fetch("http://localhost:5000/listRooms");
    return await response.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};
