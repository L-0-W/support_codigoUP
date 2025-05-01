import React from 'react';
const StatsCard = ({ icon, bgColor, iconColor, title, value }) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center">
            <div className={`p-3 rounded-lg mr-4 ${bgColor} flex-shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconColor}>
                    {icon}
                </svg>
            </div>
            <div className="min-w-0">
                <p className="text-sm text-gray-500 truncate">{title}</p>
                <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );
};
export default StatsCard;