"use client";
import { useEffect, useRef, useState } from "react";
import ImageCard from "./imagecard";
import { Box, Button, Modal, Typography } from "@mui/material";
import Image from "next/image";

import PopUp from "./popup";
import { useSearchParams } from "next/navigation";

export type Image = {
  id: string;
  width: number;
  height: number;
  alt_description: string;
  blur_hash: string;
  urls: {
    regular: string;
    thumb: string;
  };
  likes: number;
  user: {
    name: string;
    username: string;
    profile_image: {
      medium: string;
    };
    social: {
      instagram_username: string;

      twitter_username: string;
    };
  };
  downloads: number;
  tags: [
    {
      title: string;
    }
  ];
  breadcrumbs: [
    {
      title: string;
      slug: string;
    }
  ];
};

interface GalleryProps {
  data?: [Image] | [];
  children?: React.ReactNode;
  // usedIn: "home" | "search";
}

const Gallery = ({ data, children }: GalleryProps) => {
  const searchParams = useSearchParams();
  const [imageList, setImageList] = useState<[Image] | []>(data ?? []);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const ref = useRef(null);

  useEffect(() => {
    if (page > 0) {
      getNextPage();
      // scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [page]);

  const handleOpen = (image: Image) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const getNextPage = async () => {
    if (page <= 0) return;
    const images = await fetch(
      `/api/search-images?page=${page}${
        searchParams.get("q") ? `&q=${searchParams.get("q")}` : ""
      }`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    if (!images.ok) {
      return [];
    }
    const data: { response: [Image] } = await images.json();
    setImageList([...data.response]);
  };

  return (
    <section
      className="mx-auto md:px-[10%] px-4 dark:bg-[#232323] dark:text-white"
      ref={ref}
    >
      {children}
      {/* images */}
      <div className="gap-4 md:gap-5 md:columns-3 columns-2 mt-14 ">
        {imageList?.map((image, index) => (
          <ImageCard
            key={image.id + index}
            image={image.urls.regular}
            author={image.user}
            likes={image.likes}
            blurDataURL={image.blur_hash}
            onClick={() => handleOpen(image)}
          />
        ))}
      </div>
      {/* next and previous */}
      <div className="flex justify-center gap-6 my-10">
        <button
          className="bg-[#F2F2F2] text-[#4F4F4F] px-5 py-2 rounded-lg dark:bg-[#333333] dark:text-[#F2F2F2]"
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          className="bg-[#F2F2F2] text-[#4F4F4F] px-5 py-2 rounded-lg dark:bg-[#333333] dark:text-[#F2F2F2]"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      <PopUp
        handleClose={handleClose}
        open={open}
        selectedImage={selectedImage}
      />
    </section>
  );
};

export default Gallery;
