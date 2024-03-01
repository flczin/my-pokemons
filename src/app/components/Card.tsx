import Image from "next/image"

type PokeCard = {
  name: string
  imageUrl: string
  types: Array<string>
}

export default function Card({ name, imageUrl, types }: PokeCard) {
  return (
    <div className="max-w-xs border-2 rounded-lg overflow-hidden shadow-lg">
      <Image src={imageUrl} width={200} height={200} alt={name + " sprite"} />
      <div className="px-6 py-4">
        <div className="capitalize font-bold text-xl mb-2">{name}</div>
        <ul className="capitalize text-sm">
          {types.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
