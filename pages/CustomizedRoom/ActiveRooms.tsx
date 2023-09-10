// ActiveRooms.tsx
/** This component, ActiveRooms, is designed to display a list of currently active rooms.
 * It fetches the list of rooms from a backend server and displays each room's name
 * along with the number of participants in that room. Additionally, it provides a
 * refresh button to manually update the list of rooms.
 */

import { useState, useEffect } from "react";

const ActiveRooms = () => {
  // State for rooms and loading status
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/listRooms");
      const data = await response.json();
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setLoading(false);
    }
  };

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div
      style={{
        color: "black",
        width: "400px",
        margin: "20px auto",
        textAlign: "center",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1>Active rooms {rooms.length}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        rooms.map((room) => (
          <div
            key={room.roomName}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #d0d0d0",
              borderRadius: "5px",
              background: "#f5f5f5",
            }}
          >
            <span>{room.roomName}</span>
            <span>{room.numParticipants}</span>
          </div>
        ))
      )}
      <button
        onClick={fetchRooms}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          background: "#007BFF",
          color: "white",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#007BFF")}
      >
        Refresh
      </button>
    </div>
  );
};

export default ActiveRooms;
