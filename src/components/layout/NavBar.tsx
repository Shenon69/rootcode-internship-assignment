import { CircleUser } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold ml-2">&lt;Rootmedia /&gt;</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href={'/profile'}>
            <CircleUser size={30} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
