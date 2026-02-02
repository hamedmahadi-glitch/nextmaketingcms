"use client";

import { CodeBlock, type Language, createCssVariablesTheme } from "basehub/react-code-block";

import { fragmentOn } from "basehub";

import { CopyButton } from "./copy-button";
import { languagesIcons } from "./language";
import { FileIcon } from "@radix-ui/react-icons";
import s from "./code-snippet.module.scss";

const theme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});

export const codeSnippetFragment = fragmentOn("CodeSnippetComponent", {
  _id: true,
  code: {
    code: true,
    language: true,
  },
  _title: true,
});

export type CodeSnippetFragment = {
  _id: string;
  code: { code: string; language: string };
  _title: string;
};

export function CodeSnippet({ code, _id, _title = "Untitled" }: CodeSnippetFragment) {
  const language = (code.language || "text") as Language;

  return (
    <div className={s["code-snippet"]}>
      <CodeBlock
        childrenTop={
          <header className={s.header}>
            <div className="flex items-center">
              <span className="mr-2 size-4">
                {languagesIcons[language] ?? <FileIcon />}
              </span>
              <span className="text-text-secondary dark:text-dark-text-secondary">{_title}</span>
            </div>
            <CopyButton />
          </header>
        }
        components={{
          div: ({ children, ...rest }: any) => (
            <div className={s.content} {...rest}>
              {children}
            </div>
          ),
        }}
        lineNumbers={{ className: "line-indicator" }}
        snippets={[{ code: code.code, language: language, id: _id }]}
        theme={theme}
      />
    </div>
  );
}
