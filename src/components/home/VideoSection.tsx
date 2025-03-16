"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import Button from "../ui/Button"

const videos = [
  {
    id: 1,
    title: "Summer Collection Showcase",
    description: "Explore our latest summer styles in action",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoSrc: "/placeholder.mp4",
    link: "/category/summer",
  },
  {
    id: 2,
    title: "How Our Products Are Made",
    description: "A behind-the-scenes look at our sustainable manufacturing process",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoSrc: "/placeholder.mp4",
    link: "/about",
  },
  {
    id: 3,
    title: "Styling Tips & Tricks",
    description: "Learn how to create amazing outfits with our pieces",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoSrc: "/placeholder.mp4",
    link: "/blog/styling-tips",
  },
]

export function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoClick = (id: number) => {
    if (activeVideo === id) {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
          setIsPlaying(false)
        } else {
          videoRef.current.play()
          setIsPlaying(true)
        }
      }
    } else {
      setActiveVideo(id)
      setIsPlaying(true)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
    }
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Watch & Discover</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our collections in action and get inspired with styling ideas and behind-the-scenes content.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="relative aspect-video rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {activeVideo !== null ? (
              <>
                <video
                  ref={videoRef}
                  src={videos.find((v) => v.id === activeVideo)?.videoSrc}
                  poster={videos.find((v) => v.id === activeVideo)?.thumbnail}
                  className="w-full h-full object-cover"
                  controls={false}
                  autoPlay
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => handleVideoClick(activeVideo)}
                >
                  {!isPlaying && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-black/50 p-5 rounded-full">
                      <Play className="h-10 w-10 text-white" />
                    </motion.div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{videos.find((v) => v.id === activeVideo)?.title}</h3>
                  <p className="text-white/80 text-sm">{videos.find((v) => v.id === activeVideo)?.description}</p>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Select a video to play</p>
              </div>
            )}
          </motion.div>

          <div className="space-y-4">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeVideo === video.id ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted"
                }`}
                onClick={() => handleVideoClick(video.id)}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: video.id * 0.1 }}
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      {activeVideo === video.id && isPlaying ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                    <Link
                      href={video.link}
                      className="text-sm text-primary font-medium inline-block mt-2 hover:underline"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button className="w-full mt-4" variant="outline" asChild>
                <Link href="/videos">View All Videos</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
