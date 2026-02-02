/**
 * Shim de compatibilité pour BaseHub → Directus
 * Fournit des stubs pour éviter les erreurs d'import
 * 
 * Cette approche permet de conserver les composants existants
 * sans les modifier, en attendant une migration progressive vers Directus
 */

// Re-export des composants Next.js standards
export { Image as BaseHubImage } from "next/image";

// Stub fragmentOn pour éviter les erreurs
export function fragmentOn(typename: string, fields: any) {
  return { __typename: typename, ...fields };
}

// Stub Pump pour éviter les erreurs
export function Pump({ children, queries }: any) {
  return null;
}

// Stub RichText
export function RichText({ content }: any) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export type RichTextProps = {
  content: string;
};
