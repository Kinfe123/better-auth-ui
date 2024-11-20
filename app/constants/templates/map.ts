import {
  forgetPasswordSnippet,
  PassKeySnippet,
  remeberMeSnippet,
} from "./file";

export const commentMap: Record<string, string> = {
  socialProviders: `socialProviders: {
  }
 `,
  forgetPassword: forgetPasswordSnippet,
  comment: '<div className="comment-placeholder"></div>',
  rememberMe: remeberMeSnippet,
  empty: `
   \n

  `,
  passKey: PassKeySnippet,
  github: `
      github: {
           clientId: process.env.GITHUB_CLIENT_ID!,
           clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
  `,
  google: `
      google: {
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
  `,
  facebook: `
      facebook: {
           clientId: process.env.FACEBOOK_CLIENT_ID as string,
           clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      },
  `,
  twitch: `
      twitch: {
           clientId: process.env.TWITCH_CLIENT_ID as string,
           clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
       },
  `,
  twitter: `
      twitter: {
           clientId: process.env.TWITTER_CLIENT_ID as string,
           clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      },
    `,
  apple: `
        apple: {
             clientId: process.env.APPLE_CLIENT_ID as string,
             clientSecret: process.env.APPLE_CLIENT_SECRET as string,
         },
    `,
  microsoft: `
      microsoft: {
            clientId: process.env.MICROSOFT_CLIENT_ID as string,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      },
      `,
  discord: `
       discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      },
      `,
};
export const routeMap = {
  forgetPassword: "/app/forget-password/page.tsx",
  resetassword: "/app/reset-password/page.tsx",
};
