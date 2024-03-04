"use client"

import Card from "./Card"
import useAxios from "../hooks/useAxios"
import { useEffect, useState } from "react"
import { Pokemon } from "../types/pokemon"

export default function Main() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  })
  const [totalPages, setTotalPages] = useState(0)
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([])
  const [loadingDetails, setLoadingDetails] = useState(false)

  const [{ data, loading }, refetch] = useAxios({
    url: "/pokemon",
    params: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    },
    method: "get",
  })

  useEffect(() => {
    if (data && data.results) {
      setLoadingDetails(true)
      const fetchDetails = async () => {
        const details: Array<Pokemon> = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const response = (await fetch(pokemon.url)).json()
            return response
          })
        )

        setPokemonDetails(details)
        setLoadingDetails(false)
      }
      fetchDetails()
    }
  }, [data])

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.count / pagination.pageSize))
    }
  }, [data, pagination.pageSize])

  const handlePrevPage = () => {
    if (pagination.pageIndex > 0) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))
    }
  }

  const handleNextPage = () => {
    if (pagination.pageIndex < totalPages - 1) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 p-5">
        {loading || loadingDetails ? (
          <div>Loading...</div>
        ) : (
          pokemonDetails.map((pokemon: Pokemon, index) => (
            <Card
              key={index}
              name={pokemon.name}
              imageUrl={[
                pokemon.sprites.front_default,
                pokemon.sprites.other.home.front_default,
              ]}
              types={pokemon.types}
              abilities={pokemon.abilities}
              stats={pokemon.stats}
            />
          ))
        )}
      </div>
      <div className="flex justify-center p-4">
        <button
          onClick={handlePrevPage}
          disabled={pagination.pageIndex === 0}
          className="bg-primary hover:bg-primary/90 font-bold p-2 rounded"
        >
          Previous
        </button>
        <span className="p-2">{`Page ${
          pagination.pageIndex + 1
        } of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={pagination.pageIndex === totalPages - 1}
          className="bg-primary hover:bg-primary/90 font-bold p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}
