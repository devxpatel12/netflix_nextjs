// app/(auth)/signin/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign In</h2>
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                type="email"
                placeholder="Email or phone number"
                className="bg-[#333] border-none text-white h-14"
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="bg-[#333] border-none text-white h-14"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white h-14 text-lg">
                Sign In
              </Button>
              <div className="flex justify-between items-center text-[#b3b3b3]">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Link href="/help" className="hover:underline">
                  Need help?
                </Link>
              </div>
            </div>
            <div className="mt-10 text-[#737373]">
              <p>
                New to Netflix?{" "}
                <Link href="/signup" className="text-white hover:underline">
                  Sign up now
                </Link>
                .
              </p>
              <p className="mt-3 text-sm">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.{" "}
                <Link href="#" className="text-blue-500 hover:underline">
                  Learn more.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}