"use client";

import { authClient, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Email Sign Up
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString().trim();
    const image = formData.get("image")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
      toast.error("নাম, ইমেইল ও পাসওয়ার্ড পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        ...(image ? { image } : {}),
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        console.error("Sign up error:", error);
        return;
      }

      if (data) {
        toast.success("You are successfully registered!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign up error:", error);
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
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">
            সাইন আপ করুন
          </h1>
          <p className="text-base-content/60">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Sign Up Form */}
        <form className="card-body" onSubmit={handleSubmit}>
          <fieldset className="space-y-1.5">
            {/* Name */}
            <label htmlFor="name" className="label font-semibold">
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="আপনার নাম"
              autoComplete="name"
              className="input input-bordered w-full"
              required
            />

            {/* Profile Image */}
            <label htmlFor="image" className="label font-semibold">
              প্রোফাইল ছবি
            </label>
            <input
              id="image"
              name="image"
              type="url"
              placeholder="ছবির URL দিন (ঐচ্ছিক)"
              className="input input-bordered w-full"
            />

            {/* Email */}
            <label htmlFor="email" className="label font-semibold">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
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
                  placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                  autoComplete="new-password"
                  className="w-full border-0 bg-transparent outline-none"
                  required
                  minLength={8}
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
                    onPress={() =>
                      setIsVisible((prev) => !prev)
                    }
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn bg-red-800 text-white w-full mt-5"
            >
              {isLoading ? "অপেক্ষা করুন..." : "সাইন আপ করুন"}
            </button>
          </fieldset>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-4 text-center mt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-primary w-full"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              className="btn btn-primary w-full"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              Sign up with GitHub
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center mt-4 text-sm">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="link link-primary font-semibold"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

