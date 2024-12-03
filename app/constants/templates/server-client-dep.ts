export const server_dep: Record<string, string[]> = {
  passKey: [
    "passKeyClient",
    "passKeyServerImport",
    "passKeyClientImport",
    "passKeyServer",
  ],
  magicLink: [
    "magicLinkClient",
    "magicLinkServerImport",
    "magicLinkClientImport",
    "magicLinkServer",
    "magicLinkAction",
  ],
  email: ["signInAction"],
  rememberMe: ["rememberMeState"],
};
