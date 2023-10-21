"use client";
import { Montserrat } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [result, setResult] = useState([]);
  const [onfocus, setOnfocus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (e.target.id !== "dropdown") {
        setOnfocus(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const autoComplete = async (e: string) => {
    if (e.length === 0) {
      return [];
    }

    const response = await fetch(
      `http://localhost:3000/api/search-keywords?q=${e}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      return [];
    }
    const data = await response.json();

    return data.result;
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0 && !onfocus) {
      setOnfocus(true);
    }

    setSearch(e.target.value);
    const response = await autoComplete(e.target.value);
    setResult(response);
  };

  const submitSearch = (e?: KeyboardEvent<HTMLInputElement> | null) => {
    if (e && e.key !== "Enter") {
      return;
    }
    if (search.length === 0) {
      return;
    }
    router.replace(`/search?q=${search}`);
  };

  const selectItem = (item: any) => {
    setSearch(item.query.replace(/<\/?[^>]+(>|$)/g, ""));
    submitSearch();
  };

  return (
    <div className="relative md:col-span-2 lg:ml-8 md:block flex justify-end items-center h-fit">
      <div className="flex md:hidden items-center gap-3">
        {/* search */}
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 13L17 18"
            stroke="#4F4F4F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="7.5"
            cy="7.5"
            r="6.75"
            stroke="#4F4F4F"
            strokeWidth="1.5"
          />
        </svg>
        {/* menu */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 12H21"
            stroke="#4F4F4F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6H21"
            stroke="#4F4F4F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 18H21"
            stroke="#4F4F4F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="hidden absolute inset-y-0 left-0 md:flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 13L17 18"
            stroke="#A7A7A7"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="7.5"
            cy="7.5"
            r="6.75"
            stroke="#A7A7A7"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <input
        type="search"
        className={`hidden md:block nav-search w-full py-2 pr-3 pl-10 ${montserrat.className} border border-[#ececec] bg-[#fafafa] dark:bg-[#4F4F4F] dark:border-[#858484] dark:text-white dark:focus:bg-white dark:focus:text-[#4F4F4F] dark:placeholder:text-[#8D8D8D]`}
        placeholder={placeholder}
        required
        value={search}
        onChange={handleChange}
        onKeyDown={submitSearch}
      />
      <div
        id="dropdown"
        className={`w-full mt-2 z-10 h-60 border border-gray-300 rounded-md bg-white absolute overflow-y-auto ${
          onfocus && search.length ? "" : "hidden"
        }`}
      >
        {result.map((item: { query: string }, index) => (
          <div
            key={index}
            onClick={() => selectItem(item)}
            className="px-5 py-3 text-stone-600 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: item.query,
              }}
            >
              {/* {search.query} */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
