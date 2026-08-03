import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"] as string,
  },
  studio: {
    adapter: async () => {
      const connectionString = process.env["DATABASE_URL"] as string;
      return new PrismaPg({ connectionString });
    },
  },
});