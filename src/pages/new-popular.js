import Navbar from "@/components/Navbar"
import Row from "@/components/Row"
import { useEffect, useState } from "react"

const NewPopular = () => {
  const [content, setContent] = useState({
    trending: [],
    upcoming: [],
    nowPlaying: [],
    airingToday: [],
  })

  useEffect(() => {
    const fetchContent = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
      const BASE_URL = "https://api.themoviedb.org/3"

      try {
        const [trending, upcoming, nowPlaying, airingToday] = await Promise.all([
          fetch(
            `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
          fetch(
            `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`
          ).then((res) => res.json()),
        ])

        setContent({
          trending: trending.results,
          upcoming: upcoming.results,
          nowPlaying: nowPlaying.results,
          airingToday: airingToday.results,
        })
      } catch (error) {
        console.error("Error fetching content:", error)
      }
    }

    fetchContent()
  }, [])

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Navbar />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <div className="md:space-y-24">
          <h1 className="text-2xl md:text-4xl font-bold text-white pt-24">New & Popular</h1>
          <Row title="Trending Now" movies={content.trending} />
          <Row title="Upcoming Movies" movies={content.upcoming} />
          <Row title="Now Playing in Theaters" movies={content.nowPlaying} />
          <Row title="TV Shows Airing Today" movies={content.airingToday} />
        </div>
      </main>
    </div>
  )
}

export default NewPopular 