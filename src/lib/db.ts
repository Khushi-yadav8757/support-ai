import { setServers } from "node:dns";
import type { Connection } from "mongoose";

setServers(["1.1.1.1"]);

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is missing in .env.local");
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
};

const cache = globalWithMongoose.mongoose ??= {
  conn: null,
  promise: null,
};

function logMongoError(error: unknown) {
  const message =
    error instanceof Error
      ? error.message.replace(/mongodb(?:\+srv)?:\/\/[^\s"'<>]+/gi, "[REDACTED_MONGODB_URI]")
      : "Unknown MongoDB error";
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : undefined;

  console.error("MongoDB connection failed:", {
    name: error instanceof Error ? error.name : "UnknownError",
    code,
    message,
  });
}

const connectDb = async () => {
  if (cache.conn?.readyState === 1) {
    return cache.conn;
  }

  if (cache.conn?.readyState === 2 && cache.promise) {
    return cache.promise;
  }

  cache.conn = null;
  cache.promise = null;

  cache.promise = import("mongoose")
    .then(({ connect }) => connect(mongoUrl))
    .then((mongoose) => mongoose.connection);

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (error) {
    cache.conn = null;
    cache.promise = null;
    logMongoError(error);
    throw error;
  }
};

export default connectDb;
