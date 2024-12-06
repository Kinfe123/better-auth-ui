import { SimpleUsernameAndPass } from "./components/credentail/username-and-password";
const firstName = "firstName";
const lastName = "lastName";
const fullName = "`${firstName} {lastName}";
export const previewComponent = [
  {
    title: "Simple Credential Login",
    slug: "username-and-password",
    docsLink: "docs/authentication/email-password",
    component: <SimpleUsernameAndPass />,
    category: ["credential"],

    code: {
      next: {
        login_page: `
import Login from "@/components/login";
export const metadata = {
  title: "Login - Better Auth",
};
export default function LoginPage() {
  return (
    <>
        <Login />
    </>
  );
}
`,
        signup_page: `
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
        login: `
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/client";
import Link from "next/link";
import clsx from "clsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    await signIn.email({
      email,
      password,
    });
  };

  return (
    <div className="w-full max-w-md rounded-xl dark:bg-background shadow-md ring-1 ring-black/5 dark:transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
      <form onSubmit={handleSubmit} className="p-7 sm:p-11">
        <div className="flex items-start">
          <Link href="/" title="Home">
            <h1>Logo</h1>
          </Link>
        </div>
        <h1 className="mt-8 text-base/6 font-medium">Welcome back!</h1>
        <p className="mt-1 text-sm/5 dark:text-gray-300 text-gray-600">
          Sign in to your account to continue.
        </p>
        <div className="mt-8 space-y-3">
          <Label className="text-sm/5 font-medium">Email</Label>
          <Input
            required
            autoFocus
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={clsx(
              "block w-full rounded-lg border border-gray-200 shadow ring-1 ring-black/10",
              "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
              "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black",
            )}
          />
        </div>
        <div className="mt-8 space-y-3">
          <Label className="text-sm/5 font-medium">Password</Label>
          <Input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={clsx(
              "block w-full rounded-lg border border-gray-200 shadow ring-1 ring-black/10",
              "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
              "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black",
            )}
          />
        </div>
        <div className="mt-8">
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SimpleUsernameAndPass;

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
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "@/lib/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

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
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							placeholder="Password"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Confirm Password</Label>
						<Input
							id="password_confirmation"
							type="password"
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
								name:\`\${firstName} \${lastName}\`,
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

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

            `,
        auth: `
import {
    betterAuth
} from 'better-auth';

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data, request) {
            // Send an email to the user with a link to reset their password
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }
    },

    /** if no database is provided, the user data will be stored in memory.
     * Make sure to provide a database to persist user data **/
});

                  `,
        client: `
import { createAuthClient } from "better-auth/react";
import {
	organizationClient,
	passkeyClient,
	twoFactorClient,
	adminClient,
	multiSessionClient,
	oneTapClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";

export const client = createAuthClient({
	plugins: [
		organizationClient(),
		twoFactorClient({
			onTwoFactorRedirect() {
				window.location.href = "/two-factor";
			},
		}),
		passkeyClient(),
		adminClient(),
		multiSessionClient(),
		oneTapClient({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
		}),
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
} = client;


                        `,
      },
      react: {
        login: `
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import clsx from "clsx";

const SimpleUsernameAndPass = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
       e.preventDefault();
       console.log("Email:", email);
       console.log("Password:", password);
    };

     return (
            <div className="w-full max-w-md rounded-xl dark:bg-background shadow-md ring-1 ring-black/5 dark:transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
              <form onSubmit={handleSubmit} className="p-7 sm:p-11">
                <div className="flex items-start">
                  <Link href="/" title="Home">
                    <h1>Logo</h1>
                  </Link>
                </div>
                <h1 className="mt-8 text-base/6 font-medium">Welcome back!</h1>
                <p className="mt-1 text-sm/5 dark:text-gray-300 text-gray-600">
                  Sign in to your account to continue.
                </p>
                <div className="mt-8 space-y-3">
                  <Label className="text-sm/5 font-medium">Email</Label>
                  <Input
                    required
                    autoFocus
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={clsx(
                      "block w-full rounded-lg border border-gray-200 shadow ring-1 ring-black/10",
                      "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                      "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black"
                    )}
                  />
                </div>
                <div className="mt-8 space-y-3">
                  <Label className="text-sm/5 font-medium">Password</Label>
                  <Input
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={clsx(
                      "block w-full rounded-lg border border-gray-200 shadow ring-1 ring-black/10",
                      "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                      "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black"
                    )}
                  />
                </div>
                <div className="mt-8">
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </div>
              </form>
            </div>
          );
        };

  export default SimpleUsernameAndPass;
  `,
        signup: `
      // this is sign up page
      `,
        auth: `
import { betterAuth } from "better-auth"
import { username } from "better-auth/plugins"

const auth = betterAuth({
       plugins: [
         username()
       ]
 })
            `,
        client: `
import { createAuthClient } from "better-auth/client"
import { usernameClient } from "better-auth/client/plugins"

const client = createAuthClient({
     plugins: [
         usernameClient()
    ]
})
                  `,
      },
      svelte: {
        login: "",
        signup: "",
        auth: "",
        client: "",
      },
      astro: {
        login: "",
        signup: "",
        auth: "",
        client: "",
      },
      solid: {
        login: "",
        signup: "",
        auth: "",
        client: "",
      },
      nuxt: {
        login: "",
        signup: "",
        auth: "",
        client: "",
      },
    },
  },
];
