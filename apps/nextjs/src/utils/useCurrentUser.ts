import { useSession } from "@repo/auth/react";

export function useCurrentUser() {
  const session = useSession();

  function isCurrentUser(userId: number) {
    if (!session.data?.user) {
      console.error("no user");
      return false;
    }
    return session.data.user.id === userId.toString();
  }

  return {
    user: session.data?.user,
    isCurrentUser,
  };
}
