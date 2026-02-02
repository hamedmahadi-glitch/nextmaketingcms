import { ReactNode } from "react";

export interface RichTextProps {
  content?: any;
  children?: ReactNode;
  className?: string;
  components?: Record<string, any>;
  blocks?: any[];
  [key: string]: any;
}

export function RichText({ content, children, className, blocks, components }: RichTextProps) {
  return (
    <div className={className}>
      {children || content}
    </div>
  );
}
