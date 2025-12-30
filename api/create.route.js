import express from "express";
import redis from "./redis.js";
import { nanoid } from "nanoid";
import { now } from "./now.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  // 1️⃣ Validate input
  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content is required" });
  }

  // 2️⃣ Generate ID
  const id = nanoid();

  // 3️⃣ Calculate expiry time
  const expiresAt = ttl_seconds
    ? now(req) + ttl_seconds * 1000
    : null;

  // 4️⃣ Create paste object
  const paste = {
    content,
    expiresAt,
    maxViews: max_views ?? null,
    views: 0
  };

  await redis.set(`paste:${id}`, JSON.stringify(paste));

 
  res.status(201).json({
    id,
    url: `${req.protocol}://${req.get("host")}/p/${id}`
  });
});

export default router;
