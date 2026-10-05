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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
      callbackURL: "/",
    });
    if (data) {
      toast.success("You are successfully logged in!");
      console.log(data);
    }
    if (error) {
      toast.error(error.message as string);
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await signIn.social({
      provider: "google",
    });
    console.log(data, error);
  };
  const handleGithubSignIn = async () => {
    const { data, error } = await signIn.social({
      provider: "github",
    });
    console.log(data, error);
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">স্বাগতম</h1>
          <p className="mt-2 text-base-content/60">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </p>
        </div>

        {/* Card */}
        <div>
          <form className="card-body" onSubmit={handleSubmit}>
            <fieldset className="space-y-2">
              {/* Email */}
              <label className="label font-semibold">ইমেইল</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল"
                className="input input-bordered w-full"
              />

              {/* Password */}
              <TextField name="password">
                <Label>পাসওয়ার্ড</Label>

                <InputGroup className="input input-bordered w-full">
                  <InputGroup.Input
                    type={isVisible ? "text" : "password"}
                    placeholder="আপনার পাসওয়ার্ড"
                    autoComplete="new-password"
                    className="w-full border-0 bg-transparent outline-none focus:border-0 focus:outline-none focus:ring-0"
                  />

                  <InputGroup.Suffix className="pe-1">
                    <Button
                      isIconOnly
                      aria-label={isVisible ? "Hide password" : "Show password"}
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
                <a className="link link-primary text-sm">
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="btn bg-red-800 text-white w-full mt-4"
              >
                সাইন ইন করুন
              </button>
            </fieldset>

            <div className="grid grid-cols-1 gap-4 text-center mt-2">
              <div>
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-primary"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  Sign in with Google
                </button>
              </div>

              <div>
                <button
                  onClick={handleGithubSignIn}
                  className="btn btn-primary"
                >
                  <FaGithub className="w-5 h-5 mr-2" />
                  Sign in with Github
                </button>
              </div>
            </div>

            {/* Sign Up */}
            <p className="text-center mt-4 text-sm">
              অ্যাকাউন্ট নেই?{" "}
              <Link href="/sign-up" className="link link-primary font-semibold">
                সাইন আপ করুন
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
