import { create } from "zustand";
const firstName = "firstName";
const lastName = "lastName";
interface FileStructure {
  pages: Partial<{
    signin: string;
    signup: string;
    forgetPassword: string;
    resetPassword: string;
  }>;
  components: Partial<{
    signin: string;
    forgetPassword: string;
    resetPassword: string;
  }>;
  files: Partial<{
    client: string;
    env: string;
    auth: {
      prisma: string;
      drizzle: string;
      mongoDb: string;
      mysql: string;
      libsql: string;
      postgres: string;
    };
  }>;
}
interface Codeblocks {
  title: string;
  slug: string;
  code: Partial<{
    next: FileStructure;
    astro: FileStructure;
    solid: FileStructure;
    svelte: FileStructure;
    nuxt: FileStructure;
  }>;
}
interface CodeBlocks {
  title: "SignIn UI Block";
  slug: "signin-ui";
}

export const useCodeComponent = create<Codeblocks>((set) => ({
  title: "SignIn UI Block",
  slug: "signin-ui",
  code: {
    next: {
      pages: {
        signin: `
import LogIn from "@/components/login";
export const metadata = {
  title: "Login - Better Auth",
};
export default function LoginPage() {
  return (
    <>
      <LogIn />
    </>
  );
}
          `,

        signup: `
import SignUp from "@/components/signup";
export const metadata = {
  title: "SignUp - Better Auth",
};
export default function SignUpPage() {
  return (
    <>
      <SignUp />
    </>
  );
}
            `,
        forgetPassword: "this is",
        resetPassword: "this is the page",
      },
      components: {
        forgetPassword: `
"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/auth-client";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const res = await client.forgetPassword({
				email,
				redirectTo: "/reset-password",
			});
			setIsSubmitted(true);
		} catch (err) {
			setError("An error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitted) {
		return (
			<main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>Check your email</CardTitle>
						<CardDescription>
							We've sent a password reset link to your email.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Alert>
							<CheckCircle2 className="h-4 w-4" />
							<AlertDescription>
								If you don't see the email, check your spam folder.
							</AlertDescription>
						</Alert>
					</CardContent>
					<CardFooter>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => setIsSubmitted(false)}
						>
							<ArrowLeft className="mr-2 h-4 w-4" /> Back to reset password
						</Button>
					</CardFooter>
				</Card>
			</main>
		);
	}

	return (
		<main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
			{/* Radial gradient for the container to give a faded look */}
			<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Forgot password</CardTitle>
					<CardDescription>
						Enter your email to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>
						{error && (
							<Alert variant="destructive" className="mt-4">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<Button
							className="w-full mt-4"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Sending..." : "Send reset link"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link href="/sign-in">
						<Button variant="link" className="px-0">
							Back to sign in
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</main>
	);
}`,
        resetPassword: `
"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { client } from "@/lib/auth-client";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const res = await client.resetPassword({
      newPassword: password,
    });
    if (res.error) {
      toast.error(res.error.message);
    }
    setIsSubmitting(false);
    router.push("/sign-in");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>
            Enter new password and confirm it to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">New password</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Confirm password</Label>
                <PasswordInput
                  id="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="password"
                  placeholder="Password"
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
        `,
        signin: `
"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { client } from "@/lib/client";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Key, Loader2, TwitchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  // passwordState
  // rememberMeState
  const router = useRouter();
  // loadingState
  return (
    <Card className="z-50 rounded-md rounded-t-none max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
            // forgetPassword
            // passwordInput
            // rememberMeUI
            // signInAction
            // magicLinkAction
          <div className="flex flex-wrap items-center gap-2 w-full">

          // googleUI
          // googleContinueUI
          // appleUI
          // appleContinueUI
          // facebookUI
          // facebookContinueUI
          // microsoftUI
          // microsoftContinueUI
          // discordUI
          // discordContinueUI
          // twitterUI
          // twitterContinueUI
          // twitchUI
          // twitchContinueUI
          // githubUI
          // githubContinueUI
          // dropboxUI
          // dropboxContinueUI
          // gitlabUI
          // gitlabContinueUI
          // spotifyUI
          // spotifyContinueUI
          // linkedinUI
          // linkedinContinueUI
           </div>
          // passKey
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Secured by <span className="text-orange-400">better-auth.</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
export default LogIn
        `,
        signup: `
"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
        } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { client, signIn, signUp } from "@/lib/auth-client";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	async function convertImageToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
    }
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};
	const [loading, setLoading] = useState(false);

	return (
		<Card className="z-50 rounded-md rounded-t-none max-w-md">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name">First name</Label>
							<Input
								id="first-name"
								placeholder="Max"
								required
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								value={firstName}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								id="last-name"
								placeholder="Robinson"
								required
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								value={lastName}
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<PasswordInput
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							placeholder="Password"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Confirm Password</Label>
						<PasswordInput
							id="password_confirmation"
							value={passwordConfirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							autoComplete="new-password"
							placeholder="Confirm Password"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="image">Profile Image (optional)</Label>
						<div className="flex items-end gap-4">
							{imagePreview && (
								<div className="relative w-16 h-16 rounded-sm overflow-hidden">
									<Image
										src={imagePreview}
										alt="Profile preview"
										layout="fill"
										objectFit="cover"
									/>
								</div>
							)}
							<div className="flex items-center gap-2 w-full">
								<Input
									id="image"
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="w-full"
								/>
								{imagePreview && (
									<X
										className="cursor-pointer"
										onClick={() => {
											setImage(null);
											setImagePreview(null);
										}}
									/>
								)}
							</div>
						</div>
					</div>
					<Button
						type="submit"
						className="w-full"
						disabled={loading}
						onClick={async () => {
							await signUp.email({
								email,
								password,
								name: {firstName} {lastName},
								image: image ? await convertImageToBase64(image) : "",
								callbackURL: "/dashboard",
								fetchOptions: {
									onResponse: () => {
										setLoading(false);
									},
									onRequest: () => {
										setLoading(true);
									},
									onError: (ctx) => {
										toast.error(ctx.error.message);
									},
									onSuccess: async () => {
										router.push("/dashboard");
									},
								},
							});
						}}
					>
						{loading ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							"Create an account"
						)}
					</Button>
					<div className="flex flex-wrap items-center gap-2 w-full">
                // googleUI
                // googleContinueUI
                // appleUI
                // appleContinueUI
                // facebookUI
                // facebookContinueUI
                // microsoftUI
                // microsoftContinueUI
                // discordUI
                // discordContinueUI
                // twitterUI
                // twitterContinueUI
                // twitchUI
                // twitchContinueUI
                // githubUI
                // githubContinueUI
                // dropboxUI
                // dropboxContinueUI
                // gitlabUI
                // gitlabContinueUI
                // spotifyUI
                // spotifyContinueUI
                // linkedinUI
                // linkedinContinueUI
           </div>
			</CardContent>
			<CardFooter>
				<div className="flex justify-center w-full border-t py-4">
					<p className="text-center text-xs text-neutral-500">
						Secured by <span className="text-orange-400">better-auth.</span>
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}

export default SignUp

        `,
      },
      files: {
        env: `
        // better_auth_secret_env
        // google_env
       // apple_env
       // github_env
       // discord_env
       // twitch_env
       // dropbox_env
       // linkedin_env
       // twitter_env
       // gitlab_env
       // spotify_env
       // facebook_env
       // microsoft_env
    `,
        auth: {
          prisma: `
import { betterAuth } from "better-auth";
// noDistructure
import {
    // passKeyServerImport
    // magicLinkServerImport
} from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";
import { headers } from "next/headers";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: "postgresql", // or "pg" or "mysql"
  }),
   emailAndPassword: {
     enabled: true,
     plugins: [
        nextCookies(),
       // passKeyServer
       // magicLinkServer
     ],

    socialProviders: {
     // github
     // github
     // google
     // facebook
     // twitch
     // microsoft
     // twitter
     // discord
     // spotify
     // linkedin
     // dropbox
     // gitlab
    }
});


export const getSession = cache(async () => {
      return await auth.api.getSession({
         headers: await headers()
     })
 })
        `,
          drizzle: `
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle"; // your drizzle db config
import { headers } from "next/headers";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite", // or "pg" or "mysql"
    }),
   emailAndPassword: {
     enabled: true,
     plugins: [
        nextCookies(),
        // passKeyServer
        // magicLinkServer
    ],
    socialProviders: {
     // github
     // google
     // facebook
     // twitch
     // microsoft
     // twitter
     // discord
     // spotify
     // linkedin
     // dropbox
     // gitlab
    }
});


export const getSession = cache(async () => {
      return await auth.api.getSession({
         headers: await headers()
     })
 })
`,
          libsql: `
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { cache } from "react";
import { headers } from "next/headers";
const dialect = new LibsqlDialect({
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
})

export const auth = betterAuth({
    database: {
        dialect,
        type: "sqlite"
   },
    emailAndPassword: {
    enabled: true,
    plugins: [
        nextCookies(),
       // passKeyServer
       // magicLinkServer
    ],
    ,

   socialProviders: {
    // github
    // google
    // facebook
    // twitch
    // microsoft
    // twitter
    // discord
    // spotify
    // linkedin
    // dropbox
    // gitlab
   }
});


export const getSession = cache(async () => {
     return await auth.api.getSession({
        headers: await headers()
    })
})
`,
          sqlite: `

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";
import Database from "better-sqlite3"
import { headers } from "next/headers";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
    plugins: [
        nextCookies(),
       // passKeyServer
       // magicLinkServer
    ],
   socialProviders: {
    // github
    // google
    // facebook
    // twitch
    // microsoft
    // twitter
    // discord
    // spotify
    // linkedin
    // dropbox
    // gitlab
   }
});


export const getSession = cache(async () => {
     return await auth.api.getSession({
        headers: await headers()
    })
})


`,
          mongoDb: `

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// empty
// empty

const client = new MongoClient("mongodb://localhost:27017");

const db = client.db()
export const auth = betterAuth({
  database: mongodbAdapter(db)
  emailAndPassword: {
    enabled: true,
    plugins: [
        nextCookies(),
       // passKeyServer
       // magicLinkServer
    ],
    socialProviders: {
    // github
    // google
    // facebook
    // twitch
    // microsoft
    // twitter
    // discord
    // spotify
    // linkedin
    // dropbox
    // gitlab
   }
});


export const getSession = cache(async () => {
     return await auth.api.getSession({
        headers: await headers()
    })
})

`,
          mysql: `
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";
import { createPool } from "mysql2/promise"
import { headers } from "next/headers";

export const auth = betterAuth({
    database: createPool({
       host: "localhost",
       user: "root",
       password: "password",
       database: "database"
   }),
  emailAndPassword: {
    enabled: true,
    plugins: [
        nextCookies(),
        // passKeyServer
        // magicLinkServer
    ],

   socialProviders: {
    // github
    // google
    // facebook
    // twitch
    // microsoft
    // twitter
    // discord
    // spotify
    // linkedin
    // dropbox
    // gitlab
   }
});


export const getSession = cache(async () => {
     return await auth.api.getSession({
        headers: await headers()
    })
})
`,
          postgres: `

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";
import { headers } from "next/headers";
import { Pool } from "pg"
export const auth = betterAuth({
   database: new Pool({
      connectionString: "postgres://user:password@localhost:5432/database"
   }),
   emailAndPassword: {
    enabled: true,
    plugins: [
        nextCookies(),
        // passKeyServer
        // magicLinkServer
    ],

   socialProviders: {
    // github
    // google
    // facebook
    // twitch
    // microsoft
    // twitter
    // discord
    // spotify
    // linkedin
    // dropbox
    // gitlab
   }
});


export const getSession = cache(async () => {
     return await auth.api.getSession({
        headers: await headers()
    })
})

`,
        },
        client: `
import { createAuthClient } from "better-auth/react";
// noDistructure
import {
    // passKeyClientImport
    // magicLinkClientImport
} from "better-auth/client/plugins"
export const client = createAuthClient({
    baseURL: "http://localhost:3000",
    // noLists
    plugins: [
        // passKeyClient
        // magicLinkClient
    ]
})

        `,
      },
    },
  },
}));
