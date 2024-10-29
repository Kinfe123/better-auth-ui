import { SimpleUsernameAndPass } from "./components/credentail/username-and-password";
export const previewComponent = [
  {
    title: "Simple Credential Login",
    slug: "username-and-password",
    docsLink: "/docs/plugins/username",
    component: <SimpleUsernameAndPass />,
    category: ["credential"],

    code: {
      next: {
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
