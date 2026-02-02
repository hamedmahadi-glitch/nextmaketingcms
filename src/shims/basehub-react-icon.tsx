"use client";

import { ReactNode } from "react";

export interface IconProps {
  name?: string;
  size?: number | string;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

export function Icon({
  name,
  size = 24,
  className,
  children,
  ...props
}: IconProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: typeof size === "string" ? size : `${size}px`,
        height: typeof size === "string" ? size : `${size}px`,
      }}
      {...props}
    >
      {children || name}
    </span>
  );
}
