import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto'; // Importe se não usar CDN

const PriorityChart = () => {
    const chartRef = useRef(null);
    const legendRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const pieChartLabels = ['Email', 'Chat ao vivo', 'Formulário', 'Messenger'];
    const pieChartDataValues = [400, 300, 300, 500];
    const pieChartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    useEffect(() => {
        if (!chartRef.current || typeof Chart === 'undefined') return;
        const ctx = chartRef.current.getContext('2d');
        if (chartInstanceRef.current) chartInstanceRef.current.destroy();

        chartInstanceRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: { labels: pieChartLabels, datasets: [{ label: 'Prioridade do Chamado', data: pieChartDataValues, backgroundColor: pieChartColors, borderWidth: 0, cutout: '70%' }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: true } } }
        });

        if (legendRef.current) {
            legendRef.current.innerHTML = '';
            pieChartLabels.forEach((label, index) => {
                const color = pieChartColors[index];
                const legendItemHTML = `<div class="flex items-center"><span class="w-2 h-2 rounded-full mr-2 flex-shrink-0" style="background-color: ${color}"></span><span class="text-gray-600 truncate">${label}</span></div>`;
                legendRef.current.innerHTML += legendItemHTML;
            });
        }
        return () => { if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null; } };
    }, [pieChartLabels, pieChartDataValues, pieChartColors]);

    return (
         <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 w-full">Prioridade do chamado</h3>
            <div className="h-48 w-full relative min-h-[200px]">
                <canvas ref={chartRef}></canvas>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2">
                    <span className="text-xs text-gray-600">Total de chamados ativos</span>
                    <span className="text-xl font-bold text-gray-900">1,500</span>
                </div>
            </div>
            <div ref={legendRef} className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs w-full px-4"></div>
        </div>
    );
};
export default PriorityChart;