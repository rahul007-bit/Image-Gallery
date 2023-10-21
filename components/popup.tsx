import { Montserrat, Poppins } from "next/font/google";
import { Image as UnsplashImage } from "./gallery";
import { Modal } from "@mui/material";
import Image from "next/image";
const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });
const montserratMedium = Montserrat({ subsets: ["latin"], weight: "500" });
const poppins = Poppins({ subsets: ["latin"], weight: "600", style: "italic" });

const PopUp = ({
  open,
  selectedImage,
  handleClose,
}: {
  open: boolean;
  selectedImage: UnsplashImage | null;
  handleClose: () => void;
}) => {
  return (
    <Modal
      keepMounted
      open={open && selectedImage !== null}
      onClose={handleClose}
      disableAutoFocus={true}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <div className="max-w-[400px] md:max-w-4xl max-h-[750px] md:max-h-[800px] rounded-xl bg-white dark:bg-[#232323] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-full md:w-11/12">
        <div className="relative">
          {selectedImage?.urls.regular && (
            <Image
              src={selectedImage?.urls.regular}
              className="w-full select-none rounded-t-xl max-h-[550px] object-cover"
              alt={selectedImage?.alt_description}
              width={500}
              height={500}
              loading="lazy"
            />
          )}
          {/* close button */}
          <button
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 h-8 w-8"
            onClick={handleClose}
          >
            <Image src="/images/close.svg" alt="close" width={31} height={31} />
          </button>
          {/* Download button on image */}
          <button
            className={`bg-[#3CB46E] md:block hidden text-white px-9 py-4 rounded-md ${montserrat.className} text-xs absolute right-0 bottom-0 m-6`}
          >
            Download image
          </button>
          {/* info and share */}
          <div
            className={`flex gap-2 ${montserratMedium.className} text-white absolute md:left-0 right-0 bottom-0 m-6`}
          >
            {/* share */}
            <div className="flex justify-center items-center gap-2 p-2 border border-white rounded-md">
              <svg
                width="18"
                height="18"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 27">
                  <path
                    id="Vector"
                    d="M8.97649 3.80001C9.86339 3.80001 10.5824 3.08103 10.5824 2.19412C10.5824 1.30722 9.86339 0.588242 8.97649 0.588242C8.08958 0.588242 7.37061 1.30722 7.37061 2.19412C7.37061 3.08103 8.08958 3.80001 8.97649 3.80001Z"
                    stroke="#ECECEC"
                    strokeWidth="0.988235"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M2.5529 7.54706C3.43981 7.54706 4.15879 6.82808 4.15879 5.94118C4.15879 5.05427 3.43981 4.3353 2.5529 4.3353C1.666 4.3353 0.947021 5.05427 0.947021 5.94118C0.947021 6.82808 1.666 7.54706 2.5529 7.54706Z"
                    stroke="#ECECEC"
                    strokeWidth="0.988235"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M8.97649 11.2941C9.86339 11.2941 10.5824 10.5751 10.5824 9.68823C10.5824 8.80133 9.86339 8.08235 8.97649 8.08235C8.08958 8.08235 7.37061 8.80133 7.37061 9.68823C7.37061 10.5751 8.08958 11.2941 8.97649 11.2941Z"
                    stroke="#ECECEC"
                    strokeWidth="0.988235"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M3.93921 6.74947L7.59527 8.87994"
                    stroke="#ECECEC"
                    strokeWidth="0.988235"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_5"
                    d="M7.58991 3.00241L3.93921 5.13288"
                    stroke="#ECECEC"
                    strokeWidth="0.988235"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>

              <div>
                <p className={`${montserratMedium.className}`}>Share</p>
              </div>
            </div>
            {/* Info */}
            <div className="flex justify-center items-center gap-2 p-2 border border-white rounded-md">
              <svg
                width="18"
                height="18"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 28">
                  <path
                    id="Vector"
                    d="M6.58829 11.2941C9.54464 11.2941 11.9412 8.89753 11.9412 5.94118C11.9412 2.98483 9.54464 0.588242 6.58829 0.588242C3.63194 0.588242 1.23535 2.98483 1.23535 5.94118C1.23535 8.89753 3.63194 11.2941 6.58829 11.2941Z"
                    stroke="#ECECEC"
                    strokeWidth="1.07059"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M6.58813 8.08235V5.94118"
                    stroke="#ECECEC"
                    strokeWidth="1.07059"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M6.58813 3.79999H6.59398"
                    stroke="#ECECEC"
                    strokeWidth="1.07059"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>

              <div>
                <p className={`${montserratMedium.className}`}>Info</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 md:px-7">
          {/* profile */}
          <div className="grid grid-cols-2 justify-between">
            <div className="flex items-center gap-3">
              {selectedImage?.user.profile_image.medium && (
                <Image
                  src={selectedImage?.user.profile_image.medium}
                  className="rounded-full md:w-12 md:h-12 w-11 h-11 bg-cover"
                  alt=""
                  width={45}
                  height={45}
                />
              )}
              <div>
                <h2
                  className={`${montserrat.className} text-[#4f4f4f] dark:text-white lg:text-sm text-[11px]`}
                >
                  {selectedImage?.user.name}
                </h2>
                <p
                  className={`${poppins.className} text-[#a7a7a7] lg:text-xs text-[10px]`}
                >
                  @{selectedImage?.user.username}
                </p>
              </div>
              <div
                className={`${poppins.className} text-[#A7A7A7] text-xs md:block hidden ml-5`}
              >
                <div className="grid grid-cols-2 gap-4 justify-between">
                  <div className="flex justify-start items-center break-words">
                    <Image
                      src="/images/instagram.svg"
                      alt="instagram"
                      width={15}
                      height={15}
                    />
                    <p>/{selectedImage?.user.social?.instagram_username}</p>
                  </div>
                  <div className="flex justify-start items-center break-words">
                    <Image
                      src="/images/twitter.svg"
                      alt="twitter"
                      width={15}
                      height={15}
                    />
                    <p>/{selectedImage?.user.social?.twitter_username}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* download button */}
            <button
              className={`bg-[#3CB46E] md:hidden text-white px-5 py-3 rounded-sm ${montserrat.className} text-xs`}
            >
              Download image
            </button>
            <div
              className={`md:flex hidden justify-end items-center gap-2 ${poppins.className} text-[#A7A7A7] text-sm`}
            >
              {/* downloads */}
              <p>
                {selectedImage?.downloads ? (
                  selectedImage?.downloads > 1000 ? (
                    <span>{(selectedImage?.downloads / 1000).toFixed(2)}k</span>
                  ) : (
                    <span>{selectedImage?.downloads}</span>
                  )
                ) : (
                  0
                )}{" "}
                downloads
              </p>
              {/* likes */}

              <div className="flex justify-end items-center gap-2">
                <div>
                  <Image
                    src="/images/vuesax-linear-like.svg"
                    alt=""
                    className="w-5 h-5"
                    width={20}
                    height={20}
                  />
                </div>
                {selectedImage?.likes && selectedImage?.likes > 1000 ? (
                  <span>{selectedImage?.likes / 1000}k</span>
                ) : (
                  <span>{selectedImage?.likes}</span>
                )}
              </div>
            </div>
          </div>
          {/* user handel */}
          <div
            className={`${poppins.className} text-[#A7A7A7] text-[9px] md:hidden`}
          >
            {/* insta and twit */}
            <div className="grid grid-cols-2 justify-between mt-2 ml-1">
              <div className="grid grid-cols-2 gap-1 justify-between">
                <div className="flex justify-start items-center break-words">
                  <Image
                    src="/images/instagram.svg"
                    alt="instagram"
                    width={12}
                    height={12}
                  />
                  /{selectedImage?.user.social?.instagram_username}
                </div>
                <div className="flex justify-start items-center break-words">
                  <Image
                    src="/images/twitter.svg"
                    alt="twitter"
                    width={12}
                    height={12}
                  />
                  /{selectedImage?.user.social?.twitter_username}
                </div>
              </div>
              <div className="flex justify-end gap-2 items-center">
                {/* downloads */}
                <p>
                  {selectedImage?.downloads &&
                  selectedImage?.downloads > 1000 ? (
                    <span>{(selectedImage?.downloads / 1000).toFixed(2)}k</span>
                  ) : (
                    <span>{selectedImage?.downloads}</span>
                  )}{" "}
                  downloads
                </p>
                {/* likes */}

                <div className="flex justify-end items-center gap-2">
                  <div>
                    <Image
                      src="/images/vuesax-linear-like.svg"
                      alt=""
                      className="w-3 h-3"
                      width={10}
                      height={10}
                    />
                  </div>
                  {selectedImage?.likes && selectedImage?.likes > 1000 ? (
                    <span>{selectedImage?.likes / 1000}k</span>
                  ) : (
                    <span>{selectedImage?.likes}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* tags */}
          <div className={`mt-5 ${montserratMedium.className} mb-4`}>
            <p className="dark:text-white">Related Tags</p>
            <div
              className={`flex flex-wrap gap-2 mt-2 `}
              style={{ maxHeight: "100px" }}
            >
              {selectedImage?.tags.map((tag, index) => (
                <p
                  key={tag.title + index}
                  className={`bg-[#F2F2F2] text-[#4F4F4F] px-3 py-2 rounded-sm text-[9px] md:text-xs mt-1 mr-2`}
                >
                  {tag.title}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default PopUp;
