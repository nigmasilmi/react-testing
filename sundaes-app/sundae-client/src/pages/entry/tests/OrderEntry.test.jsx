import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../../mocks/server";

import OrderEntry from "../OrderEntry";

describe("OrderEntry", () => {
  it("handles error for scoops and toppings routes", async () => {
    // overriding handlers
    const scoopsGetError = () => {
      return rest.get("http://localhost:3030/scoops", (_, res, ctx) => {
        res(ctx.status(500));
      });
    };
    const toppingsGetError = () => {
      return rest.get("http://localhost:3030/toppings", (_, res, ctx) => {
        res(ctx.status(500));
      });
    };
    server.resetHandlers(scoopsGetError, toppingsGetError);

    //

    render(<OrderEntry />);
    const alerts = await screen.findAllByRole("alert", {
      name: "An unexpected error ocurred. Please try again later",
    });

    expect(alerts).toHaveLength(2);
  });
});
