import { Input } from "@repo/ui/input";
import React, { type ChangeEvent, useEffect, useState } from "react";

export type FileInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  value?: File | null;
  onChange?: (file: File | null) => void;
};

const FileInput = ({ ref, value, onChange, ...props }: FileInputProps) => {
  const [fileName, setFileName] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newFile = event.target.files?.[0];
    if (!newFile) {
      onChange?.(null);
      setFileName("");
      return;
    }
    onChange?.(newFile);
    setFileName(event.target.value);
  }
  useEffect(() => {
    if (value === null) {
      setFileName("");
    }
  }, [value]);
  return (
    <Input
      onChange={handleChange}
      ref={ref}
      type="file"
      value={fileName}
      {...props}
    />
  );
};

FileInput.displayName = "InternalFileInput";

export { FileInput };
