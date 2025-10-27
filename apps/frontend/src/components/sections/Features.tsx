import { BarChart, Cog, Shield } from "@repo/ui/icons";

export default function FeaturesSection() {
  return (
    <section
      className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800"
      id="features"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Key Features
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-white p-4 dark:bg-gray-900">
              <Cog className="h-10 w-10 text-gray-900 dark:text-gray-100" />
            </div>
            <h3 className="text-xl font-bold">Automated Maintenance</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Schedule and track maintenance tasks automatically to ensure
              equipment reliability.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-white p-4 dark:bg-gray-900">
              <BarChart className="h-10 w-10 text-gray-900 dark:text-gray-100" />
            </div>
            <h3 className="text-xl font-bold">Real-time Analytics</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Get insights into equipment performance and utilization with
              powerful analytics tools.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-white p-4 dark:bg-gray-900">
              <Shield className="h-10 w-10 text-gray-900 dark:text-gray-100" />
            </div>
            <h3 className="text-xl font-bold">Compliance Management</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Stay compliant with regulatory requirements through automated
              documentation and reporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
