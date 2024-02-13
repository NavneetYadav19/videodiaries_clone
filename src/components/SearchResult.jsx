import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
    const [result, setResult] = useState();
    const { searchQuery } = useParams();
    const { setLoading, theme } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        if (searchQuery) {
            fetchSearchResults();
        }
    }, [searchQuery, fetchSearchResults]);

    const fetchSearchResults = () => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
            console.log(res);
            setResult(res?.contents);
            setLoading(false);
        });
    };

    return (
        <div className={`flex flex-row h-[calc(100%-56px)] ${theme === 'dark' ? 'dark' : 'light'}`}>
            <LeftNav />
            <div className={`grow w-[calc(100%-240px)] h-full overflow-y-auto ${theme === 'dark' ? 'bg-black' : 'bg-white text-black'}`}>
                {result?.length ? (
                    <div className="grid grid-cols-1 gap-2 p-5">
                        {result?.map((item) => {
                            if (item?.type !== "video") return false;
                            let video = item.video;
                            return (
                                <SearchResultVideoCard
                                    key={video.videoId}
                                    video={video}
                                    theme={theme}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center p-5">
                        No results found for "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
