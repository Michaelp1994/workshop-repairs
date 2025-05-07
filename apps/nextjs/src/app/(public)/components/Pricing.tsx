import { Button } from "@repo/ui/button";
import { Check } from "@repo/ui/icons";

const pricing = [
  {
    title: "Basic",
    description: "Perfect for small repair shops",
    price: "Free",
    features: [
      "Up to 50 assets",
      "Basic maintenance scheduling",
      "Email support",
    ],
  },
  {
    title: "Premium",
    price: "$15",
    description: "Ideal for growing businesses",
    features: [
      "Up to 500 assets",
      "Advanced analytics",
      "Priority email support",
    ],
  },
  {
    title: "Enterprise",
    price: "$30",
    description: "For large-scale operations",
    features: ["Unlimited assets", "Custom integrations", "24/7 phone support"],
  },
];

export default function Pricing() {
  return (
    <section
      className="w-full bg-gray-50 py-12 md:py-24 lg:py-32 dark:bg-gray-900"
      id="pricing"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Pricing Plans
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <div
              className="flex flex-col rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
              key={plan.title}
            >
              <h3 className="text-center text-2xl font-bold">{plan.title}</h3>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && (
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                )}
              </div>
              <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                {plan.description}
              </p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((feature) => (
                  <li className="flex items-center" key={feature}>
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6"
                variant={plan.title === "Professional" ? "default" : "outline"}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
