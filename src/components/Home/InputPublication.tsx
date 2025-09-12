import { Icon } from "@iconify/react";

export default function InputPublication() {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
      <input type="text" className="w-full p-2 rounded focus:outline-none" placeholder="Escribir nueva publicación" value={""} />
      <div className="flex gap-4 text-gray-400">
        <Icon icon="mdi:image-outline" width="24" height="24" />
        <Icon icon="mdi:format-list-bulleted" width="24" height="24" />
        <Icon icon="mdi:gif" width="24" height="24" />
        <Icon icon="mdi:format-text" width="24" height="24" />
      </div>
    </div>
  )
}