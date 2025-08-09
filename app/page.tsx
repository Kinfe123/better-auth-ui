import AuthUIHero from "@/components/landing/hero";
import { ComponentDisplay } from "./_components/component-display";
import Section from "@/components/landing/sections";
export const metadata = {
  title: "Better Auth UI.",
};
const BetterAuthUI = () => {
  return (
    <div className="flex font-geist-sans  flex-col gap-2">
      <Section
        className="-z-1 mb-1  overflow-y-clip"
        crosses
        crossesOffset="lg:translate-y-[15.25rem]"
        customPaddings
        id="hero"
      >
        <div className="container relative mx-auto">
          <AuthUIHero />
          <div className="w-[calc(100%+13rem)] mx-auto -translate-x-1/2 left-1/2 absolute z-20 mb-10">
            <hr className="border-zinc-800/80" />
            <div className="relative z-20 h-8 w-[calc(100%-5.8rem)] ml-1 -translate-x-1/2 left-1/2 bg-[repeating-linear-gradient(-45deg,#e0f2fe,#e0f2fe_1px,transparent_1px,transparent_6px)] opacity-[8%]">
            </div>
            <hr className="border-zinc-800/80" />
          </div>
          <ComponentDisplay />
        </div>
      </Section>
    </div>
  );
};

export default BetterAuthUI;
