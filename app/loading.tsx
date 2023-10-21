import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });
export default function loading() {
  return (
    <>
      <div className="flex justify-center mt-8">
        <Image src="/loading.gif" alt="loading" width={300} height={300} />
      </div>
      <div className="flex justify-center">
        <p
          className={`text-center text-2xl w-80 text-[#a7a7a7] ${montserrat.className}`}
        >
          Loading some awesome Images...
        </p>
      </div>
    </>
  );
}
