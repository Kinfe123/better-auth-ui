"use client";
import { CodeBlock } from "react-code-block";
import { themes } from "prism-react-renderer";
import BottomToolbar from "../bottom-toolbar";
export const CodeSnippet = ({
  code,
  language = "jsx",
  lang = "ts",
}: {
  code: string;
  language?: string;
  lang?: string;
}) => {
  return (
    <pre className="relative">
      <CodeBlock code={code} language={language} theme={themes.oneDark}>
        <div>
          <CodeBlock.Code className="bg-transparent !p-4 text-xs rounded-xl dark:shadow-lg whitespace-pre overflow-y-scroll h-[70vh] max-h-[70vh]">
            <div className="table-row">
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
              <CodeBlock.LineContent className="table-cell">
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </div>
          </CodeBlock.Code>
        </div>
      </CodeBlock>
      <BottomToolbar lang={lang} />
    </pre>
  );
};
