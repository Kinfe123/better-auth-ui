import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Home,
  Star,
  PlusCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useComponents, useUrl } from "@/lib/store";
import { useHistory } from "@/lib/history";

export function TopBar() {
  const { updateUrl, url } = useUrl();
  const { enabledComp } = useComponents();
  useEffect(() => {
    if (
      enabledComp.additionals.forgetPassword?.routing &&
      enabledComp.additionals.resetPassword?.routing
    ) {
      updateUrl({
        url: "http://localhost:3000/reset-password",
      });
    }
    if (enabledComp.additionals.forgetPassword?.routing) {
      updateUrl({
        url: "http://localhost:3000/forget-password",
      });
    }
  }, [enabledComp]);
  const pathSplitted = url.slice(7, url.length).split("/");
  const { histories, pushHistory, popHistory } = useHistory();
  useEffect(() => {
    const pathSplitted = url.slice(7, url.length).split("/");
    if (pathSplitted.length >= 2 && !histories.includes(pathSplitted[1])) {
      pushHistory(pathSplitted[1]);
    }
  }, [url]);
  useEffect(() => {
    if (histories.length === 0) {
      updateUrl({
        url: "http://localhost:3000",
      });
    } else {
      const currHistory = histories[histories.length - 1];
      updateUrl({
        url: `http://localhost:3000/${currHistory}`,
      });
    }
  }, [histories]);
  return (
    <div className="flex w-full mx-auto items-center space-x-2 mt-2 ml-2 bg-background p-2 shadow-md">
      <div className="flex space-x-1">
        <Button
          variant="ghost"
          disabled={pathSplitted.length === 1}
          onClick={() => {
            popHistory();
          }}
          size="icon"
          className="hover:rounded-full"
          title="Go back"
        >
          <ArrowLeft className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          // disabled={histories.length === 0}
          onClick={() => {}}
          className="hover:rounded-full"
          title="Go forward"
        >
          <ArrowRight className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" title="Refresh">
          <RefreshCw className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" title="Home">
          <Home className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex-grow">
        <div className="relative">
          <Input
            type="text"
            readOnly
            value={url}
            placeholder="Search or enter website name"
            className="w-full font-mono rounded-none text-sm font-light text-gray-400 pl-8 pr-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4"
              title="Bookmark this tab"
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
