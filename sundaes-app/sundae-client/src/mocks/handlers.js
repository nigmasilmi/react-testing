import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (_, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "images/chocolate.jpg" },
        { name: "Vanilla", imagePath: "images/vanilla.jpg" },
      ])
    );
  }),

  rest.get("http://localhost:3030/toppings", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "M&Ms",
          imagePath: "/images/m-and-ms.png",
        },
        {
          name: "Hot fudge",
          imagePath: "/images/hot-fudge.png",
        },
        {
          name: "Peanut butter cups",
          imagePath: "/images/peanut-butter-cups.png",
        },
      ])
    );
  }),

  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 1234 }));
  }),
];
