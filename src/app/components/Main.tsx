"use client"

import Card from "./Card"
import useAxios from "../hooks/useAxios"
import { useEffect, useState } from "react"

export default function Main() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 9,
  })
  const [totalPages, setTotalPages] = useState(0)
  const [pokemonDetails, setPokemonDetails] = useState([])
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
        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url)
            return response.json()
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
    <div>
      <div className="grid grid-cols-3 gap-4">
        {loading || loadingDetails ? (
          <div>Loading...</div>
        ) : (
          pokemonDetails.map((pokemon, index) => (
            <Card
              key={index}
              name={pokemon.name}
              imageUrl={pokemon.sprites.front_default}
              types={pokemon.types.map((type) => type.type.name)}
            />
          ))
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={pagination.pageIndex === 0}
          className="bg-primary hover:bg-primary/90 font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>{`Page ${pagination.pageIndex + 1} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={pagination.pageIndex === totalPages - 1}
          className="bg-primary hover:bg-primary/90 font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}
