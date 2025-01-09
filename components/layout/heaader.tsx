import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="link">Home</Button>
        </Link>
        <Link href="/search">
          <Button variant="link">Search</Button>
        </Link>
      </div>
      <ThemeToggle />
    </header>
  );
}
