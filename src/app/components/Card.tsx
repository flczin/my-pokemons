import Image from "next/image"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Ability, Stat, Type } from "../types/pokemon"

type PokeCard = {
  name: string
  imageUrl: Array<string>
  types: Type[]
  abilities: Ability[]
  stats: Stat[]
}

export default function Card(cardInfo: PokeCard) {
  return (
    <div className="flex flex-col items-center justify-center max-w-xs border-2 rounded-lg bg-accent">
      <div className="flex items-center justify-center">
        <Image
          priority={true}
          src={cardInfo.imageUrl[0]}
          width={200}
          height={200}
          alt={cardInfo.name + " sprite"}
        />
      </div>
      <div className="px-6 py-4">
        <div className="capitalize font-bold text-xl mb-2">{cardInfo.name}</div>
      </div>
      <Dialog>
        <DialogTrigger className="underline hover:text-blue-500 mb-1 *:cursor-pointer">
          See more...
        </DialogTrigger>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="capitalize">{cardInfo.name}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-row">
            <Image
              priority={true}
              src={cardInfo.imageUrl[1]}
              width={200}
              height={200}
              alt={cardInfo.name + " sprite"}
            />
            <ul className="m-0">
              <li>
                Types:{" "}
                {cardInfo.abilities
                  .map((type) => type.ability.name)
                  .join(", ") + "."}
              </li>
              <li>
                Abilities:{" "}
                {cardInfo.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ") + "."}
              </li>
              <li>
                Base Stats:
                <ul>
                  {cardInfo.stats.map((ability, index) => (
                    <li className="capitalize ml-4" key={index}>
                      {ability.stat.name}: {ability.base_stat}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
