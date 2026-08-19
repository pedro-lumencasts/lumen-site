/**
 * Homepage — section order per docs/build-sheet.md (the 12-section "NEW VARIATION").
 * Order is NOT final — see open decision #2 in CLAUDE.md.
 */

import { SiteNav } from "@/components/sections/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { SectionWork } from "@/components/sections/Section02Work";
import { SectionDifference } from "@/components/sections/Section03Difference";
import { SectionAI } from "@/components/sections/Section04AI";
import { SectionFormats } from "@/components/sections/Section05Formats";
import { SectionWhoFor } from "@/components/sections/Section06WhoFor";
import { SectionAudiences } from "@/components/sections/Section0708Audiences";
import { SectionPricing } from "@/components/sections/Section09Pricing";
import { SectionCTA } from "@/components/sections/Section10CTA";
import { SectionFAQ } from "@/components/sections/Section11FAQ";
import { SectionClose } from "@/components/sections/Section12Close";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <Hero />
        <div id="the-work" className="scroll-mt-16">
          <SectionWork />
        </div>
        <SectionDifference />
        <SectionAI />
        <div id="what-we-edit" className="scroll-mt-16">
          <SectionFormats />
        </div>
        <SectionWhoFor />
        <SectionAudiences />
        <SectionPricing />
        <SectionCTA />
        <SectionFAQ />
        <SectionClose />
      </main>
      <SiteFooter />
    </>
  );
}
