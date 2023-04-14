import { type PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { prisma } from "./db";

type CreateContextOptions = {
  prisma?: PrismaClient;
};

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    prisma: opts.prisma || prisma,
  };
};

export const createContext = () => {
  return createInnerTRPCContext({
    prisma,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
