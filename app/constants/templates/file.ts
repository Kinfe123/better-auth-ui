export const forgetPasswordSnippet = `
         <div className="flex items-center">
           <Label htmlFor="password">Password</Label>
              <Link
                href="/forget-password"
                className="ml-auto inline-block text-sm underline"
              >
				Forgot your password?
			 </Link>
		  </div>

`;

export const remeberMeSnippet = `
          <div className="flex items-center gap-2">
            <Checkbox
              onClick={() => {
              setRememberMe(!rememberMe);
              }}
          />
          <Label>Remember me</Label>
        </div>

  `;
export const PassKeySnippet = `
          <Button
             variant="outline"
             className="gap-2"
             onClick={async () => {
                await signIn.passkey({
                fetchOptions: {
                onResponse(context) {
                  router.push("/dashboard");
                },
              },
            });
          }}
		  >
		   <Key size={16} />
	       Sign-in with Passkey
		</Button>

  `;
export const PassKeyServerImport = `
    passkey,

`;
export const MagicLinkServerImport = `
    magicLink

`;
export const PassKeyServerSnippet = `
        passkey(),
`;
export const PassKeyClientSnippet = `
        passkeyClient(),
`;
export const PassKeyClientImport = `
      passkeyClient,
`;
export const MagicLinkServerSnippet = `
        magicLink()
`;
export const MagicLinkClientSnippet = `
        magicLinkClient()
`;
export const MagicLinkClientImport = `
      magicLinkClient
`;
