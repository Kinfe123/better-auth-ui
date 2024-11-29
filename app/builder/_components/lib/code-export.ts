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
      console.log("THIS IS replacemnt tho: ", replacement);
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
