import { Upload, X } from "lucide-react";
import { useRef } from "react";
import { type MutableRefObject, type RefCallback } from "react";

import { Button } from "./button";
import { FileInput, type FileInputProps } from "./file-input";

type MutableRefList<T> = (
  | RefCallback<T>
  | MutableRefObject<T>
  | undefined
  | null
)[];

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
  return (val: T) => {
    setRef(val, ...refs);
  };
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
  refs.forEach((ref) => {
    if (typeof ref === "function") {
      ref(val);
    } else if (ref != null) {
      ref.current = val;
    }
  });
}

const ImageInput = ({ ref, ...props }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview =
    props.value && props.value?.type.startsWith("image/")
      ? URL.createObjectURL(props.value)
      : null;
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
        <FileInput accept="image/*" ref={mergeRefs(ref, inputRef)} {...props} />
      </div>
    </div>
  );
};

ImageInput.displayName = "ImageInput";

export { ImageInput };
