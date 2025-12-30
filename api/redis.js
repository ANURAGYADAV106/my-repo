import dotenv from "dotenv";
dotenv.config(); // 

import { Redis } from "@upstash/redis";

console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL);

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  console.error("Upstash env variables missing");
  process.exit(1);
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

console.log("Redis connected");

export default redis;
