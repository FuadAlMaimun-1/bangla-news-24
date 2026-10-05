"use client";
import { authClient, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      toast.success("You are successfully registered!");
      console.log(data);
      redirect("/");
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
    <div className=" flex items-center justify-center mt-5">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">সাইন আপ করুন</h1>
          <p className="text-base-content/60">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>
        <div>
          <form className="card-body" onSubmit={handleSubmit}>
            <fieldset className="space-y-1.5">
              {/* Name */}
              <label className="label font-semibold">নাম</label>
              <input
                name="name"
                type="text"
                placeholder="আপনার নাম"
                className="input input-bordered w-full"
              />

              {/* Image */}
              <label className="label font-semibold">প্রোফাইল ছবি</label>
              <input
                name="image"
                type="url"
                placeholder="ছবির URL দিন"
                className="input input-bordered w-full"
              />

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

              {/* Button */}
              <button
                name="submit"
                type="submit"
                className="btn bg-red-800 text-white w-full mt-5"
              >
                সাইন আপ করুন
              </button>
            </fieldset>

            {/* Google Sign In */}
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
              {/* Github Sign In */}
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

            {/* Sign In Link */}
            <p className="text-center mt-4 text-sm">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link href="/sign-in" className="link link-primary font-semibold">
                সাইন ইন করুন
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
