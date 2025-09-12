import { PublicationHeader, PublicationComment, PublicationImage } from './'
export default function CardPublication() {
  return (
    <article className="border-y-2  border-gray-500/50 p-4">
      <PublicationHeader />
      <PublicationComment />
      <PublicationImage
        src='https://c8.alamy.com/comp/REKJ3D/sunset-at-gusong-bugis-REKJ3D.jpg'
      />

    </article>
  )
}