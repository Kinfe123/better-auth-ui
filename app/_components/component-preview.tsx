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
import React, { useState } from "react";
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
        setIsPrev((prev) => !prev);
        break;
    }
  };
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

        <div className="w-full  border-b-2 border-gray-900/50">
          <div className="md:ml-[-2px] py-2 px-3 bg-transparent flex gap-10 items-center justify-between md:justify-normal  rounded-none">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className=" md:ml-[-5px] data-[state=active]:bg-background items-center justify-between md:justify-normal bg-tranparent gap-3 w-full md:w-fit  rounded-none">
                <TabsTrigger
                  className="rounded-none py-2  data-[state=active]:text-white flex  items-center gap-2 data-[state=active]:bg-stone-900 "
                  value="preview"
                  onClick={() => {
                    setIsPrev((prv) => !prv);
                    setActiveTab("");
                  }}
                >
                  <Layout className="w-4 h-4" />
                  Preview
                </TabsTrigger>
                <div className="mx-5">
                  <div className="hidden md:block w-[1px] h-[30px] z-20 bg-black/50 dark:bg-white/20"></div>
                </div>
                <div className="hidden md:flex">
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
                    onClick={() => handleTabClick("react")}
                  >
                    <Icons.react className="w-4 h-4" />
                    ReactJS
                  </TabsTrigger>
                  <TabsTrigger
                    className="flex py-2 data-[state=active]:text-white rounded-none gap-2 items-center  data-[state=active]:bg-stone-900"
                    value="svelte"
                    onClick={() => handleTabClick("svelte")}
                  >
                    <Icons.svelteKit />
                    Svelte
                  </TabsTrigger>
                  <TabsTrigger
                    className="flex py-2 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900 "
                    value="astro"
                    onClick={() => handleTabClick("astro")}
                  >
                    <Icons.astro />
                    Astro
                  </TabsTrigger>
                  <TabsTrigger
                    className="flex py-2 data-[state=active]:text-white rounded-none gap-2 items-center data-[state=active]:bg-stone-900"
                    value="solid"
                    onClick={() => handleTabClick("solid")}
                  >
                    <Icons.solidStart />
                    Solid{" "}
                  </TabsTrigger>
                  <TabsTrigger
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
        <Tabs defaultValue="preview" className="w-full">
          {isPrev && (
            <TabsContent value="preview" className="p-4 gap-2 rounded-none">
              <main className="border-none overflow-hidden bg-gray-50 dark:bg-gradient-to-tr dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
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
                  <div className="sticky w-64 z-20 backdrop-blur-2xl top-0 left-0">
                    <FileTree
                      element={fmForTree}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                  <div className="w-full -ml-2 overflow-x-hidden">
                    <div
                      className={` top-2 left-0  flex items-center px-3 py-2 text-sm w-fit cursor-pointer ${
                        true ? "bg-stone-900" : "hover:bg-gray-700"
                      }`}
                    >
                      <div className="mr-2">
                        {getFileIconByExtension(currentPage)}
                      </div>
                      <span className="font-mono">{currentPage}</span>
                      <button className="ml-2 p-1 rounded-full hover:bg-gray-600">
                        <X className="w-3 h-3" />
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
                      className="absolute top-2 right-4"
                      onClick={() =>
                        copyToClipboard(
                          example.code[getCode(currentPage)],
                          framework as keyof typeof copiedStates,
                        )
                      }
                    >
                      {copiedStates[framework as keyof typeof copiedStates] ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </div>
              ),
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

import { File, Tree } from "@/components/file-tree";
import { RenderElements } from "./element-render";

export function FileTree({
  element,
  setCurrentPage,
  currentPage,
}: {
  element: string;
  currentPage: string;
  setCurrentPage: (value: string) => void;
}) {
  let FM = null;
  switch (element) {
    case "next":
      FM = NEXT_ELEMENTS;
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
    <div className="relative pr-10 flex h-full w-full font-mono flex-col items-center justify-center overflow-hidden rounded-none border border-t-0 border-b-0 border-l-0 bg-background md:shadow-2xl">
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
          currentPage={currentPage}
          elements={FM}
          setCurrentPage={setCurrentPage}
        />
      </Tree>
    </div>
  );
}
