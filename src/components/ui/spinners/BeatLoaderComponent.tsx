import { BeatLoader } from 'react-spinners'
import { useThemeStore } from '../../../store'
export default function BeatLoaderComponent() {
  const { theme } = useThemeStore()
  let color = theme === "light" ? "#000" : "#fff"
  return (
    <div className='w-full flex items-center justify-center'>
      <BeatLoader size={15} color={color} />
    </div>
  )
}