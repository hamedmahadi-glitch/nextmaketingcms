// Stub for basehub/react-code-block - Code block component compatibility shim
import { ReactNode } from "react";

export type Language = string;

export interface CodeBlockProps {
  code: string;
  language?: Language;
  className?: string;
  theme?: any;
  children?: ReactNode;
  [key: string]: any;
}

// CodeBlock component stub
export function CodeBlock({
  code,
  language = "javascript",
  className,
  ...props
}: CodeBlockProps) {
  return (
    <pre className={className} {...props}>
      <code>{code}</code>
    </pre>
  );
}

// createCssVariablesTheme stub
export function createCssVariablesTheme(config?: any) {
  return {
    name: "default",
    colors: {},
  };
}
