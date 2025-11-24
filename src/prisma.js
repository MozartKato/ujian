import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "laravel",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "examdb",
  connectionLimit: 5,
});

const adapter = new PrismaMariaDb(pool);
export const prisma = new PrismaClient({ adapter });
