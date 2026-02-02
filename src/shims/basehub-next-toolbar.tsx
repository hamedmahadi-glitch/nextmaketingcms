"use client";

import { ReactNode, useEffect, useState } from "react";

export interface ToolbarProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

type SiteSettings = {
  title?: string;
  description?: string;
  [key: string]: any;
};

export function Toolbar({ children, className, ...props }: ToolbarProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch("/api/directus/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setSettings(data || null);
      })
      .catch((err) => {
        console.error("Failed to load Directus site settings:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={className} {...props}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {settings?.title ? <strong>{settings.title}</strong> : null}
        {children}
      </div>
    </div>
  );
}
