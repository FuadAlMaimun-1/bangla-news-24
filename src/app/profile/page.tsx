"use client";

import { useSession, signOut, updateUser } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [show, setShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const showUpdateProfileModal = () => {
    setShow((prev) => !prev);
    setPreview(null);
  };

  // Browse করা image preview
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
      return;
    }

    // শুধু image allow
    if (!file.type.startsWith("image/")) {
      toast.error("শুধু image file নির্বাচন করুন");
      e.target.value = "";
      return;
    }

    // 2MB limit
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size 2MB-এর মধ্যে হতে হবে");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const imageUrl = String(formData.get("image") ?? "").trim();

    const imageFile = formData.get("imageFile") as File | null;

    if (!name) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setIsUpdating(true);

    try {
      let finalImage = imageUrl;

      // Browse করা image থাকলে
      if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();

        finalImage = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            resolve(reader.result as string);
          };

          reader.onerror = () => {
            reject(new Error("Image read failed"));
          };

          reader.readAsDataURL(imageFile);
        });
      }

      const { error } = await updateUser({
        name,
        ...(finalImage ? { image: finalImage } : {}),
      });

      if (error) {
        toast.error(
          error.message || "প্রোফাইল আপডেট করা যায়নি"
        );
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      setShow(false);
      setPreview(null);

      // Session/UI refresh
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    signOut()
    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("You are successfully signed out!");

      window.location.href = "/sign-in";
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  if (isPending) {
    return (
      <div className="mt-15 text-center">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-10 text-center">
        <p>আপনি সাইন ইন করেননি।</p>

        <Link
          href="/sign-in"
          className="mt-4 inline-block rounded-lg bg-red-700 px-5 py-2 text-white"
        >
          সাইন ইন
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-lg sm:p-8">

      {/* Profile */}
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row">

        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-red-500 ring-offset-2">

          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "Profile picture"}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">

          <h2 className="text-xl font-bold">
            Name: {user.name}
          </h2>

          <p className="mt-1 break-all text-sm text-gray-500">
            Email: {user.email}
          </p>

        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full flex-col gap-3 sm:flex-row">

        <button
          type="button"
          onClick={showUpdateProfileModal}
          className="flex-1 rounded-xl bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-800"
        >
          প্রোফাইল আপডেট
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="flex-1 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-700 transition hover:bg-red-50"
        >
          সাইন আউট
        </button>

      </div>

      {/* Update Form */}
      {show && (
        <div className="w-full border-t border-gray-200 pt-6">

          <h3 className="mb-5 text-lg font-bold">
            আপনার প্রোফাইল পরিবর্তন করুন
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Name */}
            <fieldset className="space-y-1.5">

              <label
                htmlFor="name"
                className="font-semibold"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                placeholder="আপনার নতুন নাম লিখুন"
                required
                className="input input-bordered w-full"
              />

            </fieldset>

            {/* Image */}
            <fieldset className="space-y-3">

              <label
                htmlFor="image"
                className="font-semibold"
              >
                প্রোফাইল ছবি
              </label>

              {/* URL */}
              <input
                id="image"
                name="image"
                type="url"
                autoComplete="off"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
              />

              <div className="text-center text-sm text-gray-500">
                অথবা
              </div>

              {/* Browse */}
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />

              {/* Preview */}
              {preview && (
                <div className="mt-3 flex justify-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-red-500">
                    <Image
                      src={preview}
                      alt="New profile preview"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

            </fieldset>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">

              <button
                type="submit"
                disabled={isUpdating}
                className="flex-1 rounded-lg bg-red-800 px-4 py-3 font-semibold text-white hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating
                  ? "আপডেট হচ্ছে..."
                  : "প্রোফাইল আপডেট করুন"}
              </button>

              <button
                type="button"
                onClick={showUpdateProfileModal}
                className="rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-100"
              >
                বাতিল
              </button>

            </div>

          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProfilePage;