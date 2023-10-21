import Image from "next/image";

const Carousel = ({ breadcrumbs }: { breadcrumbs: string[] }) => {
  return (
    <div className=" relative">
      <div className="absolute -right-4 flex justify-center items-center  h-full">
        <Image
          src="/images/vector-3.svg"
          alt="right"
          width={8}
          height={8}
          loading="lazy"
        />
      </div>
      <div className="flex gap-2 overflow-x-scroll scrollbar-hide">
        {breadcrumbs.map((breadcrumb, index) => (
          <p
            key={index}
            className={`bg-[#F2F2F2] dark:bg-inherit text-[#4F4F4F] dark:text-white border dark:border-[#c4c4c4] px-5 py-2 rounded-[4px] text-[9px] md:text-xs`}
          >
            {breadcrumb}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
