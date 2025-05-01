// lib/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware"; // Updated import
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const auth = lucia({
  adapter: prisma(client),
  env: process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEV",
  middleware: nextjs_future(), // Updated middleware
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      displayName: data.displayName,
      avatarUrl: data.avatarUrl
    };
  }
});

export type Auth = typeof auth;