import { ReactNode } from "react";

export interface PumpProps {
  fallback?: ReactNode;
  children?: ReactNode | ((data: any) => Promise<ReactNode>);
  queries?: any[];
}

export async function Pump({ children, fallback }: PumpProps) {
  if (typeof children === "function") {
    try {
      return await children([]);
    } catch {
      return fallback;
    }
  }
  return <>{children ?? fallback}</>;
}
