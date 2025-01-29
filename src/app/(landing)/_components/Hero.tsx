import { SignInButton } from "@/components/auth/signin-button";

export function Hero() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-6 py-56">
        <div className="mb-8 flex justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            horizonfocus is currently in development
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Empower your business to work smarter, and harder
          </h1>

          <p className="mt-6 sm:mt-8 text-pretty text-base text-gray-500 sm:text-lg md:text-xl mx-auto max-w-2xl">
            Our CRM is built to meet the unique needs of small and medium
            enterprises, helping you streamline operations, enhance customer
            relationships, and grow at your pace.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <SignInButton />

            <a
              href="#"
              className="text-sm font-semibold text-gray-900 flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
