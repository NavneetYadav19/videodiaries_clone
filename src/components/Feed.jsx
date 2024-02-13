import React, { useContext, useEffect } from "react";

import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
    const { loading, searchResults, theme } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        console.log("Search Results:", searchResults);
    }, [searchResults]);

    return (
        <div className={`flex flex-row h-[calc(100%-56px)] ${theme === 'dark' ? 'dark' : 'light'}`}>
            <LeftNav />
            <div className={`grow w-[calc(100%-240px)] h-full overflow-y-auto ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                {!loading &&
                    searchResults.map((item) => {
                        if (item.type !== "video") return false;
                        return (
                            <VideoCard
                                key={item?.video?.videoId}
                                video={item?.video}
                                textColor={theme === 'dark' ? 'text-white' : 'text-black'} 
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Feed;
