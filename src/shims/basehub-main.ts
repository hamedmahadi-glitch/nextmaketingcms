/**
 * Shim principal pour basehub
 * Réexporte tous les shims et fournit les exports de base
 */

export { Image as BaseHubImage } from "next/image";
export { Pump } from "./basehub-react-pump";
export { RichText, type RichTextProps } from "./basehub-react-rich-text";
export { sendEvent, parseFormData } from "./basehub-events";
export { useSearch, SearchBox, type Hit } from "./basehub-react-search";
    query: (q: any) => Promise.resolve({}),
  };
}
