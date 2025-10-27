import { createFileRoute } from "@tanstack/react-router";

import CTASection from "~/components/sections/CTA";
import Customers from "~/components/sections/Customers";
import FAQSection from "~/components/sections/FAQ";
import FeaturesSection from "~/components/sections/Features";
import HeroSection from "~/components/sections/Hero";
import Pricing from "~/components/sections/Pricing";
import PublicFooter from "~/components/sections/PublicFooter";
import PublicNavBar from "~/components/sections/PublicNavBar";

export const Route = createFileRoute("/(public)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PublicNavBar />
      <HeroSection />
      <FeaturesSection />
      <Customers />
      <Pricing />
      <FAQSection />
      <CTASection />
      <PublicFooter />
    </>
  );
}
