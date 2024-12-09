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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useComponents, useUrl } from "@/lib/store";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Key, Loader2, TwitchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ApearanceLayout } from "./apearance-layout";
import { authOptions } from "./lib/auth-options";
import { anyBool } from "@/lib/utils";

type additionalAuthType = (typeof authOptions)["additionals"];
type otherSigninAuthType = (typeof authOptions)["otherSignIn"];
type socialAuthType = (typeof authOptions)["socialProviders"];

export default function SignIn() {
  const { enabledComp, updateEnabledComponent } = useComponents();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { url } = useUrl();
  const providerEntry = Object.entries(enabledComp.socials);
  const enabledEntries = providerEntry.filter((curr) => curr[1]);

  useEffect(() => {
    updateEnabledComponent({
      toogledComp: {
        ...enabledComp,
        additionals: {
          ...enabledComp.additionals,
          forgetPassword: {
            ...enabledComp.additionals.forgetPassword,
            routing: false,
          },
          resetPassword: {
            ...enabledComp.additionals.resetPassword,
            routing: false,
          },
        },
      },
    });
    console.log({ enabledComp });
  }, []);

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
          {(enabledComp.credentials.enabled ||
            enabledComp.credentials.email) && (
            <ApearanceLayout className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="email">Email</Label>
                  {enabledComp.credentials.phoneNumber && (
                    <Label htmlFor="phone">Use phone</Label>
                  )}
                </div>
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
              {!enabledComp.otherSignIn.magicLink && (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {enabledComp.additionals.forgetPassword?.visiblity && (
                      <Link
                        href=""
                        onClick={() =>
                          updateEnabledComponent({
                            toogledComp: {
                              additionals: {
                                ...enabledComp.additionals,
                                forgetPassword: {
                                  ...enabledComp.additionals.forgetPassword,
                                  routing: true,
                                },
                              },
                            },
                          })
                        }
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    )}
                  </div>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="password"
                    placeholder="Password"
                  />
                </div>
              )}
              {enabledComp.additionals.rememberMe?.visiblity &&
                !anyBool([enabledComp.otherSignIn.magicLink as boolean]) && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onClick={() => {
                        setRememberMe(!rememberMe);
                      }}
                    />
                    <Label>Remember me</Label>
                  </div>
                )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </ApearanceLayout>
          )}
          <div className="flex flex-wrap items-center gap-2 w-full">
            {Object.entries(enabledComp.socials).map(
              ([social, enabled], indx) => {
                if (enabled) {
                  return enabledEntries.length <= 3 ? (
                    <Button
                      key={indx}
                      variant="outline"
                      className="gap-2 flex-1 w-full py-4"
                    >
                      {
                        authOptions.socialProviders[
                          social as keyof socialAuthType
                        ]["icon"]
                      }{" "}
                      Continue with{" "}
                      {
                        authOptions.socialProviders[
                          social as keyof socialAuthType
                        ]["name"]
                      }
                    </Button>
                  ) : (
                    <Button
                      key={indx}
                      variant="outline"
                      className="gap-2 py-4 flex-1"
                    >
                      {
                        authOptions.socialProviders[
                          social as keyof socialAuthType
                        ]["icon"]
                      }
                    </Button>
                  );
                }
              },
            )}
          </div>
          {enabledComp.otherSignIn.passKey && (
            <Button variant="outline" className="gap-2 py-4">
              <Key size={16} />
              Sign-in with Passkey
            </Button>
          )}
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
