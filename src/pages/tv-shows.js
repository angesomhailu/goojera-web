import Navbar from "@/components/Navbar"
import Row from "@/components/Row"
import { useEffect, useState } from "react"

const TVShows = () => {
  const [shows, setShows] = useState({
    trending: [],
    popular: [],
    topRated: [],
    crime: [],
    drama: [],
  })

  useEffect(() => {
    const fetchShows = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
      const BASE_URL = "https://api.themoviedb.org/3"

      try {
        const [trending, popular, topRated, crime, drama] = await Promise.all([
          fetch(
            `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=80`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18`
          ).then((res) => res.json()),
        ])

        setShows({
          trending: trending.results,
          popular: popular.results,
          topRated: topRated.results,
          crime: crime.results,
          drama: drama.results,
        })
      } catch (error) {
        console.error("Error fetching TV shows:", error)
      }
    }

    fetchShows()
  }, [])

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Navbar />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <div className="md:space-y-24">
          <h1 className="text-2xl md:text-4xl font-bold text-white pt-24">TV Shows</h1>
          <Row title="Trending Now" movies={shows.trending} />
          <Row title="Popular on Netflix" movies={shows.popular} />
          <Row title="Top Rated" movies={shows.topRated} />
          <Row title="Crime TV Shows" movies={shows.crime} />
          <Row title="Drama Series" movies={shows.drama} />
        </div>
      </main>
    </div>
  )
}

export default TVShows 