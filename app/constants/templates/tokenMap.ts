import {
  forgetPasswordSnippet,
  MagicLinkClientImport,
  MagicLinkClientSnippet,
  MagicLinkServerImport,
  MagicLinkServerSnippet,
  PassKeyClientImport,
  PassKeyClientSnippet,
  PassKeyServerImport,
  PassKeyServerSnippet,
  PassKeySnippet,
  remeberMeSnippet,
} from "./file";

export const parserTokenMap: Record<string, string> = {
  socialProviders: `socialProviders: {
  }
 `,
  forgetPassword: forgetPasswordSnippet,
  comment: '<div className="comment-placeholder"></div>',
  rememberMe: remeberMeSnippet,
  rememberMeState: `
  const [rememberMe, setRememberMe] = useState(false);
    `,
  loadingState: `
  const [loading, setLoading] = useState(false);
    `,
  passwordState: `
  const [password, setPassword] = useState("");
        `,
  rememberMeValue: `
                      rememberMe`,
  empty: `// newLine`,
  newLine: `
 \n
 \n
  `,
  passKey: PassKeySnippet,
  passKeyServerImport: PassKeyServerImport,
  passKeyClientImport: PassKeyClientImport,
  passKeyServer: PassKeyServerSnippet,
  magicLinkServerImport: MagicLinkServerImport,
  magicLinkServer: MagicLinkServerSnippet,
  magicLinkClient: MagicLinkClientSnippet,
  magicLinkClientImport: MagicLinkClientImport,
  passKeyClient: PassKeyClientSnippet,
  passwordInput: `
            <div className="grid gap-2">
                <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="password"
                    placeholder="Password"
                />
            </div>
  `,
  rememberMeUI: `
           <div className="flex items-center gap-2">
                <Checkbox
                    onClick={() => {
                        setRememberMe(!rememberMe);
                    }}
                />
               <Label>Remember me</Label>
            </div>
  `,

  signInAction: `
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={async () => {
                  await client.signin.email(
                      {
                        email: email,
                        password: password,
                        callbackURL: "/dashboard",
                        // rememberMeValue
                      },
                      {
                      onRequest: () => {
                        setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                  }
                );
              }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
          </Button> `,
  magicLinkAction: `
            <Button
                type="submit"
                className="w-full"
                onClick={async () => {
                    await client.signin.magicLink({ email })
                }}
              >
              Sign-in with Magickey
          </Button>

    `,
  googleUI: `
            <Button
                variant="outline"
                className="gap-2 py-4 flex-1"
                onClick={async () => {
                    await client.signIn.social({
                        provider: "google"
                    })
                }}
            >
              Google
            </Button>
  `,

  googleContinueUI: `
              <Button
                  variant="outline"
                  className="gap-2 flex-1 w-full py-4"
                  onClick={async () => {
                      await client.signIn.social({
                          provider: "google"
                      })
                  }}
              >
                Continue with Google
              </Button>
    `,

  githubUI: `
          <Button
                variant="outline"
                className="gap-2 py-4 flex-1"
                onClick={async () => {
                     await client.signIn.social({
                     provider: "Github"
                })
             }}
            >
              Github
           </Button>
   `,
  githubContinueUI: `
          <Button
                variant="outline"
                className="gap-2 flex-1 w-full py-4"
                onClick={async () => {
                   await client.signIn.social({
                      provider: "Github"
                })
             }}
               >
                 Continue with Github
              </Button>
      `,
  twitterUI: `
          <Button
                variant="outline"
                className="gap-2 py-4 flex-1"
                onClick={async () => {
                    await client.signIn.social({
                    provider: "twitter"
                   })
                >
                  Twitter
          </Button>
         `,

  twitterContinueUI: `
                <Button
                    variant="outline"
                    className="gap-2 flex-1 w-full py-4"
                    onClick={async () => {
                        await client.signIn.social({
                            provider: "twitter"
                    })
                  >
                   Continue with Twitter
              </Button>
                  `,
  appleUI: `
          <Button
                variant="outline"
                className="gap-2 py-4 flex-1"
                onClick={async () => {
                    await client.signIn.social({
                    provider: "apple"
                })
               >
                Apple
         </Button>
      `,
  appleContinueUI: `
                <Button
                      variant="outline"
                      className="gap-2 flex-1 w-full py-4"
                      onClick={async () => {
                          await client.signIn.social({
                             provider: "apple"
                      })
                     >
                      Continue with Apple
               </Button>
            `,
  discordUI: `
          <Button
                 variant="outline"
                 className="gap-2 py-4 flex-1"
                 onClick={async () => {
                      await client.signIn.social({
                         provider: "discord"
                  })
                >
               Discord
          </Button>
         `,

  discordContinueUI: `
                 <Button
                     variant="outline"
                     className="gap-2 flex-1 w-full py-4"
                     onClick={async () => {
                        await client.signIn.social({
                           provider: "discord"
                     })
                      >
                      Continue with Discord
                 </Button>
                  `,
  twitchUI: `
              <Button
                     variant="outline"
                     className="gap-2 py-4 flex-1"
                     onClick={async () => {
                        await client.signIn.social({
                          provider: "twitch"
                      })
                      >
                          Twitch
                  </Button>
                                    `,
  twitchContinueUI: `
              <Button
                  variant="outline"
                  className="gap-2 flex-1 w-full py-4"
                  onClick={async () => {
                      await client.signIn.social({
                        provider: "twitch"
                  })
                 >
                  Continue with Twitch
              </Button>
                                                      `,
  facebookUI: `
            <Button
                variant="outline"
                className="gap-2 py-4 flex-1"
                onClick={async () => {
                    await client.signIn.social({
                       provider: "facebook"
                 })
               >
                  Facebook
            </Button>
                  `,

  facebookContinueUI: `
               <Button
                    variant="outline"
                    className="gap-2 flex-1 w-full py-4"
                    onClick={async () => {
                        await client.signIn.social({
                          provider: "facebook"
                    })
                  >
                  Continue with Facebook
                </Button>
                                    `,
  microsoftUI: `
          <Button
              variant="outline"
              className="gap-2 py-4 flex-1"
              onClick={async () => {
                  await client.signIn.social({
                      provider: "microsoft"
                })
               >
                 Microsoft
          </Button>
                  `,

  microsoftContinueUI: `
                <Button
                    variant="outline"
                    className="gap-2 flex-1 w-full py-4"
                    onClick={async () => {
                        await client.signIn.social({
                            provider: "microsoft"
                    })
                >
                   Continue with Microsoft
               </Button>
                                    `,
  linkedinUI: `
           <Button
               variant="outline"
               className="gap-2 py-4 flex-1"
               onClick={async () => {
                  await client.signIn.social({
                      provider: "linkedin"
                 })
              >
                LinkedIn
            </Button>
                                  `,
  linkedinContinueUI: `
                <Button
                    variant="outline"
                    className="gap-2 flex-1 w-full py-4"
                    onClick={async () => {
                        await client.signIn.social({
                            provider: "linkedin"
                    })
                  >
                      Continue with LinkedIn
                  </Button>
                                                                    `,
  gitlabUI: `
            <Button
                variant="outline"
                className="gap-2 py-4 flex-1"
                onClick={async () => {
                    await client.signIn.social({
                        provider: "gitlab"
                  })
               >
                    Gitlab
            </Button>
                                    `,

  gitlabContinueUI: `
                <Button
                    variant="outline"
                    className="gap-2 flex-1 w-full py-4"
                    onClick={async () => {
                        await client.signIn.social({
                           provider: "gitlab"
                    })
                >
                 Continue with Gitlab
              </Button>
                                                                      `,
  dropboxUI: `
            <Button
                variant="outline"
                className="gap-2 py-4 flex-1"
                onClick={async () => {
                    await client.signIn.social({
                        provider: "dropbox"
                })
              >
                   Dropbox
            </Button>
                                  `,
  dropboxContinueUI: `
                <Button
                    variant="outline"
                    className="gap-2 flex-1 w-full py-4"
                    onClick={async () => {
                        await client.signIn.social({
                            provider: "dropbox"
                    })
                >
                  Continue with Dropbox
              </Button>
                                                                    `,
  spotifyUI: `
            <Button
                variant="outline"
                className="gap-2 py-4 flex-1"
                onClick={async () => {
                    await client.signIn.social({
                        provider: "spotify"
                  })
              >
                 Spotify
             </Button>
                                  `,
  spotifyContinueUI: `
                <Button
                    variant="outline"
                    className="gap-2 flex-1 w-full py-4"
                    onClick={async () => {
                        await client.signIn.social({
                            provider: "spotify"
                    })
                >
                  Continue with Spotify
              </Button>
                                                                    `,
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
           clientId: process.env.FACEBOOK_CLIENT_ID!,
           clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      },
  `,
  twitch: `
      twitch: {
           clientId: process.env.TWITCH_CLIENT_ID!,
           clientSecret: process.env.TWITCH_CLIENT_SECRET!,
       },
  `,
  twitter: `
      twitter: {
           clientId: process.env.TWITTER_CLIENT_ID!,
           clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      },
    `,
  apple: `
        apple: {
             clientId: process.env.APPLE_CLIENT_ID! ,
             clientSecret: process.env.APPLE_CLIENT_SECRET!,
         },
    `,
  microsoft: `
      microsoft: {
            clientId: process.env.MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      },
      `,
  spotify: `
      spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID! ,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      },
            `,
  gitlab: `
      gitlab: {
            clientId: process.env.GITLAB_CLIENT_ID!,
            clientSecret: process.env.GITLAB_CLIENT_SECRET!,
      },
            `,
  dropbox: `
      dropbox: {
             clientId: process.env.DROPBOX_CLIENT_ID!,
             clientSecret: process.env.DROPBOX_CLIENT_SECRET!,
      },
            `,
  linkedin: `
      linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      },
            `,
  discord: `
       discord: {
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      },
      `,
};
export const routeMap = {
  forgetPassword: "/app/forget-password/page.tsx",
  resetassword: "/app/reset-password/page.tsx",
};
