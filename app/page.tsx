import AuthUIHero from "@/components/landing/hero";
import { ComponentDisplay } from "./_components/component-display";
import Section from "@/components/landing/sections";
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
        <div className="container mx-auto">
          <AuthUIHero />
          <ComponentDisplay />
        </div>
      </Section>
    </div>
  );
};

export default BetterAuthUI;
