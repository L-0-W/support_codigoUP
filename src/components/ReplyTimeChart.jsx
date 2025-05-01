import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto'; // Importe se não usar CDN

const ReplyTimeChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const tooltipRef = useRef(null);
    const lineChartLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];
    const lineChartDataValues = [400, 300, 200, 278, 189, 239, 349];

     useEffect(() => {
        let tooltipEl = document.getElementById('chartjs-tooltip-react-reply'); // ID único
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip-react-reply';
            tooltipEl.className = 'chartjs-tooltip opacity-0 transition-opacity duration-200 absolute z-30 bg-gray-800 text-white p-3 rounded-lg shadow-lg text-center pointer-events-none';
            document.body.appendChild(tooltipEl);
        }
        tooltipRef.current = tooltipEl;
        return () => {
            const el = document.getElementById('chartjs-tooltip-react-reply');
            if (el && document.body.contains(el)) {
                 document.body.removeChild(el);
            }
             tooltipRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!chartRef.current || !tooltipRef.current || typeof Chart === 'undefined') return;
        const ctx = chartRef.current.getContext('2d');
        if (chartInstanceRef.current) chartInstanceRef.current.destroy();

        function createGradient(chartCtx, area) {
            if (!area) return 'rgba(136, 132, 216, 0.1)';
            const gradient = chartCtx.createLinearGradient(0, area.bottom, 0, area.top);
            gradient.addColorStop(0, 'rgba(136, 132, 216, 0)');
            gradient.addColorStop(1, 'rgba(136, 132, 216, 0.3)');
            return gradient;
        }

        const externalTooltipHandler = (context) => {
            const tooltipEl = tooltipRef.current;
            if (!tooltipEl) return;
            const {chart, tooltip} = context;
            if (tooltip.opacity === 0) { tooltipEl.style.opacity = 0; return; }
            if (tooltip.body) {
                const bodyLines = tooltip.body.map(b => b.lines);
                const dataIndex = tooltip.dataPoints[0]?.dataIndex;
                const label = dataIndex !== undefined ? lineChartLabels[dataIndex] : '';
                const dateStr = `Mês: ${label}`;
                let innerHtml = '<div class="text-center">';
                innerHtml += `<p class="text-xs font-semibold mb-1">${dateStr}</p>`;
                bodyLines.forEach(body => { innerHtml += `<p class="text-lg font-bold">${body} respostas</p>`; });
                innerHtml += '</div>';
                tooltipEl.innerHTML = innerHtml;
            }
            const position = chart.canvas.getBoundingClientRect();
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.scrollX + tooltip.caretX + 'px';
            tooltipEl.style.top = position.top + window.scrollY + tooltip.caretY - tooltipEl.offsetHeight - 5 + 'px';
            tooltipEl.style.pointerEvents = 'none';
        };

        chartInstanceRef.current = new Chart(ctx, {
             type: 'line',
             data: { labels: lineChartLabels, datasets: [{ label: 'Tempo de Resposta', data: lineChartDataValues, borderColor: '#8884d8', borderWidth: 3, pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#8884d8', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2, tension: 0.4, fill: true, backgroundColor: (c) => createGradient(c.chart.ctx, c.chart.chartArea) }] },
             options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, display: false, grid: { drawBorder: false } }, x: { display: false, grid: { drawOnChartArea: false } } }, plugins: { legend: { display: false }, tooltip: { enabled: false, external: externalTooltipHandler, mode: 'index', intersect: false } }, interaction: { mode: 'index', intersect: false } }
         });
        return () => { if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null; } };
    }, [lineChartLabels, lineChartDataValues]);

    return (
         <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Tempo de resposta do chamado</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">1,679</p>
            <div className="h-48 min-h-[200px]"> <canvas ref={chartRef}></canvas> </div>
        </div>
    );
};
export default ReplyTimeChart;