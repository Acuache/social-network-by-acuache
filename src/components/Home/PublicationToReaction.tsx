import { Icon } from "@iconify/react";

export default function PublicationToReaction() {
  return (
    <div className="flex gap-4 items-center">
      <button className="text-gray-400 cursor-pointer hover:bg-[#4EB8E933] p-2 rounded-full">
        <Icon className="" icon="mdi:heart-outline" width={26} height={26} />
      </button>

      <button className="flex gap-2 items-center px-4 text-gray-400 cursor-pointer hover:bg-[#4EB8E933] p-2 rounded-full">
        <Icon className="" icon="mdi:comment-outline" width={26} height={26} />
        <span>Comentar</span>
      </button>
    </div>
  )
}