import { router } from "../trpc";
import { answersRouter } from "./answer";

export const appRouter = router({
  answers: answersRouter,
});

export type AppRouter = typeof appRouter;
