// --- components/Sidebar.jsx (Ajuste o caminho conforme sua estrutura) ---
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa Link e useLocation

// --- Ícones (mantidos como antes) ---
const SidebarIcon = ({ children, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mr-3 lg:mr-3 flex-shrink-0 ${className}`}>
        {children}
    </svg>
);
// --- Fim Ícones ---


const Sidebar = () => {
    const location = useLocation(); // Hook para obter a localização atual
    const currentPath = location.pathname; // Pega o caminho da URL atual

    // Função para verificar se o link está ativo
    const isActive = (path) => {
        // A rota raiz "/" precisa de verificação exata
        if (path === '/') {
            return currentPath === path;
        }
        // Outras rotas podem corresponder ao início do caminho
        return currentPath.startsWith(path);
    };

    return (
        <nav className="bg-white p-4 flex flex-col justify-between border-r border-gray-200 fixed top-0 left-0 h-screen z-20 lg:w-64 w-16 transition-width duration-300 ease-in-out">
            {/* Top Section: Logo and Navigation */}
            <div>
                {/* Logo */}
                <div className="flex items-center mb-8 flex-shrink-0 px-0 lg:px-0 justify-center lg:justify-start">
                    <div className="w-8 h-8 bg-gray-700 rounded mr-0 lg:mr-2 flex items-center justify-center text-white font-bold flex-shrink-0">H</div>
                    <span className="font-bold text-lg text-gray-800 hidden lg:inline">HostoGo Tech</span>
                </div>
                {/* Navigation Links */}
                <ul className="overflow-y-auto flex-grow">
                     {/* Dashboard Link */}
                     <li className="mb-2">
                         {/* Usa Link do react-router-dom */}
                         <Link
                            to="/"
                            className={`flex items-center p-2 rounded-lg transition-colors duration-200 justify-center lg:justify-start ${isActive('/') ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            title="Dashboard"
                         >
                             <SidebarIcon><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></SidebarIcon>
                             <span className="hidden lg:inline">Dashboard</span>
                         </Link>
                     </li>
                     {/* Chamados Link */}
                     <li className="mb-2">
                         <Link
                            to="/chamados"
                            className={`flex items-center p-2 rounded-lg transition-colors duration-200 justify-center lg:justify-start ${isActive('/chamados') ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            title="Chamados"
                         >
                             <SidebarIcon><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></SidebarIcon>
                             <span className="hidden lg:inline">Chamados</span>
                         </Link>
                     </li>
                     {/* Clients Link */}
                     <li className="mb-2">
                         <Link
                            to="/clientes"
                            className={`flex items-center p-2 rounded-lg transition-colors duration-200 justify-center lg:justify-start ${isActive('/clientes') ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            title="Clientes" // Título em Português
                         >
                             <SidebarIcon><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></SidebarIcon>
                             <span className="hidden lg:inline">Clientes</span> {/* Texto em Português */}
                         </Link>
                     </li>
                     {/* Addons Link */}
                      <li className="mb-2">
                         <Link
                            to="/addons"
                            className={`flex items-center p-2 rounded-lg transition-colors duration-200 justify-center lg:justify-start ${isActive('/addons') ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            title="Addons"
                         >
                             <SidebarIcon><path d="M5 12h14"/><path d="M12 5v14"/></SidebarIcon>
                             <span className="hidden lg:inline">Addons</span>
                             <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full hidden lg:inline">New</span>
                         </Link>
                     </li>
                     {/* Settings Link */}
                      <li className="mb-2">
                         <Link
                            to="/configuracoes" // Rota em Português
                            className={`flex items-center p-2 rounded-lg transition-colors duration-200 justify-center lg:justify-start ${isActive('/configuracoes') ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            title="Configurações" // Título em Português
                         >
                             <SidebarIcon><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></SidebarIcon>
                             <span className="hidden lg:inline">Configurações</span> {/* Texto em Português */}
                         </Link>
                     </li>
                </ul>
            </div>
            {/* Bottom Help Section */}
            <div className="mt-auto p-1 lg:p-4 bg-gray-50 rounded-lg text-center flex-shrink-0">
                 {/* Help Icon */}
                 <SidebarIcon className="mx-auto text-gray-500 mb-0 lg:mb-2 flex-shrink-0 !mr-0"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></SidebarIcon>
                 {/* Help Link shown only on large screens */}
                 <a href="#" className="text-sm text-blue-600 hover:underline hidden lg:inline">Precisa de Ajuda?</a> {/* Texto em Português */}
            </div>
        </nav>
    );
};

export default Sidebar;
