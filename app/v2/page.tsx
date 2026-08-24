/**
 * /v2 — alternate STRUCTURE test, modelled on thebirdhouse.co's argument order.
 *
 * The homepage at / walks through the offer. This one is credibility-first: it
 * earns the right to keep talking before it explains anything, and it puts a CTA
 * in reach twice before the bottom of the page.
 *
 *   1 Headline        Hero
 *   2 Credibility     logo wall + numbers, then the before/after as demonstration
 *   3 Why us + CTA    the retention argument, the fit check, then the producer
 *   4 What we do      one recording → every format, then who we do it for
 *   5 Testimonials
 *   6 Our process     the four steps, then how the cutting decisions get made
 *   7 Pricing
 *   8 About us
 *   9 FAQ
 *
 * "Who this is for" and the experts/agencies cards are absorbed into 3 and 4
 * rather than standing alone. Pricing keeps its own section — published token
 * costs are the differentiator with agencies, and burying it in the FAQ the way
 * the reference does would throw that away.
 *
 * Sections are shared with the homepage: this file is an ordering, not a fork.
 */

import { SiteNav } from "@/components/sections/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { SectionCredibility } from "@/components/sections/SectionCredibility";
import { SectionWork } from "@/components/sections/Section02Work";
import { SectionDifference } from "@/components/sections/Section03Difference";
import { SectionWhoFor } from "@/components/sections/Section06WhoFor";
import { CTABand } from "@/components/sections/CTABand";
import { SectionAI, SectionProducer } from "@/components/sections/Section04AI";
import { SectionFormats } from "@/components/sections/Section05Formats";
import { SectionAudiences } from "@/components/sections/Section0708Audiences";
import { SectionTestimonials } from "@/components/sections/SectionTestimonials";
import { SectionProcess } from "@/components/sections/SectionProcess";
import { SectionPricing } from "@/components/sections/Section09Pricing";
import { SectionAbout } from "@/components/sections/SectionAbout";
import { SectionFAQ } from "@/components/sections/Section11FAQ";
import { SectionClose } from "@/components/sections/Section12Close";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function V2() {
  return (
    <>
      <SiteNav />
      <main id="top">
        {/* 1 · What we do, in one line */}
        <Hero />

        {/* 2 · Credibility — claimed, then demonstrated */}
        <SectionCredibility />
        <div id="the-work" className="scroll-mt-16">
          <SectionWork />
        </div>

        {/* 3 · Why us, the fit check, and the first CTA */}
        <SectionDifference />
        <SectionWhoFor />
        <CTABand
          eyebrow="No subscription"
          headline="Send one video and judge the edit."
          sub="Pay for the one video. If it isn't the edit you'd have made, you've lost one video."
        />
        {/* Bridges into 4 — the dark passage runs from here to ONE RECORDING */}
        <SectionProducer />

        {/* 4 · What we do */}
        <div id="what-we-edit" className="scroll-mt-16">
          <SectionFormats />
        </div>
        <SectionAudiences />

        {/* 5 · Proof from the people we did it for */}
        <SectionTestimonials />

        {/* 6 · How it actually runs, then the second CTA */}
        <SectionProcess />
        <SectionAI />
        <CTABand
          id="start"
          eyebrow="Still reading"
          headline="You've seen how we cut. Try it on your own footage."
          sub="One video, no commitment, nothing to renegotiate later."
        />

        {/* 7 · Pricing */}
        <SectionPricing />

        {/* 8 · About us */}
        <SectionAbout />

        {/* 9 · Questions */}
        <SectionFAQ />

        <SectionClose />
      </main>
      <SiteFooter />
    </>
  );
}
