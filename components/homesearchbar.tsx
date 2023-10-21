"use client";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import {
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

const HomeSearchBar = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [onfocus, setOnfocus] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (e.target.id !== "homeDropdown") {
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
      }
    );
    if (!response.ok) {
      return [];
    }
    const data = await response.json();

    return data.result;
  };

  const handleChange = async (e: any) => {
    // on enter key press redirect to search page
    if (e.key === "Enter") {
      submitSearch();
      return;
    }

    if (e.target.value.length !== 0 && !onfocus) {
      setOnfocus(true);
    }

    setSearch(e.target.value);
    const response = await autoComplete(e.target.value);
    setResult(response);
  };

  const submitSearch = (e?: KeyboardEvent<HTMLInputElement> | null) => {
    console.log(e);
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
    <div className="relative h-fit lg:w-1/2 w-4/5">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
        className={`block lg:hidden nav-search w-full py-2 pr-3 pl-10 ${montserrat.className}`}
        placeholder="Search high resolution Images"
        required
        value={search}
        onChange={handleChange}
      />
      <input
        type="search"
        className={`lg:block hidden nav-search w-full py-2 pr-3 pl-10 ${montserrat.className}`}
        placeholder="Search high resolution Images, categories, wallpapers"
        required
        value={search}
        onChange={handleChange}
        onKeyDown={submitSearch}
      />
      <div
        id="homeDropdown"
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

export default HomeSearchBar;
