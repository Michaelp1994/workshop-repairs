import { Button } from "@repo/ui/button";
import { FormDescription, FormMessage, useFormContext } from "@repo/ui/form";
import { Upload, X } from "@repo/ui/icons";
import { Input } from "@repo/ui/input";
import React, { type ChangeEvent, useRef, useState } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  setFile: (file: File) => void;
};

const FileInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, setFile, ...props }, ref) => {
    const form = useFormContext();
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<null | string>(null);

    function invalidFile(message: string) {
      handleRemoveFile();
      form.setError("logo", {
        message,
      });
    }

    function handleRemoveFile() {
      setPreview(null);
      setFile(null);
      onChange("");
    }

    async function handleUploadFile(event: ChangeEvent<HTMLInputElement>) {
      form.clearErrors("logo");

      if (!event.target.files) {
        invalidFile("Please select an image for your logo.");
        return;
      }
      const file = event.target.files[0];
      if (!file) {
        invalidFile("Please select an image for your logo.");
        return;
      }
      if (!file.type.startsWith("image")) {
        invalidFile("Must be an image file.");
        return;
      }

      if (file.size > 10_000_000) {
        invalidFile("Must be less than 10MB");
        return;
      }
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
      setFile(file);
      onChange?.(event);
    }

    return (
      <div className="flex flex-row items-center gap-2 pb-2 pt-2">
        {preview ? (
          <div className="relative">
            <img
              alt="Profile Photo"
              className="h-[100px] w-[100px] object-contain"
              src={preview}
            />
            <Button
              className="absolute right-0 top-0 h-6 w-6 rounded-full p-1"
              onClick={handleRemoveFile}
              size="icon"
              type="button"
              variant="destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            className="group h-[100px] w-[100px] border border-dashed border-gray-400"
            onClick={() => fileRef.current?.click()}
            type="button"
            variant="secondary"
          >
            <Upload className="text-gray-400 transition-all group-hover:scale-125" />
          </Button>
        )}

        <div className="space-y-2">
          <Input
            accept="image/*"
            ref={(e) => {
              ref(e);
              fileRef.current = e;
            }}
            type="file"
            {...props}
            onChange={handleUploadFile}
          />
          <FormDescription className="pl-2">
            Recommended size 1:1, up to 10MB.
          </FormDescription>
          <FormMessage className="pl-2" />
        </div>
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export default FileInput;
