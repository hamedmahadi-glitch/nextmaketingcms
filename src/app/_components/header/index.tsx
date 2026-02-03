"use client";

import { ButtonLink } from "@/common/button";
import { DesktopMenu, MobileMenu } from "./navigation-menu";
import { DarkLightImageAutoscale } from "@/common/dark-light-image";

// Mock si Directus ne renvoie rien
const mockHeader = {
  navbar: {
    items: [
      { _id: "1", _title: "Accueil", href: "/", sublinks: { items: [] } },
      { _id: "2", _title: "À propos", href: "/about", sublinks: { items: [] } },
      {
        _id: "3",
        _title: "Services",
        href: "",
        sublinks: {
          items: [
            {
              _id: "3-1",
              _title: "Web",
              link: { __typename: "PageReferenceComponent", link: { page: { pathname: "/services/web", _title: "Web" } } } as any,
            },
            {
              _id: "3-2",
              _title: "Mobile",
              link: { __typename: "PageReferenceComponent", link: { page: { pathname: "/services/mobile", _title: "Mobile" } } } as any,
            },
          ],
        },
      },
    ],
  },
  rightCtas: {
    items: [{ _id: "cta1", label: "Contact", href: "/contact", type: "primary" }],
  },
};

interface HeaderProps {
  headerData?: any; // données de Directus
  settings?: any;   // logo
}

export function Header({ headerData, settings }: HeaderProps) {
  const dataHeader = headerData?.navbar?.items?.length ? headerData : mockHeader;

  return (
    <header className="sticky left-0 top-0 z-50 flex w-full flex-col border-b border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary">
      <div className="flex" style={{ height: "80px" }}>
        <div className="container mx-auto grid w-full grid-cols-header place-items-center content-center items-center px-6">
          {/* Logo */}
          <ButtonLink unstyled className="flex items-center ring-offset-2" href="/">
            <DarkLightImageAutoscale priority {...settings?.logo} />
          </ButtonLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <DesktopMenu {...dataHeader} />
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden">
            <MobileMenu {...dataHeader} />
          </div>
        </div>
      </div>
    </header>
  );
}
