const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = require("./data/users.json");

// Validate username
app.post("/api/validate-username", (req, res) => {
  const { username } = req.body;
  const available = !users.some(u => u.username === username);
  const suggestions = available ? [] : [username + "1", username + "_2025"];
  res.json({ available, suggestions });
});

// Submit form
app.post("/api/submit-form", (req, res) => {
  const { fullName, email, username, password, phone, department } = req.body;

  // Basic validation
  if (!email.includes("@") || password.length < 8) {
    return res.json({
      success: false,
      errors: {
        email: "Invalid email format",
        password: "Password too weak"
      }
    });
  }

  // Save to JSON file
  users.push({ fullName, email, username, phone, department });
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));

  res.json({ success: true, message: "Account stored successfully!" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
