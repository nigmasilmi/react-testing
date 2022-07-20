import { render, screen } from "@testing-library/react";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
describe("Scoop Options", () => {
  it("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages.length).toBe(2);
  });

  it("has the correct alt text for the images", async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // confirm alt text of images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
});

describe("Toppings options", () => {
  it("displays image for toppings fetched from the server", async () => {
    render(<Options optionType="toppings" />, {
      wrapper: OrderDetailsProvider,
    });

    // find images
    const topImages = await screen.findAllByRole("img", { name: /topping$/i });
    expect(topImages.length).toBeGreaterThan(1);
  });

  it("has the correct images alt text", async () => {
    render(<Options optionType="toppings" />, {
      wrapper: OrderDetailsProvider,
    });

    const topImages = await screen.findAllByRole("img", { name: /topping$/i });

    const altTexts = topImages.map((img) => img.alt);
    expect(altTexts).toEqual([
      "M&Ms topping",
      "Hot fudge topping",
      "Peanut butter cups topping",
    ]);
  });
});
