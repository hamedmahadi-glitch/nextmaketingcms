"use client";

import { ButtonLink } from "@/common/button";
import { Pump } from "basehub/react-pump";
import { buttonFragment } from "@/lib/basehub/fragments";
import { fragmentOn } from "basehub";
import { DesktopMenu, MobileMenu } from "./navigation-menu";
import { DarkLightImageAutoscale } from "@/common/dark-light-image";

// =================== Mock Header ===================
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
    items: [
      { _id: "cta1", label: "Contact", href: "/contact", type: "primary" },
    ],
  },
};

// =================== Header Fragment ===================
const headerLinksFragment = fragmentOn("HeaderNavbarLinkComponent", {
  _title: true,
  href: true,
  _id: true,
  sublinks: {
    items: {
      _id: true,
      _title: true,
      link: {
        __typename: true,
        on_CustomTextComponent: { text: true },
        on_PageReferenceComponent: { page: { pathname: true, _title: true } },
      },
    },
  },
});

export type HeaderLiksFragment = fragmentOn.infer<typeof headerLinksFragment>;

export const headerFragment = fragmentOn("Header", {
  navbar: { items: headerLinksFragment },
  rightCtas: { items: buttonFragment },
});

export type HeaderFragment = fragmentOn.infer<typeof headerFragment>;

// =================== Header Component ===================
export async function Header() {
  return (
    <Pump
      queries={[
        {
          site: {
            header: headerFragment,
            settings: {
              logo: {
                dark: { url: "/logo-dark.png", alt: "Logo Dark", width: 100, height: 40, aspectRatio: 2.5, blurDataURL: "" },
                light: { url: "/logo-light.png", alt: "Logo Light", width: 100, height: 40, aspectRatio: 2.5, blurDataURL: "" },
              },
            },
          },
        },
      ]}
    >
      {([data]) => {
        // Si header vide ou navbar vide → fallback mock
        const headerData =
          data?.site?.header?.navbar?.items?.length ? data.site.header : mockHeader;
        const settings = data.site.settings;

        return (
          <header className="sticky left-0 top-0 z-100 flex w-full flex-col border-b border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary">
            <div className="flex" style={{ height: "80px" }}>
              <div className="container mx-auto grid w-full grid-cols-header place-items-center content-center items-center px-6">
                {/* Logo */}
                <ButtonLink unstyled className="flex items-center ring-offset-2" href="/">
                  <DarkLightImageAutoscale priority {...settings.logo} />
                </ButtonLink>

                {/* Desktop Menu */}
                <div className="hidden lg:flex">
                  <DesktopMenu {...headerData} />
                </div>

                {/* Mobile Menu */}
                <div className="flex lg:hidden">
                  <MobileMenu {...headerData} />
                </div>
              </div>
            </div>
          </header>
        );
      }}
    </Pump>
  );
}
