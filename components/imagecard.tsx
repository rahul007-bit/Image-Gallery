"use client";
import { Montserrat, Poppins } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });
const poppins = Poppins({ subsets: ["latin"], weight: "600", style: "italic" });
const ImageCard = ({
  image,
  author,
  likes,
  onClick,
}: {
  image: string;
  blurDataURL: string;
  author: {
    name: string;
    username: string;
    profile_image: {
      medium: string;
    };
  };
  onClick: () => void;
  likes: number;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="max-w-lg rounded-lg overflow-hidden border border-[#E5E5E5] dark:border-[#232323] mb-7">
      <Image
        className="w-full cursor-pointer"
        src={image}
        alt="Sunset in the mountains"
        width={500}
        height={500}
        loading="lazy"
        onClick={onClick}
      />

      <div className="lg:px-6 px-2 lg:py-4 py-3 grid grid-cols-2 justify-between dark:bg-[#141414]">
        <div className="flex items-center gap-2">
          <Image
            src={author.profile_image.medium}
            className="rounded-full lg:w-10 lg:h-10 w-5 h-5 bg-cover"
            alt=""
            width={40}
            height={40}
          />
          <div>
            <h2
              className={`${montserrat.className} text-[#4f4f4f] dark:text-white lg:text-xs text-[10px]`}
            >
              {author.name}
            </h2>
            <p
              className={`${poppins.className} text-[#a7a7a7] lg:text-[10px] text-[8px]`}
            >
              @{author.username}
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="dark:stroke-[#E5E5E5] stroke-[#4F4F4F]"
            >
              <path
                d="M4.36328 10.7042L6.17161 12.1042C6.40495 12.3375 6.92995 12.4542 7.27995 12.4542H9.49662C10.1966 12.4542 10.9549 11.9292 11.1299 11.2292L12.5299 6.97086C12.8216 6.15419 12.2966 5.45419 11.4216 5.45419H9.08828C8.73828 5.45419 8.44661 5.16252 8.50495 4.75419L8.79661 2.88752C8.91328 2.36252 8.56328 1.77919 8.03828 1.60419C7.57161 1.42919 6.98828 1.66252 6.75495 2.01252L4.36328 5.57086"
                // stroke="#E5E5E5"
                strokeMiterlimit="10"
              />
              <path
                d="M1.38818 10.7042V4.98748C1.38818 4.17082 1.73818 3.87915 2.55485 3.87915H3.13818C3.95485 3.87915 4.30485 4.17082 4.30485 4.98748V10.7042C4.30485 11.5208 3.95485 11.8125 3.13818 11.8125H2.55485C1.73818 11.8125 1.38818 11.5208 1.38818 10.7042Z"
                // stroke="#E5E5E5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p
            className={`${montserrat.className} text-[#4f4f4f] dark:text-white lg:text-xs text-[8px]`}
          >
            {likes && likes > 1000 ? (
              <span>{(likes / 1000).toFixed(1)}k</span>
            ) : (
              <span>{likes}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
