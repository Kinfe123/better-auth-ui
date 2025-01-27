"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { anyBool } from "@/lib/utils";
import { Layout, Code2, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ComponentRender } from "./component-render";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CodeComponent } from "@/app/_components/component-code";
import { EnabledComponent, useComponents } from "@/lib/store";
import { useEffect } from "react";
import { authOptions } from "./lib/auth-options";
import { hintsText, hintTextWithString } from "@/app/constants/hints";
import { disablityStatusRelation } from "@/lib/disable-relation";

type additionalAuthType = (typeof authOptions)["additionals"];
type otherSigninAuthType = (typeof authOptions)["otherSignIn"];
type socialAuthType = (typeof authOptions)["socialProviders"];
export default function AuthBuilder() {
  const { enabledComp, updateEnabledComponent } = useComponents();
  type authOptionTypes = keyof typeof enabledComp;
  const checkDisablity = (
    currOption: string,
    status: boolean,
    category: authOptionTypes,
  ) => {
    let disabledStatus = false;
    if (currOption in disablityStatusRelation) {
      const deps = disablityStatusRelation[currOption];
      const categories = enabledComp[category];
      deps.map((dep) => {
        // @ts-expect-error map indx
        disabledStatus = disabledStatus || (categories[dep] as boolean);
      });
    }
    return disabledStatus;
  };
  const constructRegistry = async () => {};
  return (
    <Card className="relative h-full w-full bg-transparent max-w-7xl mx-auto border-t-0 rounded-none">
      <div className="w-full border-l-2 border-b-2 border-gray-200/50 dark:border-gray-900/50">
        <div className="overflow-hidden md:ml-[-2px] bg-transparent flex gap-10 items-center justify-between md:justify-normal  rounded-none">
          <Tabs defaultValue="preview" className="w-full ">
            <div className="w-32 md:w-full flex items-center justify-start gap-1">
              <div className="w-full flex items-center justify-between">
                <div>
                  <TabsList className=" md:ml-[-5px] data-[state=active]:bg-background items-center justify-between md:justify-normal bg-tranparent gap-3 w-full md:w-fit  rounded-none">
                    <TabsTrigger
                      className="rounded-none py-2 pt-[10px] ml-[-3px]  data-[state=active]:text-white flex w-full  items-center gap-2 data-[state=active]:bg-stone-900 "
                      value="preview"
                    >
                      <Layout className="w-4 h-4" />
                      <span className="py-1 flex items-center justify-center">
                        Preview
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsList className="md:ml-[-5px] data-[state=active]:bg-background w-full items-center justify-between md:justify-normal bg-tranparent gap-3  md:w-fit  rounded-none">
                    <TabsTrigger
                      className="rounded-none ml-[-3px] w-full py-2 pt-[10px] data-[state=active]:text-white flex  items-center gap-2 data-[state=active]:bg-stone-900 "
                      value="code"
                    >
                      <Code2 className="w-4 h-4" />
                      <span className="py-1 flex items-center justify-center">
                        Code
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
            </div>
            <hr className="bg-gray-200 mt-1" />
            <TabsContent value="code" className="w-full h-[75vh]">
              <CodeComponent />
            </TabsContent>
            <TabsContent value="preview" className="w-full h-full -mt-1">
              <div className="">
                <div className="md:container mx-auto flex-col w-full h-full md:flex md:flex-row items-start gap-14 md:max-w-7xl">
                  <ComponentRender />

                  <div className="relative max-w-full w-full md:max-w-[35%] mx-auto pt-20 px-10">
                    <div className="absolute h-screen ml-1 rounded-none  w-full pointer-events-none inset-0 flex items-center border-r-2 border-t-2 md:border-t-0 mt-10 md:mt-0 md:border-r-0 border-l-2 border-stone-900 justify-center"></div>
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-2xl font-semibold mb-1">
                          Create your own{" "}
                          <span className="font-mono">{"<SignIn />"} </span>{" "}
                          Component.
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          Configure the sign in box to your liking and copy the
                          code to your application
                        </p>
                      </div>

                      <div className="w-full space-y-4">
                        <div className="h-[600px] pb-16 flex flex-col gap-10 overflow-y-auto">
                          <div className="space-y-4 ">
                            <Label className="font-mono text-gray-200 uppercase block mt-4">
                              Credential Login
                            </Label>
                            <hr className="text-gray-300" />
                            <div className="pr-4 w-full space-y-4">
                              {Object.keys(enabledComp["credentials"]).map(
                                (cred, indx) => {
                                  return (
                                    <div
                                      key={indx}
                                      className="flex w-full items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        {
                                          authOptions["credential"][
                                            cred as keyof EnabledComponent["credentials"]
                                          ]["icon"]
                                        }
                                        <span className="text-sm">
                                          {
                                            authOptions["credential"][
                                              cred as keyof EnabledComponent["credentials"]
                                            ]["name"]
                                          }
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {cred in
                                          hintTextWithString["yetGroup"] && (
                                          <TooltipProvider delayDuration={50}>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <InfoIcon className="w-3 h-3" />
                                              </TooltipTrigger>
                                              <TooltipContent className="bg-black text-white">
                                                <p>
                                                  {
                                                    hintTextWithString[
                                                      "yetGroup"
                                                    ][cred]
                                                  }
                                                </p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        )}
                                        {anyBool([
                                          enabledComp.otherSignIn.magicLink!,
                                        ]) &&
                                          authOptions["credential"][
                                            cred as keyof EnabledComponent["credentials"]
                                          ]["name"] === "Enabled" && (
                                            <TooltipProvider delayDuration={50}>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <InfoIcon className="w-3 h-3" />
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-black text-white">
                                                  <p>
                                                    {
                                                      hintsText["credential"][
                                                        "magicLink"
                                                      ]
                                                    }
                                                  </p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          )}
                                        <Switch
                                          disabled={
                                            cred === "email" ||
                                            enabledComp.otherSignIn.magicLink ||
                                            cred in
                                              hintTextWithString["yetGroup"]
                                          }
                                          onCheckedChange={(e) => {
                                            updateEnabledComponent({
                                              toogledComp: {
                                                credentials: {
                                                  ...enabledComp["credentials"],
                                                  [cred]: e,
                                                  email:
                                                    !enabledComp.credentials
                                                      .enabled,
                                                },
                                              },
                                            });
                                          }}
                                          checked={
                                            enabledComp["credentials"][
                                              cred as keyof EnabledComponent["credentials"]
                                            ]
                                          }
                                        />
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                          <div className="space-y-4 ">
                            <Label className="font-mono text-gray-200 uppercase block mt-4">
                              Additional On Credential
                            </Label>
                            <hr className="text-gray-300" />
                            <div className="pr-4 space-y-4">
                              {Object.keys(enabledComp["additionals"]).map(
                                (addition, indx) => {
                                  const exists =
                                    addition in authOptions["additionals"];
                                  const enabledCredentials = Object.entries(
                                    enabledComp.credentials,
                                  )
                                    .filter((curr) => curr[1])
                                    .map((curr) => curr[0]);
                                  const fullDeps = enabledComp!.additionals![
                                    addition as keyof EnabledComponent["additionals"]
                                  ]!["dependencies"] as string[];

                                  if (exists) {
                                    return (
                                      <div
                                        key={indx}
                                        className="flex items-center justify-between"
                                      >
                                        <div className="flex items-center gap-2">
                                          {
                                            authOptions["additionals"][
                                              addition as keyof additionalAuthType
                                            ]["icon"]
                                          }
                                          <span className="text-sm">
                                            {
                                              authOptions["additionals"][
                                                addition as keyof additionalAuthType
                                              ]["name"]
                                            }
                                          </span>
                                        </div>
                                        <Switch
                                          disabled={checkDisablity(
                                            addition,
                                            enabledComp!["additionals"]![
                                              addition as keyof EnabledComponent["additionals"]
                                            ]!["visiblity"] as boolean,
                                            "otherSignIn",
                                          )}
                                          onCheckedChange={(e) => {
                                            updateEnabledComponent({
                                              toogledComp: {
                                                additionals: {
                                                  ...enabledComp["additionals"],

                                                  [addition]: {
                                                    ...enabledComp[
                                                      "additionals"
                                                    ][
                                                      addition as keyof EnabledComponent["additionals"]
                                                    ],
                                                    visiblity: e,
                                                    routing: false,
                                                  },
                                                  resetPassword: {
                                                    visiblity:
                                                      enabledComp["additionals"]
                                                        .forgetPassword
                                                        ?.visiblity ?? false,
                                                    routing: false,
                                                  },
                                                },
                                              },
                                            });
                                          }}
                                          checked={
                                            enabledComp["additionals"][
                                              addition as keyof EnabledComponent["additionals"]
                                            ]?.visiblity
                                          }
                                        />
                                      </div>
                                    );
                                  }
                                },
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Label className="mb-4 font-mono text-gray-200 uppercase block mt-4">
                              Other Sign In Options
                            </Label>
                            <hr className="text-gray-300" />
                            <div className="pr-4 space-y-4">
                              {Object.keys(enabledComp["otherSignIn"]).map(
                                (other, indx) => {
                                  return (
                                    <div
                                      key={indx}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        {
                                          authOptions["otherSignIn"][
                                            other as keyof EnabledComponent["otherSignIn"]
                                          ]["icon"]
                                        }
                                        <span className="text-sm">
                                          {
                                            authOptions["otherSignIn"][
                                              other as keyof EnabledComponent["otherSignIn"]
                                            ]["name"]
                                          }
                                        </span>
                                      </div>
                                      <Switch
                                        onCheckedChange={(e) => {
                                          if (
                                            authOptions["otherSignIn"][
                                              other as keyof EnabledComponent["otherSignIn"]
                                            ]?.name === "Magic Link"
                                          ) {
                                            updateEnabledComponent({
                                              toogledComp: {
                                                ...enabledComp,
                                                credentials: {
                                                  ...enabledComp.credentials,
                                                  enabled:
                                                    !enabledComp.credentials
                                                      .enabled,
                                                },
                                                additionals: {
                                                  forgetPassword: {
                                                    visiblity: false,
                                                    routing: false,
                                                  },
                                                  resetPassword: {
                                                    visiblity: false,
                                                    routing: false,
                                                  },
                                                  rememberMe: {
                                                    visiblity: false,
                                                    routing: false,
                                                  },
                                                },
                                              },
                                            });
                                          }
                                          updateEnabledComponent({
                                            toogledComp: {
                                              otherSignIn: {
                                                ...enabledComp["otherSignIn"],
                                                [other]: e,
                                              },
                                            },
                                          });
                                        }}
                                        checked={
                                          enabledComp["otherSignIn"][
                                            other as keyof EnabledComponent["otherSignIn"]
                                          ]
                                        }
                                      />
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Label className="mb-4 font-mono text-gray-200 uppercase block mt-4">
                              Social Providers
                            </Label>
                            <hr className="text-gray-300" />
                            <div className="pr-4 space-y-4">
                              {Object.keys(enabledComp["socials"]).map(
                                (social, indx) => {
                                  return (
                                    <div
                                      key={indx}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        {
                                          authOptions["socialProviders"][
                                            social as keyof socialAuthType
                                          ]["icon"]
                                        }
                                        <span className="text-sm">
                                          {
                                            authOptions["socialProviders"][
                                              social as keyof socialAuthType
                                            ]["name"]
                                          }
                                        </span>
                                      </div>
                                      <Switch
                                        onCheckedChange={(e) => {
                                          updateEnabledComponent({
                                            toogledComp: {
                                              socials: {
                                                ...enabledComp["socials"],
                                                [social]: e,
                                              },
                                            },
                                          });
                                        }}
                                        checked={
                                          enabledComp["socials"][
                                            social as keyof EnabledComponent["socials"]
                                          ]
                                        }
                                      />
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
}
const ComponentCLI = () => {
  return <div></div>;
};
