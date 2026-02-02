/**
 * Shim pour basehub/react-rich-text
 * Fournit stub pour RichText
 */

export const RichText = ({ content, children, components }: any) => {
  return children || content;
};

export type RichTextProps = {
  content?: string;
  children?: React.ReactNode;
  components?: Record<string, any>;
};
