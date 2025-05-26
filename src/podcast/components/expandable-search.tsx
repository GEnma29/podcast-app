import { useState, useRef, useEffect } from "react"
import Search from "@/components/icons/search"
import { motion, AnimatePresence } from "framer-motion"
import useMediaQuery from "@/hooks/useMediaQuery"
interface ExpandableSearchProps {
  onSearch?: (query: string) => void
}

export default function ExpandableSearch({ onSearch }: ExpandableSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const width = isMobile ? 150 : 300


  const toggleSearch = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (onSearch) {
      const timer = setTimeout(() => {
        onSearch(searchValue.trim())
      }, 300) 

      return () => clearTimeout(timer)
    }
  }, [searchValue, onSearch])

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("button")
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  return (
    <div className="relative flex items-center justify-end">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: width, opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-10 pl-4 pr-10 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Search"
            />
            <button
              onClick={toggleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close search"
            >
              <Search />
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSearch}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Open search"
          >
            <Search />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}