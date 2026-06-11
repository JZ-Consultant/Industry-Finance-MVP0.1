import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/customer-marketing-guide/")({
  beforeLoad: () => {
    throw redirect({ to: "/marketing" });
  },
});
