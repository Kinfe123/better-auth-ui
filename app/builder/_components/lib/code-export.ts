import { commentMap } from "@/app/constants/templates/map";

export function replaceCommentsWithJSX(
  commentsArray: string[],
  jsxString: string,
  { eraseAll = false }: { eraseAll?: boolean },
) {
  commentsArray.forEach((commentLabel) => {
    const commentRegex = new RegExp(`//\\s*${commentLabel}\\s*$`, "gm");
    let replacement = "";
    if (!eraseAll) {
      replacement = commentMap[commentLabel] || "";
    }
    jsxString = jsxString.replace(commentRegex, replacement);
  });
  jsxString = removeEmptyLines(jsxString, commentsArray);
  return jsxString;
}

function removeEmptyLines(inputString: string, commentsArray: string[]) {
  let result = inputString.replace(/^\s*[\r\n]/gm, "");
  const commentRegex = new RegExp(`//\\s*newLine\\s*$`, "gm");
  const replacement = commentMap["newLine"];
  result = result.replace(commentRegex, replacement);
  return result;
}
export function removeLinesWithNope(inputString: string) {
  const regex = /(?:.*\n)?.*nope.*\n?.*\n/g;
  return inputString.replace(regex, "");
}
export function importAndDistructureCleanup(
  input: string,
  condition: boolean,
): string {
  const lines = input.split("\n");

  const noImportIndex = lines.findIndex((line) =>
    line.includes("// noDistructure"),
  );
  if (noImportIndex !== -1) {
    if (condition) {
      lines.splice(noImportIndex, 5);
    } else {
      lines.splice(noImportIndex, 1);
    }
  }
  return lines.join("\n");
}
