// clientA/src/App.js
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
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <a href="http://localhost:8011">Go to Subsystem B</a>
        </div>
      ) : (
        <a href="/api/login">Login</a>
      )}
    </div>
  );
}

export default App;
