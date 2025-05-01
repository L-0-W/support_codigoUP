import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe seus componentes de página e layout
import Layout from './Layout'; // Componente de Layout (novo)
import DashboardPage from './pages/DashboardPage';
import TicketsPage from './pages/TicketsPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
// import NotFoundPage from './pages/NotFoundPage'; // Opcional: Página 404

// Import Chart.js se não estiver via CDN
// import Chart from 'chart.js/auto';

function App() {
     // Efeito para configurar Chart.js (se necessário)
     useEffect(() => {
        if (typeof Chart !== 'undefined') {
             Chart.defaults.font.family = 'Inter, sans-serif';
             console.log("Chart.js encontrado, fonte padrão definida.");
        } else {
            console.warn("Chart.js não encontrado. Gráficos podem não renderizar corretamente.");
        }
    }, []);

    return (
        // Define as rotas da aplicação
        <Routes>
            {/* Rota principal que usa o Layout */}
            <Route path="/" element={<Layout />}>
                {/* Rota Index (página inicial, renderizada em "/") */}
                <Route index element={<DashboardPage />} />
                {/* Outras rotas filhas do Layout */}
                <Route path="chamados" element={<TicketsPage />} />
                <Route path="clientes" element={<UnderConstructionPage />} />
                <Route path="addons" element={<UnderConstructionPage />} />
                <Route path="configuracoes" element={<UnderConstructionPage />} />
                 {/* Opcional: Rota para lidar com caminhos não encontrados */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
                 <Route path="*" element={<UnderConstructionPage title="Página não encontrada"/>} /> {/* Usando UnderConstruction como fallback */}
            </Route>
        </Routes>
    );
}

export default App;