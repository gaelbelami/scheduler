"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButtons";
import { useActionState, useState } from "react";
import { SettingsActions } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface SettingsFormProps {
  fullname: string;
  email: string;
  profileImage: string;
  username: string;
}

export function SettingsForm({
  fullname,
  email,
  profileImage,
  username,
}: SettingsFormProps) {
  const [lastResult, action] = useActionState(SettingsActions, undefined);
  const [currentProfileImage, setProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setProfileImage("");
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="John Doe"
              defaultValue={fullname}
              name={fields.fullname.name}
              key={fields.fullname.key}
            />
            <p className="text-red-500 text-sm">{fields.fullname.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              id="email"
              disabled
              placeholder="johndoe@gmail.com"
              defaultValue={email}
            />
          </div>
          <div>
            <Label htmlFor="username">Name</Label>
            <Input
              type="text"
              id="username"
              disabled
              placeholder="John Doe"
              defaultValue={username}
            />
          </div>
          <div className="grid gap-y-5">
            <Label> Profile Image </Label>
            <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage} />
            {currentProfileImage ? (
              <div className=" flex w-full items-center justify-center">
                <div className="relative w-36 h-36">
                  <img
                    src={currentProfileImage}
                    alt="Profile Image"
                    className="w-36 h-36 rounded-lg"
                  />{" "}
                  <Button
                    type="button"
                    className="absolute -top-3 -right-3"
                    onClick={handleDeleteImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className=" w-4/6 mx-auto min-h-96 border border-dashed  rounded-lg">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setProfileImage(res[0].url);
                    toast.success("Profile image uploaded successfully");
                  }}
                  onUploadError={(error) => {
                    console.log("Something went wrong", error);
                    toast.error(error.message);
                  }}
                />{" "}
              </div>
            )}
            <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
