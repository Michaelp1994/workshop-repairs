import { Upload, X } from "lucide-react";
import { forwardRef, useRef } from "react";

import { Button } from "./button";
import { FileInput, type FileInputProps } from "./file-input";

const ImageInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const validFile = props.value?.type.startsWith("image/");
    const preview = validFile ? URL.createObjectURL(props.value) : null;
    return (
      <div className="flex flex-row items-center gap-2 pb-2 pt-2">
        {validFile ? (
          <div className="relative">
            <img
              alt="Profile Photo"
              className="h-[100px] w-[100px] object-contain"
              src={preview}
            />
            <Button
              className="absolute right-0 top-0 h-6 w-6 rounded-full p-1"
              onClick={() => props.onChange?.(null)}
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
            onClick={() => inputRef.current?.click()}
            type="button"
            variant="secondary"
          >
            <Upload className="text-gray-400 transition-all group-hover:scale-125" />
          </Button>
        )}
        <div className="space-y-2">
          <FileInput
            accept="image/*"
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            {...props}
          />
        </div>
      </div>
    );
  },
);

ImageInput.displayName = "ImageInput";

export { ImageInput };
