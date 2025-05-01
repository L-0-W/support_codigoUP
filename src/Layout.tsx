import React from 'react';
import { Outlet } from 'react-router-dom'; // Importa Outlet para renderizar rotas filhas
import Sidebar from './components/Sidebar'; // Ajuste o caminho se necessário
import Header from './components/Header';   // Ajuste o caminho se necessário

const Layout = () => {
    return (
        <div className="font-['Inter',_sans-serif] bg-gray-50 overflow-x-hidden min-h-screen flex"> {/* Flex container */}
            <Sidebar /> {/* Sidebar agora não precisa de props de navegação */}
            {/* Container principal para Header e Conteúdo */}
            <div className="flex-1 flex flex-col lg:ml-64 ml-16 transition-all duration-300 ease-in-out">
                <Header /> {/* Header agora não precisa de props de navegação */}
                {/* Área de conteúdo principal */}
                <main className="p-4 md:p-6 bg-gray-50 flex-1"> {/* flex-1 para ocupar espaço restante */}
                    <Outlet /> {/* Onde o conteúdo da rota filha será renderizado */}
                </main>
            </div>
             {/* O elemento tooltip do Chart.js é gerenciado dentro do ReplyTimeChart */}
        </div>
    );
};

export default Layout;