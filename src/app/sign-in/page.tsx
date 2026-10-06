
"use client";

import { signIn } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, InputGroup, Label, TextField } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email and Password Sign In
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign in failed");
        return;
      }

      if (data) {
        toast.success("You are successfully logged in!");
      }
    } catch (error) {
      console.error("Email sign-in error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed");
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub sign-in failed");
      }
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      toast.error("GitHub sign-in failed");
    }
  };

  return (
    <div className="flex items-center justify-center mt-5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">
            স্বাগতম
          </h1>

          <p className="mt-2 text-base-content/60">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </p>
        </div>

        <form className="card-body" onSubmit={handleSubmit}>
          <fieldset className="space-y-2">
            {/* Email */}
            <label htmlFor="email" className="label font-semibold">
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="new-email"
              placeholder="আপনার ইমেইল"
              className="input input-bordered w-full"
              required
            />

            {/* Password */}
            <TextField name="password">
              <Label>পাসওয়ার্ড</Label>

              <InputGroup className="input input-bordered w-full">
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড"
                  autoComplete="new-password"
                  className="w-full border-0 bg-transparent outline-none"
                  required
                />

                <InputGroup.Suffix className="pe-1">
                  <Button
                    type="button"
                    isIconOnly
                    aria-label={
                      isVisible ? "Hide password" : "Show password"
                    }
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible((prev) => !prev)}
                    className="text-gray-500 hover:bg-transparent"
                  >
                    {isVisible ? (
                      <Eye className="size-5" />
                    ) : (
                      <EyeSlash className="size-5" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="link link-primary text-sm"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            {/* Email Sign In */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn bg-red-800 text-white w-full mt-4"
            >
              {isLoading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
            </button>
          </fieldset>
        </form>

        {/* Social Sign In */}
        <div className="grid grid-cols-1 gap-4 text-center mt-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-primary w-full"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="btn btn-primary w-full"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            Sign in with GitHub
          </button>
        </div>

        {/* Sign Up */}
        <p className="text-center mt-4 text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="link link-primary font-semibold"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;

