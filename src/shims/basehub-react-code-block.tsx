"use client";

import { ReactNode } from "react";

export type Language = string;

export interface CodeBlockProps {
  code?: string;
  language?: Language;
  className?: string;
  theme?: any;
  children?: ReactNode;
  childrenTop?: ReactNode;
  lineNumbers?: any;
  snippets?: any[];
  components?: any;
  [key: string]: any;
}

export function CodeBlock({
  code,
  language = "javascript",
  className,
  children,
  childrenTop,
  ...props
}: CodeBlockProps) {
  return (
    <pre className={className} {...props}>
      {childrenTop}
      <code>{code || children}</code>
    </pre>
  );
}

export function createCssVariablesTheme(config?: any) {
  return {
    name: "default",
    colors: {},
  };
}
