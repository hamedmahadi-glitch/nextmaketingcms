import { Header } from "@/components/Header";
import { Pump } from "basehub/react-pump";

// mock logos si besoin
const defaultSettings = {
  logo: {
    dark: { url: "/logo-dark.png", alt: "Logo Dark", width: 100, height: 40, aspectRatio: 2.5, blurDataURL: "" },
    light: { url: "/logo-light.png", alt: "Logo Light", width: 100, height: 40, aspectRatio: 2.5, blurDataURL: "" },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // fetch Directus
  const [data] = await Pump([
    {
      site: {
        header: {}, // headerFragment ou tes queries
        settings: defaultSettings,
      },
    },
  ]);

  const headerData = data?.site?.header ?? undefined;
  const settings = data?.site?.settings ?? defaultSettings;

  return (
    <html lang="fr">
      <body>
        <Header headerData={headerData} settings={settings} />
        <main className="min-h-[calc(100svh-80px)]">{children}</main>
      </body>
    </html>
  );
}
