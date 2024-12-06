// @ts-nocheck
"use client";

import {
  REACT_ELEMENTS,
  SVELTE_ELEMENTS,
  SOLID_ELEMENTS,
  NUXT_ELEMENTS,
  ASTRO_ELEMENTS,
  REMIX_ELEMENTS,
  NEXT_ELEMENTS,
} from "./element-strucuture";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Layout, Link2, FileText, X } from "lucide-react";
import { Icons } from "@/components/icons";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CodeSnippet } from "@/components/codeblock";
interface CodeExample {
  language: string;
  code: {
    [file: string]: string;
  };
}

interface ComponentShowcaseProps {
  component: React.ReactNode;
  docLink?: string;
  codeExamples: {
    next: CodeExample;
    react: CodeExample;
    svelte: CodeExample;
    astro: CodeExample;
    solid: CodeExample;
    nuxt: CodeExample;
  };
  title: string;
}

export function ComponentShowcase({
  component,
  codeExamples,
  title,
  docLink,
}: ComponentShowcaseProps) {
  const [copiedStates, setCopiedStates] = useState({
    react: false,
    svelte: false,
    astro: false,
    nuxt: false,
    solid: false,
  });
  const [fm, setFm] = useState("react");
  const [defaultFm, setDefaultFm] = useState("");
  const [fmForTree, setFmForTree] = useState("next");
  const [isPrev, setIsPrev] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const copyToClipboard = (
    text: string,
    framework: keyof typeof copiedStates,
  ) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates((prev) => ({ ...prev, [framework]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [framework]: false }));
      }, 2000);
    });
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsPrev(false);
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
        // setIsPrev((prev) => !prev);
        break;
    }
  };
  useEffect(() => {
    console.log({ isPrev });
  }, [isPrev]);
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

  const [currentPage, setCurrentPage] = useState("login.tsx");
  function getCode(value: string) {
    const fileName = value.split(".")[0];
    return fileName;
  }
  return (
    <Card className="w-full bg-transparent max-w-7xl mx-auto rounded-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`https://better-auth/${docLink}`}>
                  <Link2 className="w-4 h-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reference Docs</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="w-full border-b border-gray-200/50 dark:border-white/10">
          <div className="w-full md:ml-[-2px]  py-2 px-3  flex gap-10 items-center justify-between lg:justify-normal  rounded-none">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className=" md:ml-[-5px] data-[state=active]:bg-background items-center justify-between lg:justify-normal bg-tranparent gap-3 w-full lg:w-fit  rounded-none">
                <TabsTrigger
                  className="rounded-none py-2  data-[state=active]:text-white flex  items-center gap-2 data-[state=active]:bg-stone-900 "
                  value="preview"
                  onClick={() => {
                    setIsPrev(true);
                    setActiveTab("preview");
                  }}
                >
                  <Layout className="w-4 h-4" />
                  Preview
                </TabsTrigger>
                <div className="mx-5">
                  <div className="hidden md:block w-[1px] h-[30px] z-20 bg-black/50 dark:bg-white/20"></div>
                </div>
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
                <div className="hidden lg:flex">
                  <TabsTrigger
                    className="flex py-2 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
                    value="next"
                    onClick={() => handleTabClick("next")}
                  >
                    <Icons.nextJS className="w-4 h-4" />
                    NextJS
                  </TabsTrigger>
                  <TabsTrigger
                    className="flex py-2 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
                    value="react"
                    disabled={true}
                    onClick={() => handleTabClick("react")}
                  >
                    <Icons.react className="w-4 h-4" />
                    ReactJS
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={true}
                    className="flex py-2 data-[state=active]:text-white rounded-none gap-2 items-center  data-[state=active]:bg-stone-900"
                    value="svelte"
                    onClick={() => handleTabClick("svelte")}
                  >
                    <Icons.svelteKit />
                    Svelte
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={true}
                    className="flex py-2 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900 "
                    value="astro"
                    onClick={() => handleTabClick("astro")}
                  >
                    <Icons.astro />
                    Astro
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={true}
                    className="flex py-2 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
                    value="solid"
                    onClick={() => handleTabClick("solid")}
                  >
                    <Icons.solidStart />
                    Solid{" "}
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={true}
                    className="flex  py-2 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
                    value="nuxt"
                    onClick={() => handleTabClick("nuxt")}
                  >
                    <Icons.nuxt />
                    Nuxt
                  </TabsTrigger>
                </div>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <Tabs defaultValue="preview" className="w-full ">
          {isPrev && (
            <TabsContent value="preview" className="p-4 gap-2 rounded-none">
              <main className="border-none overflow-hidden bg-gray-50 dark:bg-gradient-to-tr dark:from-black dark:via-black/95 dark:to-black/90">
                <div className="flex items-center justify-center p-6 lg:p-8">
                  {component}
                </div>
              </main>
            </TabsContent>
          )}
          <div className="block md:hidden">
            {Object.entries(codeExamples).map(
              ([framework, example]) =>
                defaultFm === framework && (
                  <CodeSnippet
                    language={fm}
                    code={example.code[getCode(currentPage)]}
                    key={framework}
                  />
                ),
            )}
          </div>
          {Object.entries(codeExamples).map(
            ([framework, example]) =>
              framework === activeTab && (
                <div
                  className="flex relative w-full gap-2 min-h-[60vh] "
                  key={framework}
                >
                  <div className="sticky border w-32 sm:w-48 md:overflow-x-hidden md:w-64 z-20 dark:backdrop-blur-2xl top-0 left-0">
                    <FileTree
                      element={fmForTree}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>

                  <div className="w-full border border-white/10 -mb-6 pb-5 relative flex flex-col -ml-2 h-[70vh] overflow-x-hidden">
                    <div className="w-full h-10 sticky top-0 left-0 bg-transparent border-b border-white/10">
                      <div
                        className={`border-r h-10 border-white/10 top-2 left-0 flex justify-between items-center px-3 py-2 text-sm w-44 cursor-pointer ${
                          true
                            ? "bg-stone-200 dark:bg-transparent"
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
                      <CodeSnippet
                        language={fm}
                        code={example.code[getCode(currentPage)]}
                        key={framework}
                      />

                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute w-7 h-[27.8px] outline-none rounded-none top-[5px] right-4"
                        onClick={() =>
                          copyToClipboard(
                            example.code[getCode(currentPage)],
                            framework as keyof typeof copiedStates,
                          )
                        }
                      >
                        {copiedStates[
                          framework as keyof typeof copiedStates
                        ] ? (
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
        </Tabs>
      </CardContent>
    </Card>
  );
}

import { Tree } from "@/components/file-tree";
import { RenderElements } from "./element-render";
import { useCodeComponent } from "../constants/store";
import { useComponents } from "@/lib/store";
export function FileTree({
  element,
  setCurrentPage,
  setCurrentSlug,
  currentSlug,
  currentPage,
}: {
  element: string;
  currentPage: string;
  currentSlug: string;
  setCurrentSlug: (value: string) => void;
  setCurrentPage: (value: string) => void;
}) {
  let FM = null;
  const { code } = useCodeComponent();
  const { enabledComp } = useComponents();
  console.log("Hello wold", currentPage);
  switch (element) {
    case "next":
      FM = NEXT_ELEMENTS;
      const comps = FM[0].children
        .filter((file) => file.name === "components")
        .map((file) => file.children)[0];
      const forgetCompExistsIndx = comps.findIndex(
        (comp) => comp.name === "forgetPassword.tsx",
      );
      console.log({ forgetCompExistsIndx });
      const resetCompExistsIndx = comps.findIndex(
        (comp) => comp.name === "resetPassword.tsx",
      );
      const forgetExists = code.next?.components.forgetPassword?.length === 0;
      const forgetOn = enabledComp.additionals.forgetPassword?.visiblity;
      const resetOn = enabledComp.additionals.resetPassword?.visiblity;
      const resetExists = code.next?.components.resetPassword?.length === 0;
      if (forgetOn && !forgetExists && forgetCompExistsIndx === -1) {
        FM[0].children[1].children.push({
          id: Math.random().toString(),
          isSelectable: true,
          name: "forgetPassword.tsx",
        });
      }
      if (!forgetOn && forgetCompExistsIndx !== -1) {
        FM[0].children[1].children.pop(forgetCompExistsIndx);
      }
      if (resetOn && !resetExists && resetCompExistsIndx === -1) {
        FM[0].children[1].children.push({
          id: Math.random().toString(),
          isSelectable: true,
          name: "resetPassword.tsx",
        });
      }
      if (!resetOn && resetCompExistsIndx !== -1) {
        FM[0].children[1].children.pop(resetCompExistsIndx);
      }
      break;
    case "react":
      FM = REACT_ELEMENTS;
      break;
    case "svelte":
      FM = SVELTE_ELEMENTS;
      break;
    case "astro":
      FM = ASTRO_ELEMENTS;
      break;
    case "remix":
      FM = REMIX_ELEMENTS;
      break;
    case "solid":
      FM = SOLID_ELEMENTS;
      break;
    case "nuxt":
      FM = NUXT_ELEMENTS;
      break;
    default:
      FM = REACT_ELEMENTS;
  }

  return (
    <div className="relative ml-1 border-l-0 flex h-full w-full font-mono flex-col items-center justify-center overflow-hidden rounded-none border border-t-0 border-b-0 bg-background dark:md:shadow-2xl">
      <Tree
        className="p-2 overflow-hidden rounded-md bg-background "
        initialSelectedId="6"
        initialExpandedItems={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
        ]}
        elements={FM}
      >
        <RenderElements
          currentSlug={currentSlug}
          currentPage={currentPage}
          elements={FM}
          setCurrentSlug={setCurrentSlug}
          setCurrentPage={setCurrentPage}
        />
      </Tree>
    </div>
  );
}
