/**
 * Shim principal pour basehub
 * Réexporte tous les shims et fournit les exports de base
 */

import Image from "next/image";

export { Image as BaseHubImage };
export { Pump } from "./basehub-react-pump";
export { RichText, type RichTextProps } from "./basehub-react-rich-text";
export { sendEvent, parseFormData } from "./basehub-events";
export { useSearch, SearchBox, type Hit } from "./basehub-react-search";
export { Icon, type IconProps } from "./basehub-react-icon";
export { Toolbar, type ToolbarProps } from "./basehub-next-toolbar";
export { CodeBlock, createCssVariablesTheme, type Language, type CodeBlockProps } from "./basehub-react-code-block";

// Namespace for fragmentOn to support fragmentOn.infer pattern
export namespace fragmentOn {
  export type infer<T> = T extends { __typename: string; [key: string]: any }
    ? Omit<T, "__typename">
    : any;
}

// Function version for actual fragment creation
export function fragmentOn(typename: string, fields: any) {
  return { __typename: typename, ...fields };
}

// Stub for basehub() query function
export function basehub(options?: any) {
  return {
    query: (q: any) => Promise.resolve({}),
  };
}
