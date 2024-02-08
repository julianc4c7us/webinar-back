import express, { Router } from "express";
import cors from "cors";

const app = express();

const routes = Router();

const publicRoutes = Router();

const privateRoutes = Router();

publicRoutes.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

privateRoutes.get("/", (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized");
  }

  try {
    res.send("Private route");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

routes.use("/public", publicRoutes);
routes.use("/private", privateRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.use("/api/health", (req, res) => {
  res.send("ok");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
