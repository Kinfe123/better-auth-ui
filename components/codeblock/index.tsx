"use client";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";
import { themes } from "prism-react-renderer";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CodeSnippet = ({
  code,
  language = "jsx",
}: {
  code: string;
  language?: string;
}) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(code);
  };
  const trimmed = code.replace(/^[  \t]{0,}/gm, "");
  return (
    <div className="relative">
      <CodeBlock code={code} language={language} theme={themes.oneDark}>
        <div>
          <CodeBlock.Code className="bg-transparent !p-4 text-sm rounded-xl shadow-lg whitespace-pre overflow-y-scroll max-h-[70vh]">
            <div className="table-row">
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
              <CodeBlock.LineContent className="table-cell">
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </div>
          </CodeBlock.Code>
        </div>
      </CodeBlock>

      {/* <Button
        variant="link"
        className="absolute top-2 right-2"
        onClick={copyCode}
      >
        {state.value ? (
          <ClipboardCheck className="text-white h-4 w-4" />
        ) : (
          <Clipboard className="text-white h-4 w-4" />
        )}
      </Button> */}
    </div>
  );
};
