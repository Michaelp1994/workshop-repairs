"use client";
import type {
  ConfirmFormInput,
  RegisterFormInput,
} from "@repo/validators/forms/auth.schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/client";

import ConfirmationForm from "./_components/ConfirmationForm";
import RegisterForm from "./_components/RegisterForm";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [user, setUser] = useState<null | { email: string; password: string }>(
    null,
  );
  const registerMutation = api.auth.register.useMutation({
    onSuccess(data) {
      setUser({ email: data.email, password: data.password });
      setStep(2);
    },
  });
  const confirmMutation = api.auth.confirmEmail.useMutation({
    onSuccess(data) {
      router.push("/dashboard");
    },
  });
  async function handleRegister(data: RegisterFormInput) {
    await registerMutation.mutateAsync(data);
  }

  async function handleConfirmation(data: ConfirmFormInput) {
    await confirmMutation.mutateAsync({
      user,
    });
  }

  if (step === 1) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your details below to register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onValid={handleRegister} />
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Confirmation</CardTitle>
          <CardDescription>
            Enter your details below to register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConfirmationForm onValid={handleConfirmation} />
        </CardContent>
      </Card>
    );
  }
}
