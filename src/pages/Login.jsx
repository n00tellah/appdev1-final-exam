import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate(); // ✅ get navigate function
  const SECRET = import.meta.env.VITE_APP_SECRET_PASSWORD;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=3")
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  function handleLogin() {
    const foundUser = users.find(user => user.username === username);

    if (!foundUser) {
      alert("Username not found!");
      return;
    }

    if (password !== SECRET) {
      alert("Incorrect password!");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    // ✅ use navigate instead of window.location.href
    navigate("/todos");
  }

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Enter username (E.g., Bret)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

