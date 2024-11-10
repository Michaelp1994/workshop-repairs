import CTA from "./components/CTA";
import Customers from "./components/Customers";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Customers />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
