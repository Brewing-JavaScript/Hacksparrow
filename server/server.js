import express from "express";
import mongoose from "mongoose";
import path from "path";
import { v2 } from "cloudinary";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";
import multer from "multer";
import "dotenv/config";
import cron from "node-cron";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./schema/UserSchems.js";
import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import puppeteer from "puppeteer";
import { AssemblyAI } from "assemblyai";
const server = express();

server.use(express.json());
server.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyCvf6GdLaxRKR8-5RscFksqV1jrKlo-zNc");

let PORT = 8000;

mongoose.connect(
  "mongodb+srv://varad:varad6862@cluster0.0suvvd6.mongodb.net/hacksparrow",
  {
    autoIndex: true,
  }
);



const sendEmail = async function (data, user) {
  console.log("varad");
  const transporter = nodemailer.createTransport({
    // host:process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    host: "smtp.elasticemail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fakeacc6862@gmail.com",

      pass: "47E85993DC7394854F4E87B9F47289D636F1",
    },
  });

  const emailTemplate = "";

  await transporter.sendMail({
    // from: process.env.SMPT_FROM_HOST ,
    from: "fakeacc6862@gmail.com",
    to: user,
    subject: "new placement offer from your college",
    html: emailTemplate,
  });
};
const sendEmail2 = async function (data, user) {
  console.log("varad");
  const transporter = nodemailer.createTransport({
    // host:process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    host: "smtp.elasticemail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fakeacc6862@gmail.com",

      pass: "47E85993DC7394854F4E87B9F47289D636F1",
    },
  });

  const emailTemplate = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Congratulations!</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              margin-bottom: 30px;
          }
          .header h1 {
              color: #333;
          }
          .message {
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 5px;
              text-align: center;
          }
          .message h2 {
              color: #007bff;
              margin-bottom: 10px;
          }
          .signature {
              margin-top: 30px;
              text-align: center;
          }
          .signature p {
              margin: 5px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Congratulations!</h1>
          </div>
          <div class="message">
              <h2>You are hired!</h2>
              <p>We are thrilled to inform you that you have been hired at [Company Name].</p>
              <p>Welcome to the team! We look forward to working with you and achieving great success together.</p>
          </div>
          <div class="signature">
              <p>Best regards,</p>
              <p>${data}</p>
             
          </div>
      </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    // from: process.env.SMPT_FROM_HOST ,
    from: "fakeacc6862@gmail.com",
    to: user,
    subject: "new placement offer from your college",
    html: emailTemplate,
  });
};

// function myTask() {
//   console.log("Cron job is running...");
// }

// // Schedule a cron job to run myTask every minute
// cron.schedule("* 0 * * * *", myTask);

const formatDataToSend = (user) => {
  const access_token = jwt.sign(
    {
      id: user._id,
    },
    "varad177"
  );

  return {
    access_token,
    email: user.email,
    username: user.username,
    _id: user._id,
    status: user.status,
  };
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      error: "no access token",
    });
  }

  jwt.verify(token, "varad177", (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "access token invalid",
      });
    }

    req.user = user.id;
    next();
  });
};

// config cloudinary
v2.config({
  cloud_name: "do8ji7uqc",
  api_key: "738935516257416",
  api_secret: "DX5PLGdpT-OBOxYhTlq6l5vCNxY",
});

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    cb(null, true);
  },
});

//server creates above

//all routes come below

server.post("/signup", async (req, res) => {
  const { username, email, password, country } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({ username, email, password, country });
    return newUser.save().then((u) => {
      return res.status(200).json(formatDataToSend(u));
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if the user exists with the provided email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the stored password

    if (user.password != password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json(formatDataToSend(user));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//compony routes

//gemini

server.post("/google", async (req, res) => {
  const { prompt } = req.body;

  console.log(prompt);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return res.status(200).json(text);
});

server.post("/news", async (req, res) => {
  const { country = "in", cat: category, pageSize = 6 } = req.body;
  console.log(category);
  // const apiKey = "c6016f699894412bbf4a510194f7787b";
  const apiKey = "720f8330961644819519fcbb2766699a";
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=1&pageSize=${pageSize}`;

  try {
    const response = await axios.get(url);
    console.log(response.data); // Log the response data

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({
      error: "Unable to fetch news",
    });
  }
});

server.post("/detail-news", async (req, res) => {
  try {
    const { currentUrl } = req.body;
    // Fetch the HTML content of the article using axios
    const articleHtml = await axios.get(currentUrl);

    // Create a DOM object from the article HTML using JSDOM
    const dom = new JSDOM(articleHtml.data, {
      url: "https://sportstar.thehindu.com/", // Provide a valid URL here if needed
    });

    // Parse the article content using Readability
    const article = new Readability(dom.window.document).parse();

    // Send the parsed article content as JSON response
    return res.status(200).json({ article });
  } catch (error) {
    console.error("Error fetching or parsing the article:", error);
    return res.status(500).json({
      error: "Unable to fetch or parse the article",
    });
  }
});

server.post("/speech-to-text", async (req, res) => {
  const { transcription } = req.body; // Assuming the transcribed text is sent in the request body

  // Extract color name from the transcription
  const colorName = extractColorName(transcription);

  if (!colorName) {
    return res
      .status(400)
      .json({ error: "No color name found in the transcription" });
  }

  console.log(colorName);
  return res.status(200).json({ colorName });
});

function extractColorName(text) {
  // Logic to extract color name from the text (you can use regex or any other method)
  const colorNames = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "black",
    "white",
  ];
  const words = text.toLowerCase().split(" ");
  for (const word of words) {
    if (colorNames.includes(word)) {
      return word;
    }
  }
  return null; // Return null if no color name is found
}

const client = new AssemblyAI({
  apiKey: "255d5603d3394e408f18ab3b618920e5",
});

const audioUrl =
  "https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3";

// Assuming you have an Express app instance
server.post("/update-cats", async (req, res) => {
  const { cats, _id: userId } = req.body;

  try {
    // Find the user by userId and update the 'cats' field with the new categories
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { cats: cats } }, // Using $set to replace existing categories with new categories
      { new: true }
    );

    if (!updatedUser) {
      // Handle case where user is not found
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user categories:", error);
    res.status(500).json({ error: "Could not update user categories" });
  }
});

server.post("/get-cats", async (req, res) => {
  try {
    const { _id } = req.body;

    const users = await User.findById(_id);

    return res.status(200).json(users.cats);
  } catch (error) {
    console.log(error.message);
  }
});

server.listen(PORT, () => {
  console.log(`listing on ${PORT}`);
});

// https://newsapi.org/v2/everything?q=tesla&from=2024-02-22&sortBy=publishedAt&apiKey=API_KEY

// https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=API_KEY
