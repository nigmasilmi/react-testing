import { render, screen } from "@testing-library/react";
import Options from "../Options";

describe("Options", () => {
  it("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages.length).toBe(2);
  });

  it("has the correct alt text for the images", async () => {
    render(<Options optionType="scoops" />);

    // confirm alt text of images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
});
