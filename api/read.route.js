import express from "express";
import redis from "./redis.js";
import { now } from "./now.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await redis.get(`paste:${id}`);
    console.log("RAW REDIS DATA:", data);

    if (!data) {
      return res.status(404).send("Paste not found or expired");
    }

    
    const paste = typeof data === "string" ? JSON.parse(data) : data;

    if (!paste || !paste.content) {
      return res.status(500).send("Corrupted paste data");
    }

    
    if (paste.expiresAt && now() > paste.expiresAt) {
      await redis.del(`paste:${id}`);
      return res.status(404).send("Paste expired");
    }

    
    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      await redis.del(`paste:${id}`);
      return res.status(404).send("Paste view limit exceeded");
    }

    
    paste.views += 1;
    await redis.set(`paste:${id}`, paste); 

    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Paste</title></head>
        <body>
          <h2>Your Paste</h2>
          <pre>${paste.content}</pre>
        </body>
      </html>
    `);

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
