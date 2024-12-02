import { IPost } from "@/types/post";
import Comments from "@/components/Comments";

export default function Post({ title, body, id }: IPost) {
  return (
    <div className="p-4 lg:p-6 flex flex-col gap-2 lg:gap-4 max-w-lg lg:max-w-xl rounded-lg bg-[#FADC07]">
      <h3 className="text-2xl text-black font-extrabold">{title}</h3>
      <div className="border border-gray-800" />
      <p className="text-gray-900">{body}</p>
      <div className="border border-gray-800" />
      <div>
        <Comments pid={id} />
      </div>
    </div>
  )
}
