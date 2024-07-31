// clientB/src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/user", { withCredentials: true }).then((response) => {
      setUser(response.data.user);
    });
  }, []);

  return (
    <div>
      {user ? (
        <h1>Welcome to Subsystem B, {user.displayName}</h1>
      ) : (
        <a href="/api/login">Login</a>
      )}
    </div>
  );
}

export default App;
