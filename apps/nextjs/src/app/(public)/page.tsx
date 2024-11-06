import CTA from "./components/CTA";
import Customers from "./components/Customers";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import PublicFooter from "./components/PublicFooter";
import PublicNavBar from "./components/PublicNavBar";

export default async function HomePage() {
  return (
    <>
      <PublicNavBar />
      <Hero />
      <Features />
      <Customers />
      <Pricing />
      <FAQ />
      <CTA />
      <PublicFooter />
    </>
  );
}
