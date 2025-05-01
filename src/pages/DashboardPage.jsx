import React from 'react';
// Importe os componentes necessários (StatsCard, Charts, RecentTickets)
// Presume-se que eles estão em ../components/ ou similar
import StatsCard from '../components/StatsCard';
import ReplyTimeChart from '../components/ReplyTimeChart';
import PriorityChart from '../components/PriorityChart';
import AverageTicketsChart from '../components/AverageTicketsChart';
import RecentTickets from '../components/RecentTickets';

const DashboardPage = () => {
     // Dados de exemplo para Stats Cards - Títulos traduzidos
     const stats = [
        { id: 's1', icon: <><path d="M20 12V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M10 12h4"/><path d="M12 10v4"/></>, bgColor: 'bg-blue-50', iconColor: 'text-blue-500', title: 'Todos chamados', value: '2,300' },
        { id: 's2', icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></>, bgColor: 'bg-green-50', iconColor: 'text-green-500', title: 'Respostas Cliente', value: '112' },
        { id: 's3', icon: <><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></>, bgColor: 'bg-yellow-50', iconColor: 'text-yellow-500', title: 'Respostas Equipe', value: '1,678' },
        { id: 's4', icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>, bgColor: 'bg-red-50', iconColor: 'text-red-500', title: 'Chamados sem resposta', value: '1,678' },
    ];
    return (
        <> {/* Usa Fragment para agrupar elementos */}
            {/* Grid de Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                 {stats.map(stat => (
                    <StatsCard
                        key={stat.id}
                        icon={stat.icon}
                        bgColor={stat.bgColor}
                        iconColor={stat.iconColor}
                        title={stat.title}
                        value={stat.value}
                    />
                ))}
            </div>

             {/* Grid de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <ReplyTimeChart />
                <PriorityChart />
            </div>

             {/* Grid Inferior */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AverageTicketsChart />
                <RecentTickets />
            </div>
        </>
    );
};
export default DashboardPage;