import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="flex gap-2">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </main>
  );
}
