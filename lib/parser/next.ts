import { EnabledComponent } from "../store";
import { importAndDistructureCleanup } from "@/app/builder/_components/lib/code-export";
import {
  credentialDep,
  actionUIDep,
} from "@/app/constants/templates/ui-function-dep";
import { anyBool } from "../utils";
import { serverClientDep } from "@/app/constants/templates/server-client-dep";
import { stateMap } from "@/app/constants/templates/state";
import { parserTokenMap } from "@/app/constants/templates/map";
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
    .filter(([comment, enabled]) => enabled)
    .map((curr) => curr[0]);

  socialEnabledLists = socialEnabledLists.length
    ? ["socialProviders"].concat(socialEnabledLists)
    : socialEnabledLists;

  Object.keys(actionUIDep).map((dep) => {
    if (socialEnabledLists.includes(dep)) {
      socialEnabledLists = [...socialEnabledLists, ...actionUIDep[dep]];
    }
  });
  console.log({ socialEnabledLists });
  let otherEnabledLists = Object.entries(enabledComp.otherSignIn)
    .filter(([comment, enabled]) => enabled)
    .map((curr) => curr[0]);
  // addng otherSignInOptions and the dependencies
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
    cleanedJsx = importAndDistructureCleanup(
      "noDistructure",
      content,
      otherEnabledLists.length === 0,
    );
    cleanedJsx = importAndDistructureCleanup(
      "noLists",
      cleanedJsx,
      otherEnabledLists.length === 0,
    );
    cleanedJsx = parseTokens(listsOfComments, cleanedJsx, {
      eraseAll: false,
    });

    cleanedJsx = parseTokens(replacableLists, cleanedJsx, {
      eraseAll: true,
    });

    console.log({ cleanedJsx });
  }
  return cleanedJsx;
};
