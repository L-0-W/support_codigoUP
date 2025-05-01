// --- components/Header.jsx (Ajuste o caminho conforme sua estrutura) ---
import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation

// --- Ícones (mantidos como antes) ---
const HeaderIcon = ({ children, className = '' }) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {children}
    </svg>
);
// --- Fim Ícones ---


const Header = () => {
    const location = useLocation(); // Hook para obter a localização atual

     // Determina o texto do breadcrumb com base no caminho atual
     const getBreadcrumbText = () => {
        const path = location.pathname;
        if (path === '/') return 'Visão Geral do Suporte'; // Traduzido
        if (path.startsWith('/chamados')) return 'Lista de Chamados';
        if (path.startsWith('/clientes')) return 'Clientes';
        if (path.startsWith('/addons')) return 'Addons';
        if (path.startsWith('/configuracoes')) return 'Configurações';
        return 'Visão Geral do Suporte'; // Fallback
    };

    return (
        <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
             {/* Breadcrumbs (visível apenas em telas grandes) - Agora dinâmico */}
            <div className="hidden lg:block">
                <span className="text-gray-500 text-sm">Suporte / </span> {/* Traduzido */}
                <span className="text-gray-800 font-medium text-sm">{getBreadcrumbText()}</span>
            </div>
             {/* Div vazia para empurrar ações para a direita em telas pequenas */}
             <div className="lg:hidden flex-grow"></div>
             {/* Ações do Cabeçalho */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                {/* Botão Novo Chamado */}
                <button className="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center">
                     <HeaderIcon className="mr-1 h-4 w-4"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></HeaderIcon>
                    <span className="hidden sm:inline">Novo Chamado</span> {/* Traduzido */}
                </button>
                 {/* Ícones de Notificação e Pesquisa (visíveis apenas em telas pequenas/médias) */}
                <button className="text-gray-500 hover:text-gray-700 lg:hidden" title="Notificações">
                     <HeaderIcon><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></HeaderIcon>
                </button>
                <button className="text-gray-500 hover:text-gray-700 lg:hidden" title="Pesquisar">
                    <HeaderIcon><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></HeaderIcon>
                </button>
                 {/* Área de Informações do Usuário */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    {/* Avatar do Usuário */}
                    <img
                        src="https://placehold.co/32x32/e2e8f0/64748b?text=MS"
                        alt="Avatar do Usuário"
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/32x32/f87171/ffffff?text=X'; }}
                    />
                    {/* Nome do Usuário (visível apenas em telas grandes) */}
                    <div className="hidden lg:block">
                        <span className="text-sm font-medium text-gray-800">Muhammd Salim</span>
                    </div>
                    {/* Seta Dropdown (visível apenas em telas grandes) */}
                     <HeaderIcon className="text-gray-500 hidden lg:block h-4 w-4"><polyline points="6 9 12 15 18 9"/></HeaderIcon>
                </div>
            </div>
        </header>
    );
};

export default Header;
