import { GridPattern } from "@/components/landing/grid-pattern";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
export default function AuthUIHero() {
  return (
    <div className="min-h-[60vh] mb-[-8rem] flex items-center justify-center overflow-hidden no-visible-scrollbar px-6 md:px-0">
      <GridPattern
        className="absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-secondary/30 fill-neutral-100 dark:stroke-secondary/30 stroke-neutral-700/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        yOffset={-96}
        interactive
      />
      <main className="flex flex-col gap-4 row-start-2 items-center justify-center">
        <div className="flex flex-col gap-6">
          <h3 className="font-geist-mono uppercase font-bold text-4xl text-black dark:text-white text-center">
            Better Auth UI.
          </h3>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-md break-words text-sm md:text-base">
            Explore a tuned auth UI that you can copy / paste with{" "}
            <a
              href="https://better-auth.com"
              target="_blank"
              className="italic text-dark dark:text-white underline"
            >
              better-auth.
            </a>{" "}
            features and capabilities. <br />
          </p>
        </div>
        <div className="flex gap-2 h-[80px] items-center justify-center">
          <Link href="/builder">
            <button className="group flex justify-center items-center rounded-none gap-2 group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-neutral-900 duration-500 hover:duration-500  origin-left hover:decoration-2 hover:text-neutral-300 relative bg-neutral-900 px-5 py-2 border text-left p-3 text-gray-50 text-base font-normal overflow-hidden after:absolute after:z-10 after:w-10 after:h-10 after:content[''] after:bg-stone-300 after:-left-8 after:top-8 after:rounded-full after:blur-lg hover:after:animate-pulse">
              <LayoutDashboard className="w-4 h-4" />
              Build UI
            </button>
          </Link>

          <Link
            target="_blank"
            href="https://github.com/Kinfe123/better-auth-ui"
          >
            <button className="group flex justify-center items-center rounded-none gap-2 group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-neutral-900 duration-500 hover:duration-500 underline underline-offset-2 hover:underline hover:underline-offset-4 origin-left border-none hover:decoration-2 hover:text-neutral-300 relative bg-transparent px-3 py-2 border text-left p-3 text-gray-50 text-base font-normal overflow-hidden after:absolute after:z-10 after:w-10 after:h-10 after:content[''] after:bg-transparent after:-left-8 after:top-8 after:rounded-full after:blur-lg hover:after:animate-pulse">
              <svg
                className="w-4 h-4 fill-neutral-50"
                height="100"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 100 100"
                width="100"
                x="0"
                xmlns="http://www.w3.org/2000/svg"
                y="0"
              >
                <path
                  className="svg-fill-primary"
                  d="M50,1.23A50,50,0,0,0,34.2,98.68c2.5.46,3.41-1.09,3.41-2.41s0-4.33-.07-8.5c-13.91,3-16.84-6.71-16.84-6.71-2.28-5.77-5.55-7.31-5.55-7.31-4.54-3.1.34-3,.34-3,5,.35,7.66,5.15,7.66,5.15C27.61,83.5,34.85,81.3,37.7,80a10.72,10.72,0,0,1,3.17-6.69C29.77,72.07,18.1,67.78,18.1,48.62A19.34,19.34,0,0,1,23.25,35.2c-.52-1.26-2.23-6.34.49-13.23,0,0,4.19-1.34,13.75,5.13a47.18,47.18,0,0,1,25,0C72.07,20.63,76.26,22,76.26,22c2.72,6.89,1,12,.49,13.23a19.28,19.28,0,0,1,5.14,13.42c0,19.21-11.69,23.44-22.83,24.67,1.8,1.55,3.4,4.6,3.4,9.26,0,6.69-.06,12.08-.06,13.72,0,1.34.9,2.89,3.44,2.4A50,50,0,0,0,50,1.23Z"
                ></path>
              </svg>
              Github
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
