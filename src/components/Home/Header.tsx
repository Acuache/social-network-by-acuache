import { Icon } from "@iconify/react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-1 border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
      <h2>Inicio</h2>
      <div className="flex items-center">
        <p>(200) usuarios</p>
        <Icon icon="mage:dots" width="20" height="20" />
      </div>
    </header>
  )
}