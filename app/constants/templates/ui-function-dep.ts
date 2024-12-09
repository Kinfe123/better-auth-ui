export const actionUIDep: Record<string, any> = {
  google: {
    continue: ["googleContinueUI"],
    pure: ["googleUI"],
  },
  apple: {
    continue: ["appleContinueUI"],
    pure: ["appleUI"],
  },
  github: {
    continue: ["githubContinueUI"],
    pure: ["githubUI"],
  },
  discord: {
    continue: ["discordContinueUI"],
    pure: ["discordUI"],
  },
  microsoft: {
    continue: ["microsoftContinueUI"],
    pure: ["microsoftUI"],
  },
  facebook: {
    continue: ["facebookContinueUI"],
    pure: ["facebookUI"],
  },
  dropbox: {
    continue: ["dropboxContinueUI"],
    pure: ["dropboxUI"],
  },
  spotify: {
    continue: ["spotifyContinueUI"],
    pure: ["spotifyUI"],
  },
  gitlab: {
    continue: ["gitlabContinueUI"],
    pure: ["gitlabUI"],
  },
  linkedin: {
    continue: ["linkedinContinueUI"],
    pure: ["linkedinUI"],
  },
  twitter: {
    continue: ["twitterContinueUI"],
    pure: ["twitterUI"],
  },
};
export const credentialDep: Record<string, string[]> = {
  enabled: ["passwordInput", "passwordState", "loadingState"],
};
export const socialDepResolver = () => {};
