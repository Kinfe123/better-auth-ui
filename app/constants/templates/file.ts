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
