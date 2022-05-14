const express = require("express");
const app = express();
const port = 3001;
const carsRouter = require("./routes/cars");
const cors = require("cors");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({
  origin: ["http://localhost:3001"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/api/carsRouter", carsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});