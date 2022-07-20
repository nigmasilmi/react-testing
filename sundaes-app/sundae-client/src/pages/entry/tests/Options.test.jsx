import { render, screen } from "@testing-library/react";
import Options from "../Options";

describe("Options", () => {
  it("displays image for each scoop option from server", () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLenght(2);
  });

  it("has the correct alt text for the images", () => {
    render(<Options optionType="scoops" />);

    // confirm alt text of images
    const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
});
