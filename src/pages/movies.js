import Navbar from "@/components/Navbar"
import Row from "@/components/Row"
import { useEffect, useState } from "react"

const Movies = () => {
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
  })

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
      const BASE_URL = "https://api.themoviedb.org/3"

      try {
        const [trending, popular, topRated, action, comedy, horror] = await Promise.all([
          fetch(
            `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`
          ).then((res) => res.json()),
        ])

        setMovies({
          trending: trending.results,
          popular: popular.results,
          topRated: topRated.results,
          action: action.results,
          comedy: comedy.results,
          horror: horror.results,
        })
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Navbar />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <div className="md:space-y-24">
          <h1 className="text-2xl md:text-4xl font-bold text-white pt-24">Movies</h1>
          <Row title="Trending Now" movies={movies.trending} />
          <Row title="Popular on Netflix" movies={movies.popular} />
          <Row title="Top Rated" movies={movies.topRated} />
          <Row title="Action Movies" movies={movies.action} />
          <Row title="Comedy Movies" movies={movies.comedy} />
          <Row title="Horror Movies" movies={movies.horror} />
        </div>
      </main>
    </div>
  )
}

export default Movies 