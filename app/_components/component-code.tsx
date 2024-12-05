// @ts-nocheck
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Copy, Check, FileText, X } from "lucide-react";
import { Icons } from "@/components/icons";
import { FileTree } from "./component-preview";
import { Button } from "@/components/ui/button";
import { CodeSnippet } from "@/components/codeblock";
import { previewComponent } from "../constants/components";
import { useCodeComponent } from "../constants/store";
import { useComponents } from "@/lib/store";
import {
  importAndDistructureCleanup,
  replaceCommentsWithJSX,
} from "../builder/_components/lib/code-export";
import { commentMap } from "../constants/templates/map";
import { cx } from "class-variance-authority";
import { server_dep } from "../constants/templates/server-client-dep";
import {
  credentialDep,
  UIFunctionDep,
} from "../constants/templates/ui-function-dep";
import { stateMap } from "../constants/templates/state";
import { twoLevelComment } from "../constants/templates/two-level";
import { anyBool } from "@/lib/utils";
export function CodeComponent() {
  const [fmForTree, setFmForTree] = useState("next");
  const [activeTab, setActiveTab] = useState("next");
  const [fm, setFm] = useState("jsx");
  const [currentPage, setCurrentPage] = useState("login.tsx");
  const { code } = useCodeComponent();
  const { enabledComp } = useComponents();
  const [dbOptions, setDbOptions] = useState("prisma");
  const [copiedStates, setCopiedStates] = useState(false);
  const nextCode = {
    login: code.next?.components.signin,
    signup: code.next?.components.signup,
    auth: code.next?.files.auth,
    client: code.next?.files.client,
    forgetPassword: code.next?.components.forgetPassword,
    resetPassword: code.next?.components.resetPassword,
  };
  const codeExamples = {
    next: { language: "typescript", code: nextCode },
    react: { language: "typescript", code: previewComponent[0].code.react },
    svelte: { language: "html", code: previewComponent[0].code.svelte },
    astro: { language: "html", code: previewComponent[0].code.astro },
    nuxt: { language: "html", code: previewComponent[0].code.nuxt },
    solid: { language: "html", code: previewComponent[0].code.solid },
  };
  function getCode(value: string) {
    const fileName = value.split(".")[0];
    return fileName;
  }
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(true);
      setTimeout(() => {
        setCopiedStates(false);
      }, 2000);
    });
  };
  useEffect(() => {
    console.log({ copiedStates });
  }, [copiedStates]);
  const getFileIconByExtension = (fileName: string) => {
    const [_, extension] = fileName.split(".");
    switch (extension) {
      case "jsx":
      case "tsx":
        return <Icons.react className="w-4 h-4" />;
      case "js":
        return <Icons.javascript className="w-4 h-4" />;
      case "ts":
        return <Icons.typescript className="w-4 h-4" />;
      case "astro":
        return <Icons.astro className="w-4 h-4" />;
      case "svelte":
        return <Icons.svelteKit className="w-4 h-4" />;
      case "vue":
        return <Icons.nuxt className="w-4 h-4" />;
      case "tsx":
        return <Icons.solidStart className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    switch (tab) {
      case "next":
        setFmForTree("next");
        setFm("jsx");
        setCurrentPage("login.tsx");
        break;
      case "react":
        setFmForTree("react");
        setFm("jsx");
        setCurrentPage("login.tsx");
        break;
      case "svelte":
        setFm("html");
        setFmForTree("svelte");
        setCurrentPage("login.svelte");
        break;
      case "astro":
        setFm("js");
        setFmForTree("astro");
        setCurrentPage("login.astro");
        break;
      case "solid":
        setFm("jsx");
        setFmForTree("solid");
        setCurrentPage("login.tsx");
        break;
      case "nuxt":
        setFmForTree("nuxt");
        setFm("html");
        setCurrentPage("login.vue");
        break;
      default:
        break;
    }
  };

  const parsedContent = (content: string) => {
    let listsOfComments = Object.entries(enabledComp.additionals)
      .filter(([comment, enabled]) => enabled.visiblity)
      .map((curr) => curr[0]);
    const credentialLists =
      enabledComp.credentials.enabled &&
      !anyBool([enabledComp.otherSignIn.magicLink])
        ? credentialDep["enabled"]
        : [];
    let socialEnabledLists = Object.entries(enabledComp.socials)
      .filter(([comment, enabled]) => enabled)
      .map((curr) => curr[0]);

    socialEnabledLists = socialEnabledLists.length
      ? ["socialProviders"].concat(socialEnabledLists)
      : socialEnabledLists;

    Object.keys(UIFunctionDep).map((dep) => {
      if (socialEnabledLists.includes(dep)) {
        socialEnabledLists = [...socialEnabledLists, ...UIFunctionDep[dep]];
      }
    });
    console.log({ socialEnabledLists });
    let otherEnabledLists = Object.entries(enabledComp.otherSignIn)
      .filter(([comment, enabled]) => enabled)
      .map((curr) => curr[0]);
    // addng otherSignInOptions and the dependencies
    Object.keys(server_dep).map((dep) => {
      if (otherEnabledLists.includes(dep)) {
        otherEnabledLists = [...otherEnabledLists, ...server_dep[dep]];
      }
    });

    if (enabledComp.credentials.email && !enabledComp.otherSignIn.magicLink) {
      listsOfComments = [...listsOfComments, ...stateMap["email"]];
    }
    Object.keys(stateMap).map((state) => {
      if (listsOfComments.includes(state)) {
        listsOfComments = [...listsOfComments, ...stateMap[state]];
      }
    });
    console.log({ otherEnabledLists, listsOfComments });
    listsOfComments = [
      "empty",
      ...otherEnabledLists,
      ...listsOfComments,
      ...socialEnabledLists,
      ...credentialLists,
    ];
    let cleanedJsx = "";
    const replacableLists = Object.keys(commentMap);

    if (listsOfComments.length === 1) {
      cleanedJsx = replaceCommentsWithJSX(replacableLists, content, {
        eraseAll: true,
      });
    } else {
      cleanedJsx = importAndDistructureCleanup(
        "noDistructure",
        content,
        otherEnabledLists.length === 0,
      );
      cleanedJsx = importAndDistructureCleanup(
        "noLists",
        cleanedJsx,
        otherEnabledLists.length === 0,
      );
      cleanedJsx = replaceCommentsWithJSX(listsOfComments, cleanedJsx, {
        eraseAll: false,
      });

      cleanedJsx = replaceCommentsWithJSX(replacableLists, cleanedJsx, {
        eraseAll: true,
      });

      console.log({ cleanedJsx });
    }
    return cleanedJsx;
  };

  return (
    <div className="w-full flex flex-col -mt-2 ">
      <Tabs defaultValue="next" className="w-full flex justify-end items-end">
        <TabsList className="md:ml-[-5px] h-10 data-[state=active]:bg-background items-center justify-between md:justify-normal bg-tranparent gap-3 w-full md:w-fit  rounded-none">
          <div className="flex w-full justify-end items-end lg:hidden">
            <Select
              onValueChange={(e) => {
                console.log("THe mob val: ", e);
                handleTabClick(e);
              }}
            >
              <SelectTrigger className="w-[120px] rounded-none">
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectGroup>
                  <SelectLabel>Framework</SelectLabel>
                  <SelectItem
                    className="rounded-none hover:rounded-none"
                    value="next"
                  >
                    Nextjs
                  </SelectItem>
                  <SelectItem
                    disabled={true}
                    className="rounded-none hover:rounded-none"
                    value="react"
                  >
                    React
                  </SelectItem>
                  <SelectItem
                    disabled={true}
                    className="rounded-none hover:rounded-none"
                    value="svelte"
                  >
                    Svelte
                  </SelectItem>
                  <SelectItem
                    disabled={true}
                    className="rounded-none hover:rounded-none"
                    value="nuxt"
                  >
                    Nuxt
                  </SelectItem>
                  <SelectItem
                    disabled={true}
                    className="rounded-none hover:rounded-none"
                    value="solid"
                  >
                    Solid
                  </SelectItem>
                  <SelectItem
                    disabled={true}
                    className="rounded-none hover:rounded-none"
                    value="astro"
                  >
                    Astro
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:flex">
            <TabsTrigger
              className="flex py-3 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
              value="next"
              onClick={() => handleTabClick("next")}
            >
              <Icons.nextJS className="w-4 h-4" />
              NextJS
            </TabsTrigger>
            <TabsTrigger
              className="flex cursor-not-allowed py-3 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
              value="react"
              disabled={true}
              onClick={() => handleTabClick("react")}
            >
              <Icons.react className="w-4 h-4" />
              ReactJS
            </TabsTrigger>
            <TabsTrigger
              className="flex cursor-not-allowed py-3 data-[state=active]:text-white rounded-none gap-2 items-center  data-[state=active]:bg-stone-900"
              value="svelte"
              disabled={true}
              onClick={() => handleTabClick("svelte")}
            >
              <Icons.svelteKit />
              Svelte
            </TabsTrigger>
            <TabsTrigger
              className="flex cursor-not-allowed py-3 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900 "
              value="astro"
              disabled={true}
              onClick={() => handleTabClick("astro")}
            >
              <Icons.astro />
              Astro
            </TabsTrigger>
            <TabsTrigger
              className="flex cursor-not-allowed py-3 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
              value="solid"
              disabled={true}
              onClick={() => handleTabClick("solid")}
            >
              <Icons.solidStart />
              Solid{" "}
            </TabsTrigger>
            <TabsTrigger
              className="flex cursor-not-allowed py-3 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
              value="nuxt"
              disabled={true}
              onClick={() => handleTabClick("nuxt")}
            >
              <Icons.nuxt />
              Nuxt
            </TabsTrigger>
          </div>
        </TabsList>
      </Tabs>
      <hr className="bg-gray-200" />
      {Object.entries(codeExamples).map(
        ([framework, example]) =>
          framework === activeTab && (
            <div
              className="flex relative w-full gap-2 min-h-[60vh] "
              key={framework}
            >
              <div className="sticky w-48 sm:w-56 md:w-80 z-20 dark;backdrop-blur-2xl top-0 left-0">
                <FileTree
                  element={fmForTree}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
              <div className="w-full relative flex flex-col -ml-2 h-[70vh] overflow-x-hidden">
                <div className="w-full h-10 sticky top-0 left-0 bg-transparent border-b">
                  <div
                    className={`top-2 left-0 flex h-10 justify-between items-center px-3 py-2 text-sm w-fit md:w-56 cursor-pointer ${
                      true
                        ? "bg-stone-200 dark:bg-transparent border-r"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">
                        {getFileIconByExtension(currentPage)}
                      </div>
                      <span className="font-mono">{currentPage}</span>
                    </div>
                    <button className="ml-2 group p-1 rounded-full hover:bg-stone-600">
                      <X className="w-3 h-3 dark:group-hover:text-black group-hover:text-white" />
                    </button>
                  </div>

                  {getCode(currentPage) === "auth" ? (
                    <div className="relative">
                      <div className="z-20 absolute -top-[35px] right-14">
                        <Select
                          onValueChange={(e) => {
                            setDbOptions(e);
                          }}
                          defaultValue={dbOptions}
                        >
                          <SelectTrigger className="w-[80px] md:w-[180px] text-xs h-7 rounded-none">
                            <SelectValue placeholder="Select a adapter" />
                          </SelectTrigger>
                          <SelectContent className="text-xs rounded-none">
                            <SelectGroup>
                              <SelectLabel>Adapter</SelectLabel>
                              <hr className="mb-2 w-full h-[1.2px] bg-gray-600/30" />

                              <SelectItem
                                className="text-xs rounded-none"
                                value="prisma"
                              >
                                Prisma
                              </SelectItem>
                              <SelectItem
                                className="text-xs rounded-none"
                                value="drizzle"
                              >
                                Drizzle
                              </SelectItem>

                              <SelectLabel>Database</SelectLabel>
                              <hr className="mb-2 w-full h-[1.2px] bg-gray-600/30" />

                              <SelectItem
                                className="text-xs rounded-none"
                                value="mongoDb"
                              >
                                MongoDB
                              </SelectItem>
                              <SelectItem
                                className="text-xs rounded-none"
                                value="mysql"
                              >
                                MySql
                              </SelectItem>
                              <SelectItem
                                className="text-xs rounded-none"
                                value="postgres"
                              >
                                Postgres
                              </SelectItem>
                              <SelectItem
                                className="text-xs rounded-none"
                                value="libsql"
                              >
                                Libsql
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <CodeSnippet
                        language={fm}
                        code={parsedContent(example.code["auth"][dbOptions])}
                        key={framework}
                      />
                    </div>
                  ) : (
                    <CodeSnippet
                      language={fm}
                      code={parsedContent(example.code[getCode(currentPage)])}
                      key={framework}
                    />
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute rounded-none outline-none w-7 h-[27.8px] top-[5px] right-4"
                    onClick={() => {
                      getCode(currentPage) === "auth"
                        ? copyToClipboard(
                            parsedContent(example.code["auth"][dbOptions]),
                          )
                        : copyToClipboard(
                            parsedContent(example.code[getCode(currentPage)]),
                          );
                    }}
                  >
                    {copiedStates ? (
                      <Check className="h-1 w-1" />
                    ) : (
                      <Copy className="h-1 w-1" />
                    )}
                    <span className="sr-only">Copy code</span>
                  </Button>
                </div>
              </div>
            </div>
          ),
      )}
    </div>
  );
}
