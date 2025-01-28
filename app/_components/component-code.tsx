// @ts-nocheck
import { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Layout,
  Copy,
  Check,
  FileText,
  X,
  Loader,
  Terminal,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { FileTree } from "./component-preview";
import { Button } from "@/components/ui/button";
import { CodeSnippet } from "@/components/codeblock";
import { previewComponent } from "../constants/components";
import { useCodeComponent } from "../constants/store";
import { useComponents } from "@/lib/store";
import {
  importAndDistructureCleanup,
  parseTokens,
} from "../builder/_components/lib/code-export";
import { parserTokenMap } from "../constants/templates/map";
import { cx } from "class-variance-authority";
import { serverClientDep } from "../constants/templates/server-client-dep";
import {
  actionUIDep,
  credentialDep,
  UIFunctionDep,
} from "../constants/templates/ui-function-dep";
import { stateMap } from "../constants/templates/state";
import { twoLevelComment } from "../constants/templates/two-level";
import { anyBool, generateCustomKey } from "@/lib/utils";
import { parsedNextContent } from "@/lib/parser/next";
import { registryExport } from "@/actions/registry";
import BottomToolbar from "@/components/bottom-toolbar";
export function CodeComponent() {
  const [fmForTree, setFmForTree] = useState("next");
  const [activeTab, setActiveTab] = useState("next");
  const [fm, setFm] = useState("jsx");
  const [currentPage, setCurrentPage] = useState("login.tsx");
  const [currentSlug, setCurrentSlug] = useState("login");
  const { code } = useCodeComponent();
  const { enabledComp } = useComponents();
  const [dbOptions, setDbOptions] = useState("prisma");
  const [copiedStates, setCopiedStates] = useState(false);

  const nextCode = {
    login_page: code.next?.pages.signin,
    signup_page: code.next?.pages.signup,
    login: code.next?.components.signin,
    signup: code.next?.components.signup,
    auth: code.next?.files.auth,
    client: code.next?.files.client,
    forgetPassword: code.next?.components.forgetPassword,
    resetPassword: code.next?.components.resetPassword,
    env: code.next?.files.env,
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
    setFmForTree(tab);
    switch (tab) {
      case "next":
        setFm("jsx");
        setCurrentPage("login.tsx");
        setCurrentSlug("login");
        break;
      case "react":
        setFm("jsx");
        setCurrentPage("login.tsx");
        setCurrentSlug("login");
        break;
      case "svelte":
        setFm("html");
        setCurrentPage("login.svelte");
        setCurrentSlug("login");
        break;
      case "astro":
        setFm("js");
        setCurrentPage("login.astro");
        setCurrentSlug("login");
        break;
      case "solid":
        setFm("jsx");
        setCurrentSlug("login");
        setCurrentPage("login.tsx");
        break;
      case "nuxt":
        setFm("html");
        setCurrentSlug("login");
        setCurrentPage("login.vue");
        break;
      default:
        break;
    }
  };
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleExport = async (example: any) => {
    const randomParts = generateCustomKey();
    const isForgetEnabled = enabledComp.additionals.forgetPassword?.visiblity;
    let fileData = [];
    if (isForgetEnabled) {
      fileData = [
        {
          path: "components/forgetPassword.tsx",
          content: parsedNextContent(
            example.code["forgetPassword"],
            enabledComp,
          ),
          type: "registry:component",
          target: "",
        },
        {
          path: "components/resetPassword.tsx",
          content: parsedNextContent(
            example.code["resetPassword"],
            enabledComp,
          ),
          type: "registry:component",
          target: "",
        },
      ];
    }
    const data = {
      id: randomParts,
      name: "better-auth-ui",
      type: "registry:component",
      title: "BetterAuth UI Component",
      description: "BetterAuth UI Component for your project",
      registryDependencies: ["cards", "button", "input", "tabs"],
      files: [
        {
          path: "components/login.tsx",
          content: parsedNextContent(example.code["login"], enabledComp),
          target: "",
          type: "registry:component",
        },
        {
          path: "components/signup.tsx",
          content: parsedNextContent(example.code["signup"], enabledComp),
          target: "",
          type: "registry:component",
        },
        {
          path: "lib/auth.ts",
          content: parsedNextContent(
            example.code["auth"][dbOptions],
            enabledComp,
          ),

          type: "registry:lib",
          target: "",
        },
        {
          path: "lib/client.tsx",
          content: parsedNextContent(example.code["client"], enabledComp),
          type: "registry:lib",
          target: "",
        },
        ...fileData,
      ],
    };
    startTransition(() => {
      registryExport(data)
        .then((res) => {
          setResult(res);
          setModalOpen(true);
          console.log({ res });
        })
        .catch((err) => {
          console.log({ err });
        });
    });
  };

  const highlightCommand = (command: string) => {
    const parts = command.split(" ");
    return (
      <span>
        <span className="text-yellow-400">{parts[0]}</span>{" "}
        <span className="text-blue-400">{parts[1]}</span>{" "}
        <span className="text-green-400">{parts[2]}</span>{" "}
        <span className="text-purple-400">{parts.slice(3).join(" ")}</span>
      </span>
    );
  };
  return (
    <div className="w-full flex flex-col -mt-2 ">
      <Dialog
        className="rounded-none"
        open={modalOpen && result !== null}
        onOpenChange={() => {
          setModalOpen(!modalOpen);
        }}
      >
        <DialogContent className="sm:rounded-none max-w-[350px] sm:max-w-[490px]">
          <DialogHeader>
            <DialogTitle>Install Component</DialogTitle>
            <DialogDescription>
              Run this command in your terminal to install the component.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 rounded-md bg-zinc-950 p-4">
            <div className="flex w-full relative items-start space-x-2">
              <Terminal className="h-4 w-4 shrink-0 text-zinc-500" />
              <div className="max-w-[250px] sm:max-w-[390px] overflow-x-auto scrollbar-thin scrollbar-track-zinc-900 [&::-webkit-scrollbar]:h-0.2  scrollbar-thumb-transparent">
                <pre className="font-mono w-fit overflow-x-scroll pb-2 text-sm whitespace-pre">
                  {highlightCommand(
                    `npx shadcn@latest add "https://better-auth.farmui.com/r/${result?.id.toString()}"`,
                  )}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="w-24 rounded-none"
              onClick={() => {
                copyToClipboard(
                  `npx shadcn@latest add "https://better-auth.farmui.com/r/${result?.id}"`,
                );
              }}
            >
              {copiedStates ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Tabs defaultValue="next" className="w-full flex justify-end items-end">
        <TabsList className="md:ml-[-5px] h-10 data-[state=active]:bg-background items-center justify-between md:justify-normal bg-tranparent gap-3 w-full md:w-fit  rounded-none">
          <div className="flex w-full justify-end items-end lg:hidden">
            <Select
              onValueChange={(e) => {
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
              <div className="sticky w-48 sm:w-56 md:w-80 z-20 dark:backdrop-blur-2xl top-0 left-0">
                <div className="flex relative justify-between h-full flex-col ">
                  <FileTree
                    currentSlug={currentSlug}
                    setCurrentSlug={setCurrentSlug}
                    element={fmForTree}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                  <Button
                    disabled={isPending}
                    onClick={() => handleExport(example)}
                    className=" absolute bottom-10 w-full left-[1.51px]  z-[99] rounded-none flex gap-2 items-center"
                  >
                    {isPending && <Loader className="w-4 h-4 animate-spin" />}
                    {isPending ? (
                      "Exporting..."
                    ) : (
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 shrink-0 text-zinc-900" />
                        Export
                      </div>
                    )}
                  </Button>
                </div>
              </div>
              <div className="w-full relative flex flex-col -ml-2 mb-12 h-[70vh] pb-10 overflow-x-hidden">
                <div className="w-full pl-1 h-10 sticky top-0 left-0 bg-transparent border-b">
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
                        code={parsedNextContent(
                          example.code["auth"][dbOptions],
                          enabledComp,
                        )}
                        key={framework}
                      />
                    </div>
                  ) : currentPage === ".env" ? (
                    <CodeSnippet
                      language={fm}
                      code={parsedNextContent(example.code["env"], enabledComp)}
                      key={framework}
                    />
                  ) : (
                    <CodeSnippet
                      language={fm}
                      code={parsedNextContent(
                        example.code[currentSlug],
                        enabledComp,
                      )}
                      key={framework}
                    />
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute rounded-none outline-none w-7 h-[27.8px] top-[5px] right-4"
                    onClick={() => {
                      copyToClipboard(
                        getCode(currentPage) === "auth"
                          ? parsedNextContent(
                              example.code["auth"][dbOptions],
                              enabledComp,
                            )
                          : parsedNextContent(
                              example.code[currentSlug],
                              enabledComp,
                            ),
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
