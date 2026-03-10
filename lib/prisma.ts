import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString =
  process.env.DATABASE_URL || "postgresql://localhost:5432/sefton_coast_network?schema=public";

const adapter = new PrismaNeon({ connectionString });

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter } as never);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
