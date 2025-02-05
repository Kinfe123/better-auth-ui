export const actionUIDep: Record<string, any> = {
  google: {
    continue: ["googleContinueUI", "google_env"],
    pure: ["googleUI", "google_env"],
  },
  apple: {
    continue: ["appleContinueUI", "apple_env"],
    pure: ["appleUI", "apple_env"],
  },
  github: {
    continue: ["githubContinueUI", "github_env"],
    pure: ["githubUI", "github_env"],
  },
  discord: {
    continue: ["discordContinueUI", "discord_env"],
    pure: ["discordUI", "discord_env"],
  },
  microsoft: {
    continue: ["microsoftContinueUI", "microsoft_env"],
    pure: ["microsoftUI", "microsoft_env"],
  },
  facebook: {
    continue: ["facebookContinueUI", "facebook_env"],
    pure: ["facebookUI", "facebook_env"],
  },
  dropbox: {
    continue: ["dropboxContinueUI", "dropbox_env"],
    pure: ["dropboxUI", "dropbox_env"],
  },
  spotify: {
    continue: ["spotifyContinueUI", "spotify_env"],
    pure: ["spotifyUI", "spotify_env"],
  },
  gitlab: {
    continue: ["gitlabContinueUI", "gitlab_env"],
    pure: ["gitlabUI", "gitlab_env"],
  },
  linkedin: {
    continue: ["linkedinContinueUI", "linkedin_env"],
    pure: ["linkedinUI", "linkedin_env"],
  },
  twitter: {
    continue: ["twitterContinueUI", "twitter_env"],
    pure: ["twitterUI", "twitter_env"],
  },
  twitch: {
    continue: ["twitchContinueUI", "twitch_env"],
    pure: ["twitchUI", "twitch_env"],
  },
  better_auth_secret: {
    continue: ["better_auth_secret_env"],
    pure: ["better_auth_secret_env"],
  },
};
export const credentialDep: Record<string, string[]> = {
  enabled: ["passwordInput", "passwordState", "loadingState"],
};
