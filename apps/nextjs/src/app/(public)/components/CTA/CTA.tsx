import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="w-full bg-gray-900 py-12 text-white md:py-24 lg:py-32"
      id="cta"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Ready to Optimize Your Asset Management?
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl">
            Sign up and start benefiting from our platform today.
          </p>
          <div className="w-full max-w-sm space-y-2">
            <Button
              asChild
              className="bg-white text-gray-900 hover:bg-gray-200"
            >
              <Link href="/register">Get Started</Link>
            </Button>

            <p className="text-xs text-gray-400">
              By signing up, you agree to our{" "}
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
