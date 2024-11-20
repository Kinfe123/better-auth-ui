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

  jsxString = removeEmptyLines(jsxString);
  return jsxString;
}

function removeEmptyLines(inputString: string) {
  return inputString.replace(/^\s*[\r\n]/gm, "");
}
