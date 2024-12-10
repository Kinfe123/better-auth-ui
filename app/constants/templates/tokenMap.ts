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
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.98em"
                    height="1em"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="currentColor"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    />
                    <path
                      fill="currentColor"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    />
                    <path
                      fill="currentColor"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    />
                    <path
                      fill="currentColor"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    />
                  </svg>
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

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.98em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                    fill="currentColor"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                />
                <path
                  fill="currentColor"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                />
                <path
                  fill="currentColor"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                />
                <path
                  fill="currentColor"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                />
              </svg>
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
            <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                        fill="#fff"
                        fillRule="evenodd"
                      />
                    </svg>
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

               <svg
                         className="w-4 h-4"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <path
                           clipRule="evenodd"
                           d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                           fill="#fff"
                           fillRule="evenodd"
                         />
                       </svg>
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
               <svg
                         fill="#fff"
                         className="w-4 h-4"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 22.773 22.773"
                       >
                         <g>
                           <g>
                             <path
                               d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
			c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
                             />
                             <path
                               d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
			c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
			c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
			c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
			c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
			c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
                             />
                           </g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                         </g>
                       </svg>
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
                     <svg
                               fill="#fff"
                               className="w-4 h-4"
                               xmlns="http://www.w3.org/2000/svg"
                               xmlnsXlink="http://www.w3.org/1999/xlink"
                               viewBox="0 0 22.773 22.773"
                             >
                               <g>
                                 <g>
                                   <path
                                     d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
			c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
                                   />
                                   <path
                                     d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
			c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
			c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
			c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
			c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
			c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
                                   />
                                 </g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                                 <g></g>
                               </g>
                             </svg>
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

               <svg
                         className="w-4 h-4 text-[#1877F2]"
                         fill="#fff"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                       </svg>
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
                  <svg
                            className="w-4 h-4 text-[#1877F2]"
                            fill="#fff"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                          </svg>
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

               <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="1.2em"
                     height="1.2em"
                     viewBox="0 0 24 24"
                   >
                     <path
                       fill="currentColor"
                       d="M2 3h9v9H2zm9 19H2v-9h9zM21 3v9h-9V3zm0 19h-9v-9h9z"
                     ></path>
                   </svg>
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
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M2 3h9v9H2zm9 19H2v-9h9zM21 3v9h-9V3zm0 19h-9v-9h9z"
                      ></path>
                    </svg>
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

              <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                        ></path>
                      </svg>
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

                  <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                            ></path>
                          </svg>
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
               <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="1em"
                         height="1em"
                         viewBox="0 0 24 24"
                       >
                         <path
                           fill="currentColor"
                           d="m22.749 9.769l-.031-.08l-3.027-7.9a.79.79 0 0 0-.782-.495a.8.8 0 0 0-.456.17a.8.8 0 0 0-.268.408L16.14 8.125H7.865L5.822 1.872a.8.8 0 0 0-.269-.409a.81.81 0 0 0-.926-.05c-.14.09-.25.22-.312.376L1.283 9.684l-.03.08a5.62 5.62 0 0 0 1.864 6.496l.01.008l.028.02l4.61 3.453l2.282 1.726l1.39 1.049a.935.935 0 0 0 1.13 0l1.389-1.05l2.281-1.726l4.639-3.473l.011-.01A5.62 5.62 0 0 0 22.75 9.77"
                         ></path>
                       </svg>
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
                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m22.749 9.769l-.031-.08l-3.027-7.9a.79.79 0 0 0-.782-.495a.8.8 0 0 0-.456.17a.8.8 0 0 0-.268.408L16.14 8.125H7.865L5.822 1.872a.8.8 0 0 0-.269-.409a.81.81 0 0 0-.926-.05c-.14.09-.25.22-.312.376L1.283 9.684l-.03.08a5.62 5.62 0 0 0 1.864 6.496l.01.008l.028.02l4.61 3.453l2.282 1.726l1.39 1.049a.935.935 0 0 0 1.13 0l1.389-1.05l2.281-1.726l4.639-3.473l.011-.01A5.62 5.62 0 0 0 22.75 9.77"
                          ></path>
                        </svg>
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
              <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                          <path
                            fill="currentColor"
                            d="m11.998 13.503l2.879 1.662c.426.246.923.34 1.365.34c.443 0 .94-.094 1.367-.34l.587-.34V17a1 1 0 0 1-.5.866l-5.196 3a1 1 0 0 1-1 0l-5.196-3a1 1 0 0 1-.5-.866v-2.172l.583.337c.426.246.923.34 1.366.34c.442 0 .939-.094 1.366-.34zM6.887 3.5c.434-.251 1.115-.274 1.594-.068l.138.068l3.379 1.95l3.379-1.95c.434-.251 1.115-.274 1.594-.068l.138.068l4.242 2.45c.447.257.476.664.09.942l-.09.057l-3.378 1.95l3.378 1.95c.447.258.476.665.09.943l-.09.057l-4.242 2.45c-.435.25-1.116.273-1.595.068l-.137-.068l-3.38-1.951l-3.378 1.95c-.435.252-1.116.274-1.595.07l-.137-.07l-4.243-2.449c-.447-.257-.476-.665-.09-.942l.09-.058L6.022 8.9L2.644 6.95c-.447-.257-.476-.665-.09-.942l.09-.058zm5.546 2.702c-.205-.119-.52-.136-.755-.051l-.111.05l-4.243 2.45c-.212.122-.236.313-.07.45l.07.05l4.243 2.449c.205.118.52.135.755.05l.111-.05l4.243-2.45c.212-.122.236-.312.07-.45l-.07-.05z"
                          ></path>
                        </g>
                      </svg>
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

                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                            <path
                              fill="currentColor"
                              d="m11.998 13.503l2.879 1.662c.426.246.923.34 1.365.34c.443 0 .94-.094 1.367-.34l.587-.34V17a1 1 0 0 1-.5.866l-5.196 3a1 1 0 0 1-1 0l-5.196-3a1 1 0 0 1-.5-.866v-2.172l.583.337c.426.246.923.34 1.366.34c.442 0 .939-.094 1.366-.34zM6.887 3.5c.434-.251 1.115-.274 1.594-.068l.138.068l3.379 1.95l3.379-1.95c.434-.251 1.115-.274 1.594-.068l.138.068l4.242 2.45c.447.257.476.664.09.942l-.09.057l-3.378 1.95l3.378 1.95c.447.258.476.665.09.943l-.09.057l-4.242 2.45c-.435.25-1.116.273-1.595.068l-.137-.068l-3.38-1.951l-3.378 1.95c-.435.252-1.116.274-1.595.07l-.137-.07l-4.243-2.449c-.447-.257-.476-.665-.09-.942l.09-.058L6.022 8.9L2.644 6.95c-.447-.257-.476-.665-.09-.942l.09-.058zm5.546 2.702c-.205-.119-.52-.136-.755-.051l-.111.05l-4.243 2.45c-.212.122-.236.313-.07.45l.07.05l4.243 2.449c.205.118.52.135.755.05l.111-.05l4.243-2.45c.212-.122.236-.312.07-.45l-.07-.05z"
                            ></path>
                          </g>
                        </svg>
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
              <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12.001 2c-5.5 0-10 4.5-10 10s4.5 10 10 10s10-4.5 10-10s-4.45-10-10-10m3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85c-.2.3-.55.4-.85.2m1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1s-.7.5-1.05.25M6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75"
                        ></path>
                      </svg>
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
                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12.001 2c-5.5 0-10 4.5-10 10s4.5 10 10 10s10-4.5 10-10s-4.45-10-10-10m3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85c-.2.3-.55.4-.85.2m1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1s-.7.5-1.05.25M6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75"
                          ></path>
                        </svg>
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
