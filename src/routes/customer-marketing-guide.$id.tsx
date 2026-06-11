import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/customer-marketing-guide/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/marketing/$id", params: { id: params.id } });
  },
});
