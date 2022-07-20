import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../../mocks/server";

import OrderEntry from "../OrderEntry";

describe("OrderEntry", () => {
  it.only("handles error for scoops and toppings routes", async () => {
    const scoopRError = () => {
      return rest.get("http://localhost:3030/scoops", (_, res, ctx) => {
        res(ctx.status(500));
      });
    };

    const toppingRError = () => {
      return rest.get("http://localhost:3030/scoops", (_, res, ctx) => {
        res(ctx.status(500));
      });
    };
    // server.resetHandlers(
    //   rest.get("http://localhost:3030/scoops", (_, res, ctx) => {
    //     return res(ctx.status(500));
    //   }),
    //   rest.get("http://localhost:3030/toppings", (_, res, ctx) => {
    //     return res(ctx.status(500));
    //   })
    // );
    server.resetHandlers(scoopRError, toppingRError);
    //a

    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });
});
