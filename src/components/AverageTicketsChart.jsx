import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto'; // Importe se não usar CDN

const AverageTicketsChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const barChartLabels = ['Nov 20', 'Nov 21', 'Nov 22', 'Nov 23', 'Nov 24', 'Nov 25', 'Nov 26'];
    const barChartDataValues = [2800, 1500, 2200, 1800, 2500, 1200, 2100];
    const barChartBackgroundColors = ['#A8D1A1','#D3EAD0','#A8D1A1','#D3EAD0','#A8D1A1','#D3EAD0','#A8D1A1'];

    useEffect(() => {
        if (!chartRef.current || typeof Chart === 'undefined') return;
        const ctx = chartRef.current.getContext('2d');
        if (chartInstanceRef.current) chartInstanceRef.current.destroy();

        chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: { labels: barChartLabels, datasets: [{ label: 'Chamados Criados', data: barChartDataValues, backgroundColor: barChartBackgroundColors, borderWidth: 0, borderRadius: { topLeft: 4, topRight: 4 }, barThickness: 20 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { drawBorder: false, color: '#e5e7eb' }, ticks: { font: { size: 10 }, color: '#6B7280', padding: 10 } }, x: { grid: { display: false, drawBorder: false }, ticks: { font: { size: 10 }, color: '#6B7280', padding: 10 } } }, plugins: { legend: { display: false }, tooltip: { enabled: true } } }
        });
        return () => { if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null; } };
    }, [barChartLabels, barChartDataValues, barChartBackgroundColors]);

    return (
        <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Média de chamados criados</h3>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
                        <div className="text-left sm:text-center">
                            <p className="text-xs text-gray-500 flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-1 inline"><line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg> Média Resolvidos </p>
                            <p className="text-xl font-semibold text-gray-800">1,654</p>
                        </div>
                        <div className="text-left sm:text-center">
                            <p className="text-xs text-gray-500 flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-1 inline"><line x1="7" x2="17" y1="7" y2="17"/><polyline points="17 7 17 17 7 17"/></svg> Média Criados </p>
                            <p className="text-xl font-semibold text-gray-800">4,567</p>
                        </div>
                    </div>
                </div>
                <button className="text-sm text-blue-600 hover:underline flex items-center mt-2 sm:mt-0 self-start sm:self-center"> Ver Completo <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 w-4 h-4"><polyline points="6 9 12 15 18 9"/></svg> </button>
            </div>
            <div className="h-60 min-h-[200px]"> <canvas ref={chartRef}></canvas> </div>
        </div>
    );
};
export default AverageTicketsChart;