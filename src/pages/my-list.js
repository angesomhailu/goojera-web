import Navbar from "@/components/Navbar"
import Row from "@/components/Row"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const MyList = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [myList, setMyList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push("/login")
      return
    }

    // For now, let's use local storage as a temporary solution
    // until we set up the backend API
    const savedList = localStorage.getItem('myList')
    if (savedList) {
      try {
        setMyList(JSON.parse(savedList))
      } catch (error) {
        console.error("Error parsing saved list:", error)
        setMyList([])
      }
    }
    setLoading(false)

    /* 
    // TODO: Implement this when backend is ready
    const fetchMyList = async () => {
      try {
        const response = await fetch('/api/my-list', {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        })
        const data = await response.json()
        setMyList(data.results)
      } catch (error) {
        console.error("Error fetching my list:", error)
        setMyList([])
      }
      setLoading(false)
    }

    fetchMyList()
    */
  }, [session, router])

  if (!session) return null
  if (loading) return <div>Loading...</div>

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Navbar />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <div className="md:space-y-24">
          <h1 className="text-2xl md:text-4xl font-bold text-white pt-24">My List</h1>
          {myList.length > 0 ? (
            <Row title="My Saved Movies & Shows" movies={myList} />
          ) : (
            <div className="text-white text-center mt-10">
              Your list is empty. Add some movies or shows to watch later!
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MyList 