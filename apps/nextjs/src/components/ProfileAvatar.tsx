import { Avatar, AvatarFallback } from "@repo/ui/avatar";

export default function ProfileAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="bg-primary text-primary-foreground">
        MP
      </AvatarFallback>
    </Avatar>
  );
}
