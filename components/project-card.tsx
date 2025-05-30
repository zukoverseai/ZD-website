"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  // Optional call-to-action URL for the project card; defaults to '#' when not provided
  ctaUrl?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  ctaUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Ref and state to manage visible tags and hidden count when tags wrap
  const measurerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const [hiddenCount, setHiddenCount] = useState(0);
  // State to track if tags list is expanded into a scrollable row
  const [expanded, setExpanded] = useState(false);
  // Ref for the scrollable tags container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Handle wheel events for horizontal scrolling of tags
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };
  // Determine number of tags to show in collapsed state, reserving one slot for the '+X more' badge if there are hidden tags
  const actualVisibleCount =
    !expanded && hiddenCount > 0 ? Math.max(visibleCount - 1, 0) : visibleCount;

  // Calculate how many tags fit in one line and the remaining hidden count, only updating state on change
  useEffect(() => {
    const calculateVisibleCount = () => {
      const measurer = measurerRef.current;
      if (!measurer) return;
      const children = Array.from(measurer.children) as HTMLElement[];
      if (children.length === 0) {
        if (visibleCount !== 0) setVisibleCount(0);
        if (hiddenCount !== 0) setHiddenCount(0);
        return;
      }
      // Determine y-position of first line of tags
      const firstTop = children[0].getBoundingClientRect().top;
      let count = 0;
      for (const child of children) {
        if (Math.abs(child.getBoundingClientRect().top - firstTop) < 1) {
          count++;
        }
      }
      const newVisible = count;
      const newHidden = tags.length - count;
      if (newVisible !== visibleCount) setVisibleCount(newVisible);
      if (newHidden !== hiddenCount) setHiddenCount(newHidden);
    };

    calculateVisibleCount();
    window.addEventListener("resize", calculateVisibleCount);
    return () => window.removeEventListener("resize", calculateVisibleCount);
  }, [expanded, tags.length]);

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card
        className="group relative h-full overflow-hidden border-[#1a1a2e] bg-[#0f0f1a] transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>

        <div className="relative h-full rounded-sm bg-[#0f0f1a] p-1">
          <Link href={ctaUrl || "#"} className="block relative" target="_blank" rel="noopener noreferrer">
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent"></div>
            </div>
          </Link>

          <div className="relative z-10 space-y-3 p-4" onWheel={handleWheel}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <div className="h-2 w-2 rounded-full bg-[#3ecef7] shadow-[0_0_8px_rgba(62,206,247,0.8)]"></div>
            </div>

            <p className="text-gray-400">{description}</p>
            <div className="pt-2">
              <Link
                href={ctaUrl || "#"}
                className="group inline-flex items-center text-sm font-medium text-[#7deb7d] transition-colors hover:text-[#5bc95b]"
                target="_blank" rel="noopener noreferrer"
              >
                <span>See for yourself</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Tags container with collapse/expand logic */}
            <div className="relative">
              {!expanded ? (
                <div className="flex gap-2 relative overflow-hidden">
                  {/* Invisible measurer to detect wrap */}
                  <div
                    ref={measurerRef}
                    className="absolute top-0 left-0 right-0 invisible flex flex-wrap gap-2"
                  >
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-[#3ecef7]/30 bg-[#0a0a12]/80 text-[#3ecef7] backdrop-blur-sm whitespace-nowrap"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {/* Visible tags */}
                  {tags.slice(0, actualVisibleCount).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-[#3ecef7]/30 bg-[#0a0a12]/80 text-[#3ecef7] backdrop-blur-sm whitespace-nowrap"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {/* Show '+x more' badge clickable */}
                  {hiddenCount > 0 && (
                    <Badge
                      onClick={() => setExpanded(true)}
                      variant="outline"
                      className="cursor-pointer border-[#3ecef7]/30 bg-[#0a0a12]/80 text-[#3ecef7] backdrop-blur-sm animate-pulse whitespace-nowrap"
                    >
                      +{hiddenCount} more
                    </Badge>
                  )}
                </div>
              ) : (
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto gap-2 items-center project-scroll scrollbar-thin scrollbar-thumb-[#3ecef7] scrollbar-track-[#0f0f1a]"
                >
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-[#3ecef7]/30 bg-[#0a0a12]/80 text-[#3ecef7] backdrop-blur-sm whitespace-nowrap"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {/* Collapse badge to revert back to one-line view */}
                  <Badge
                    onClick={() => setExpanded(false)}
                    className="cursor-pointer border-[#3ecef7]/30 bg-[#0a0a12]/80 text-[#3ecef7] backdrop-blur-sm whitespace-nowrap"
                    variant="outline"
                  >
                    Show less
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      <style jsx>{`
        .project-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .project-scroll::-webkit-scrollbar-track {
          background: #0f0f1a;
        }
        .project-scroll::-webkit-scrollbar-thumb {
          /* Blue-green gradient thumb */
          background: linear-gradient(to right, #3ecef7, #7deb7d);
          border-radius: 2px;
        }
      `}</style>
    </motion.div>
  );
}
