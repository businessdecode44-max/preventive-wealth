"use client";

import { useState } from "react";
import { CheckoutButton } from "@/components/CheckoutButton";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Preventive Wealth home" onClick={closeMenu}>
        <span className="brand-mark">PW</span>
        <span>
          <strong>Preventive Wealth</strong>
          <small>Financial Literacy as Prevention</small>
        </span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-nav"
        aria-label="Toggle navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="site-nav" className={`site-nav${isOpen ? " is-open" : ""}`} aria-label="Primary navigation">
        <a href="#series" onClick={closeMenu}>
          eBook Series
        </a>
        <a href="#blog" onClick={closeMenu}>
          Blog
        </a>
        <a href="#videos" onClick={closeMenu}>
          Videos
        </a>
        <a href="#affiliate" onClick={closeMenu}>
          Affiliates
        </a>
        <a href="#checklist" onClick={closeMenu}>
          Free Resource
        </a>
        <CheckoutButton productKey="bundle" productName="Complete Digital Bundle" className="nav-cta button-reset">
          Get Bundle
        </CheckoutButton>
      </nav>
    </header>
  );
}
