import { EnabledComponent } from "../store";
import { importAndDistructureCleanup } from "@/app/builder/_components/lib/code-export";
import {
  credentialDep,
  actionUIDep,
} from "@/app/constants/templates/ui-function-dep";
import { anyBool } from "../utils";
import { serverClientDep } from "@/app/constants/templates/server-client-dep";
import { stateMap } from "@/app/constants/templates/state";
import { parserTokenMap } from "@/app/constants/templates/tokenMap";
import { parseTokens } from "@/app/builder/_components/lib/code-export";
export const parsedNextContent = (
  content: string,
  enabledComp: EnabledComponent,
) => {
  let listsOfComments = Object.entries(enabledComp.additionals)
    .filter(([comment, enabled]) => enabled.visiblity)
    .map((curr) => curr[0]);
  const credentialLists =
    enabledComp.credentials.enabled &&
    !anyBool([enabledComp.otherSignIn.magicLink as boolean])
      ? credentialDep["enabled"]
      : [];
  let socialEnabledLists = Object.entries(enabledComp.socials)
    .filter(([_, enabled]) => enabled)
    .map((curr) => curr[0]);
  const socialCount = socialEnabledLists.length;
  socialEnabledLists = socialEnabledLists.length
    ? ["socialProviders"].concat(socialEnabledLists)
    : socialEnabledLists;
  Object.keys(actionUIDep).map((dep) => {
    if (socialEnabledLists.includes(dep)) {
      const currSocialUIVariant = socialCount <= 3 ? "continue" : "pure";
      socialEnabledLists = [
        ...socialEnabledLists,
        ...actionUIDep[dep][currSocialUIVariant],
      ];
    }
  });
  let otherEnabledLists = Object.entries(enabledComp.otherSignIn)
    .filter(([_, enabled]) => enabled)
    .map((curr) => curr[0]);
  // adding otherSignInOptions and the dependencies
  Object.keys(serverClientDep).map((dep) => {
    if (otherEnabledLists.includes(dep)) {
      otherEnabledLists = [...otherEnabledLists, ...serverClientDep[dep]];
    }
  });

  if (enabledComp.credentials.email && !enabledComp.otherSignIn.magicLink) {
    listsOfComments = [...listsOfComments, ...stateMap["email"]];
  }
  Object.keys(stateMap).map((state) => {
    if (listsOfComments.includes(state)) {
      listsOfComments = [...listsOfComments, ...stateMap[state]];
    }
  });
  console.log({ otherEnabledLists, listsOfComments });
  listsOfComments = [
    "empty",
    ...otherEnabledLists,
    ...listsOfComments,
    ...socialEnabledLists,
    ...credentialLists,
  ];
  let cleanedJsx = "";
  const replacableLists = Object.keys(parserTokenMap);

  if (listsOfComments.length === 1) {
    cleanedJsx = parseTokens(replacableLists, content, {
      eraseAll: true,
    });
  } else {
    /*
    cleaning up import distructuring at the top of the file if not used in file

    e.g
    import {
    } from "better-auth/plugins"

    - will be converted to empty string since it is useless putting it there
    */
    cleanedJsx = importAndDistructureCleanup(
      "noDistructure",
      content,
      otherEnabledLists.length === 0,
    );

    /*
    cleaning up lists like plugin if not imported in a file

    e.g
    plugins: [
    ]
    - will be converted to empty string since it is useless putting it there
    */
    cleanedJsx = importAndDistructureCleanup(
      "noLists",
      cleanedJsx,
      otherEnabledLists.length === 0,
    );
    /*

    parse all token which is '//' and build a string using it using a tokenMap.ts file

    */
    cleanedJsx = parseTokens(listsOfComments, cleanedJsx, {
      eraseAll: false,
    });

    cleanedJsx = parseTokens(replacableLists, cleanedJsx, {
      eraseAll: true,
    });
  }
  return cleanedJsx;
};
