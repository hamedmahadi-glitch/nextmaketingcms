"use client";
// Stub for basehub/react-code-block/client - Client-side code block utilities

// useCopyToClipboard hook stub
export function useCopyToClipboard() {
  return {
    copy: async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return false;
      }
    },
    isCopied: false,
  };
}
