/**
 * Shim principal pour basehub
 * Réexporte tous les shims et fournit les exports de base
 */

import Image from "next/image";

export { Image as BaseHubImage };
export { Pump } from "./basehub-react-pump";
export { RichText, type RichTextProps } from "./basehub-react-rich-text";
export { sendEvent, parseFormData } from "./basehub-events";

// Stub fragmentOn pour éviter les erreurs
export function fragmentOn(typename: string, fields: any) {
  return { __typename: typename, ...fields };
}

// Stub pour basehub() query function
export function basehub(options?: any) {
  return {
    query: (q: any) => Promise.resolve({}),
  };
}
