import React from "react";

const LeftNavMenuItem = ({ text, icon, className, action, theme }) => {
    const textColor = theme === 'dark' ? 'text-black' : '';

    return (
        <div
            className={
                `${textColor} text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] ` +
                className
            }
            onClick={action}
        >
            <span className={`text-xl mr-5 ${textColor}`}>{icon}</span>
            {text}
        </div>
    );
};

export default LeftNavMenuItem;
