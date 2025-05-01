import React from 'react';

const UnderConstructionPage = ({ title = "Em construção" }) => { // Aceita um título opcional
    return (
        <div className="flex items-center justify-center h-[calc(100vh-150px)]"> {/* Ajusta altura */}
            <div className="text-center p-10 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
                {title === "Em construção" && ( // Mostra subtítulo apenas se for a página padrão
                     <p className="text-gray-500 mt-2">Esta página estará disponível em breve!</p>
                )}
            </div>
        </div>
    );
};
export default UnderConstructionPage;