import React from "react";
import { render, screen } from "@testing-library/react";

import Navbar from "components/layout-elements/Navbar";

describe("Navbar", () => {
  test("renders the Navbar component with default props", () => {
    const items = [
      { key: "home", label: "Home", link: "/home" },
      { key: "about", label: "About", link: "/about" },
      { key: "services", label: "Services", link: "/services" },
      { key: "contact", label: "Contact", link: "/contact" },
    ];
    const className = "bg-blue-100 rounded-none";

    render(<Navbar items={items} className={className} color="blue" data-testid="navbar" />);
    const navbarElement = screen.getByRole("navigation");
    const secondDiv = screen.getByTestId("navbar");
    expect(navbarElement).toBeTruthy();

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeTruthy();

    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toBeTruthy();

    const servicesLink = screen.getByRole("link", { name: "Services" });
    expect(servicesLink).toBeTruthy();

    const contactLink = screen.getByRole("link", { name: "Contact" });
    expect(contactLink).toBeTruthy();

    expect(secondDiv.className).toContain(className);
    expect(navbarElement.className).toBeTruthy();
  });
});
