"use client";
import { useState, FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";

interface VideoSectionProps {
  imageSrc: string;
  videoSrc: string;
  altText: string;
}

const VideoSection: FC<VideoSectionProps> = ({ imageSrc, videoSrc, altText }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="relative">
      {!isVideoPlaying ? (
        <>
          <Image
            src={imageSrc}
            alt={altText}
            width={400}
            height={400}
            priority={false}
          />
          <div
            className="flex items-center text-secondary absolute top-[128px] left-[125px] cursor-pointer"
            onClick={() => setIsVideoPlaying(true)}
          >
            <p className="w-14 h-14 rounded-full bg-primary flex justify-center items-center z-50 shadow-lg">
              <CirclePlay className="w-8 h-8" />
            </p>
            <Button className="bg-primary rounded-full h-12 ml-[-32px] z-0 text-secondary">
              Play video
            </Button>
          </div>
        </>
      ) : (
        <iframe
            className="rounded-lg "
            width="400"
            height="333"
          src={videoSrc}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoSection;
