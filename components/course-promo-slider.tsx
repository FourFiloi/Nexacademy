"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"
// Import Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import type { SwiperInstance } from "swiper"
// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { IoIosArrowForward } from "react-icons/io"

// Updated promotional cards with the new content and background images
const promoCards = [
  {
    id: 1,
    title: "Structured Roadmaps for Every Learner",
    subtitle: "Step-by-step learning paths to guide students from beginner to advanced with clarity and focus.",
    tags: ["NexPath", "Learning Paths"],
    backgroundImage: "/images/roadmap.png",
    emoji: "🧭",
  },
  {
    id: 2,
    title: "Live Classes with Expert Mentors",
    subtitle: "Attend real-time sessions, clear doubts instantly, and stay engaged through interactive learning.",
    tags: ["NexLive", "Expert Sessions"],
    backgroundImage: "/images/nexlive.png",
    emoji: "📺",
  },
  {
    id: 3,
    title: "Gamified Courses That Motivate You",
    subtitle: "Earn XP, unlock levels, and make learning feel like an adventure — one module at a time.",
    tags: ["NexPlay", "Gamification"],
    backgroundImage: "/images/gamified-course.png",
    emoji: "🎮",
  },
  {
    id: 4,
    title: "Learn Together, Grow Together",
    subtitle: "Join a collaborative community of learners where peer help, discussions, and growth never stop.",
    tags: ["NexHub", "Community"],
    backgroundImage: "/images/discuss.png",
    emoji: "🌐",
  },
]

// Remove this component since we're now embedding the button directly in each slide
// const ExploreButton = () => {
//   return (
//     <button className="flex h-10 w-[120px] items-center justify-center rounded-full bg-white text-[14px] font-medium text-black hover:bg-gray-100">
//       Explore
//       <ArrowRight className="ml-2 h-4 w-4" />
//     </button>
//   )
// }

export function CoursePromoSlider() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const paginationRef = useRef<HTMLDivElement>(null)

  // Handle manual navigation
  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext()
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Static navigation controls - positioned outside the Swiper component */}
      <div className="absolute right-4 top-4 z-20 flex items-center space-x-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={setSwiper}
        pagination={{
          el: paginationRef.current,
          clickable: true,
          bulletClass: "inline-block h-2 w-2 rounded-full bg-white/50 cursor-pointer",
          bulletActiveClass: "!bg-white",
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.pagination && typeof swiper.params.pagination !== "boolean") {
            swiper.params.pagination.el = paginationRef.current
          }
        }}
        className="w-full"
      >
        {promoCards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="relative h-[300px] w-full overflow-hidden">
              {/* Background Image */}
              <Image
                src={card.backgroundImage || "/placeholder.svg"}
                alt={card.title}
                fill
                className="object-cover"
                priority
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col md:flex-row">
                {/* Left side - Content */}
                <div className="flex w-full flex-col justify-between p-8 md:w-1/2">
                  {/* Main content */}
                  <div className="mt-auto mb-6 space-y-3">
                    <button className="mb-4 flex h-6 px-4 items-center justify-center rounded-full bg-white text-[12px] font-medium text-black hover:bg-gray-100 shadow-sm">
                      {card.tags[0]}
                    </button>
                    <h2 className="text-3xl font-medium text-white">{card.title}</h2>
                    <p className="text-sm leading-relaxed text-white/80 max-w-md">{card.subtitle}</p>

                    <button className="mt-4 flex items-center gap-2 rounded-full bg-black pl-5 pr-2 py-2 text-sm font-medium text-white hover:bg-black/80">
                      Explore
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                        <IoIosArrowForward className="h-3 w-3 text-black" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Right side - Visual space (empty as the background image already has visuals) */}
                <div className="relative w-full md:w-1/2">
                  {/* Empty space - the background image already has the visual elements */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination dots */}
      <div
        ref={paginationRef}
        className="absolute bottom-3 left-0 right-0 z-10 flex justify-center items-center space-x-2"
      />
    </div>
  )
}
