import { MessageCircleMore } from "lucide-react";

export default function Comments() {
  return (
    <div>
      <button className="flex gap-1 items-center">
        <MessageCircleMore color="black" size={24} />
        <span className="text-black">Comments</span>
      </button>
    </div>
  )
}
