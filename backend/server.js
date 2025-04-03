require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./utils/db");
const path = require("path");
const multer = require("multer");
const authRouter = require("./router/auth-router");
const adminRoute = require("./router/admin-router");
const DetailsUser = require("./models/userForm-schema");
const jobRouter = require("./router/jobform-router");

const app = express();

// CORS configuration
const corsOption = {
  origin: "https://alumnisphere.onrender.com/",
  methods: "GET, PUT, POST, PATCH, HEAD, DELETE",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/api/auth/admin", adminRoute);
app.use("/job", jobRouter);

// File upload logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./file");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const {
      name,
      graduationYear,
      phoneNumber,
      address,
      email,
      organization,
      dateOfBirth,
      rollNumber,
      registrationNumber,
      designation,
      department,
    } = req.body;

    if (
      !name ||
      !graduationYear ||
      !phoneNumber ||
      !organization ||
      !dateOfBirth ||
      !rollNumber ||
      !registrationNumber ||
      !designation ||
      !department
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const filePath = req.file.filename;

    const createPdfDetails = await DetailsUser.create({
      name,
      graduationYear,
      phoneNumber,
      address,
      email,
      organization,
      dateOfBirth,
      rollNumber,
      registrationNumber,
      designation,
      department,
      file: filePath,
    });

    console.log("Saved to DB:", createPdfDetails);

    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: `https://alumnisphere.onrender.com/upload-files/file/${filePath}`,
      data: createPdfDetails,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Error uploading file" });
  }
});

// API to get files
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(__dirname, "file", req.params.filename);
  res.sendFile(filePath);
});

// Start server
const PORT = 3000;
ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});