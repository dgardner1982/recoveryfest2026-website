"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
}

export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const [thumbSrc, setThumbSrc] = useState(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)

  if (playing) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden ${className}`}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className={`group relative aspect-video w-full cursor-pointer overflow-hidden bg-foreground/10 ${className}`}
    >
      <img
        src={thumbSrc || "/placeholder.svg"}
        alt={`Thumbnail for ${title}`}
        crossOrigin="anonymous"
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => {
          if (thumbSrc.includes("maxresdefault")) {
            setThumbSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
          }
        }}
      />
      <div className="absolute inset-0 bg-foreground/20 transition-colors duration-300 group-hover:bg-foreground/35" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 shadow-xl transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <Play className="h-7 w-7 fill-primary text-primary md:h-8 md:w-8" aria-hidden="true" />
        </span>
      </span>
    </button>
  )
}
