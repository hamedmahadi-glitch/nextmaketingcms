// Stub for basehub/next-toolbar - Toolbar component compatibility shim
import { ReactNode } from "react";

export interface ToolbarProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

// Toolbar component stub
export function Toolbar({ children, className, ...props }: ToolbarProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
