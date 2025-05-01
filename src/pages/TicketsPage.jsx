import React, { useState, useMemo, useEffect, useRef } from 'react';
import {Styled} from 'styled-components'
// Note: The original code included an import for a CSS file:
// import './manualCss/TicketsPage.css'
// This file is not provided. The component relies heavily on Tailwind CSS classes.
// The class 'max-h-manual' was found in the table container div,
// suggesting custom CSS might be needed for the desired table height/scroll behavior.
// For now, I'll replace 'max-h-manual' with a standard Tailwind class like 'max-h-[500px]' or 'h-[500px]'.
// You might need to adjust this or provide the CSS content.

// --- Ícones ---
// SVG Icon Components

const TableContentDiv = styled.div`
  overflow-y: auto;
  max-hight: 300px
`


const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500 hover:text-gray-700"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IssueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const SystemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>;
const PaperclipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>;
const SmileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const PowerOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>;
const RefreshCwIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>;


// --- Dados Iniciais ---
// Mock data for the tickets
const initialTicketsData = [
  { id: '#59678', title: 'Designing com Adobe Illustrator', date: '9 de abril de 2026', sortDate: '2026-04-09', category: 'Algoritmos Ineficientes', user: 'Jane Austen', role: 'Designer Gráfico', issue: 'Problema com camadas complexas', status: 'Médio', statusPriority: 2, tabStatus: 'Ativos' },
  { id: '#21234', title: 'Criando Logos Incríveis', date: '28 de fevereiro de 2020', sortDate: '2020-02-28', category: 'Gargalos no Fluxo de Trabalho', user: 'JK Rowling', role: 'Escritora', issue: 'Dúvida sobre exportação', status: 'Alto', statusPriority: 3, tabStatus: 'Ativos' },
  { id: '#39678', title: 'Essenciais da Programação Python', date: '8 de janeiro de 2020', sortDate: '2020-01-08', category: 'Development Issue', user: 'Emily Brontë', role: 'CEO at UIStudio', issue: 'Facing Problem Into Development System', status: 'Fechado', statusPriority: 1, tabStatus: 'Finalizadas' },
  { id: '#71789', title: 'Marketing Efetivo em Mídias Sociais', date: '7 de março de 2026', sortDate: '2026-03-07', category: 'Bibliotecas Depreciadas', user: 'George Orwell', role: 'Analista de Marketing', issue: 'Erro ao agendar posts', status: 'Alto', statusPriority: 3, tabStatus: 'Pendentes' },
  { id: '#44556', title: 'Otimização de Banco de Dados SQL', date: '15 de maio de 2025', sortDate: '2025-05-15', category: 'Performance', user: 'Leo Tolstoy', role: 'DBA', issue: 'Consulta lenta em tabela grande', status: 'Fechado', statusPriority: 1, tabStatus: 'Finalizadas' },
  { id: '#99887', title: 'Configuração de Rede VPN', date: '20 de abril de 2026', sortDate: '2026-04-20', category: 'Infraestrutura', user: 'Mary Shelley', role: 'Analista de Redes', issue: 'Não consegue conectar à VPN', status: 'Médio', statusPriority: 2, tabStatus: 'Pendentes' },
  // Additional tickets for scroll testing
  { id: '#11223', title: 'Bug na Interface do Usuário', date: '1 de maio de 2026', sortDate: '2026-05-01', category: 'UI/UX', user: 'Charles Dickens', role: 'QA Tester', issue: 'Botão desalinhado em mobile', status: 'Baixo', statusPriority: 1, tabStatus: 'Pendentes' },
  { id: '#44557', title: 'Relatório Financeiro Incorreto', date: '2 de maio de 2026', sortDate: '2026-05-02', category: 'Financeiro', user: 'Virginia Woolf', role: 'Contadora', issue: 'Valores não batem no Q1', status: 'Alto', statusPriority: 3, tabStatus: 'Pendentes' },
  { id: '#66778', title: 'Servidor Web Lento', date: '3 de maio de 2026', sortDate: '2026-05-03', category: 'Infraestrutura', user: 'James Joyce', role: 'DevOps', issue: 'Alto tempo de resposta TTFB', status: 'Médio', statusPriority: 2, tabStatus: 'Ativos' },
  { id: '#88990', title: 'Dúvida sobre API', date: '4 de maio de 2026', sortDate: '2026-05-04', category: 'Desenvolvimento', user: 'F. Scott Fitzgerald', role: 'Desenvolvedor', issue: 'Como autenticar requests?', status: 'Baixo', statusPriority: 1, tabStatus: 'Ativos' },
];

// --- Componente Badge de Status ---
// Displays a colored badge based on the ticket status
const StatusBadge = ({ status }) => {
  let bgColor = ''; let textColor = '';
  let translatedStatus = status;
  switch (status?.toLowerCase()) {
    case 'alto': bgColor = 'bg-red-100'; textColor = 'text-red-700'; translatedStatus = 'Alto'; break;
    case 'médio': bgColor = 'bg-blue-100'; textColor = 'text-blue-600'; translatedStatus = 'Médio'; break;
    case 'baixo': bgColor = 'bg-green-100'; textColor = 'text-green-700'; translatedStatus = 'Baixo'; break;
    case 'fechado': case 'closed': bgColor = 'bg-gray-100'; textColor = 'text-gray-500'; translatedStatus = 'Fechado'; break;
    case 'reaberto': bgColor = 'bg-yellow-100'; textColor = 'text-yellow-700'; translatedStatus = 'Reaberto'; break;
    default: bgColor = 'bg-gray-100'; textColor = 'text-gray-700'; translatedStatus = status;
  }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${bgColor} ${textColor} cursor-default`}>{translatedStatus}</span>;
};

// --- ChatInterfacePopup ---
// Displays a chat interface in a side popup/modal when a ticket is selected
const ChatInterfacePopup = ({ ticket, onClose, onCall, onFinish, onAccept, onTransfer }) => {
    const modalRef = useRef(null); // Ref for the modal content
    const chatMessagesRef = useRef(null); // Ref for the messages container to enable auto-scroll

    // Close the popup if clicked outside the modal content
    const handleOverlayClick = (e) => { if (modalRef.current && !modalRef.current.contains(e.target)) { onClose(); } };

    // Mock chat messages based on the selected ticket
    const messages = useMemo(() => ticket ? [
        { id: 1, sender: 'user', text: `Olá, estou com um problema com ${ticket.issue || 'o sistema'}. Poderiam me ajudar?`, time: '10:30 AM' },
        { id: 2, sender: 'agent', text: `Olá, ${ticket.user}! Claro, vamos verificar isso. Poderia me dar mais detalhes?`, time: '10:31 AM' },
        { id: 3, sender: 'user', text: 'Sim, quando tento fazer X, acontece Y.', time: '10:33 AM' },
        { id: 4, sender: 'agent', text: 'Entendido. Você já tentou limpar o cache do navegador?', time: '10:35 AM' },
        { id: 5, sender: 'user', text: 'Ainda não, vou tentar agora.', time: '10:36 AM' },
        { id: 6, sender: 'agent', text: 'Perfeito, fico no aguardo.', time: '10:36 AM' },
        { id: 7, sender: 'user', text: 'Funcionou! Obrigado pela ajuda.', time: '10:40 AM' },
        { id: 8, sender: 'agent', text: 'Ótimo! Se precisar de mais alguma coisa, é só chamar.', time: '10:41 AM' },
    ] : [], [ticket]);

    // Scroll to the bottom of the chat messages when the ticket or messages change
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [ticket, messages]);

    // Don't render if no ticket is selected
    if (!ticket) return null;

    // Helper function to get priority text (same logic as StatusBadge for color consistency)
    const getPriorityText = (status) => {
        switch (status?.toLowerCase()) {
            case 'alto': return 'Alto';
            case 'médio': return 'Médio';
            case 'baixo': return 'Baixo';
            default: return 'Não Definido';
        }
    };

    return (
      // Overlay for the popup
      <div className="fixed inset-0 bg-black/50 flex justify-end z-40" onClick={handleOverlayClick}>
        {/* Popup Content */}
        <div ref={modalRef} className="w-full max-w-md lg:max-w-lg h-full bg-white shadow-xl flex flex-col">

          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
             {/* Header Title and Close Button */}
             <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-2"> <IssueIcon /> <h3 className="text-base font-medium text-gray-700">Problema do Cliente</h3> </div>
               <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer" title="Fechar Chat"> <XIcon /> </button>
             </div>
             {/* User Info and Actions */}
             <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
               {/* User Avatar and Details */}
               <div className="flex items-center">
                 <img className="w-10 h-10 rounded-full mr-3 object-cover flex-shrink-0" src={`https://i.pravatar.cc/40?u=${encodeURIComponent(ticket.user)}`} alt={ticket.user} onError={(e) => e.target.src='https://placehold.co/40x40/E2E8F0/AAAAAA?text=?'} />
                 <div>
                   <div className="flex items-center flex-wrap gap-1.5">
                     <p className="font-semibold text-sm text-gray-900 mr-1">{ticket.user}</p>
                     {/* Action buttons based on ticket tab status */}
                     {ticket.tabStatus === 'Ativos' && (
                       <>
                         <button onClick={() => onCall(ticket.id)} title="Ligar" className="p-1 text-blue-600 hover:bg-blue-100 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"> <PhoneIcon /> </button>
                         <button onClick={() => onFinish(ticket.id)} title="Finalizar" className="p-1 text-red-600 hover:bg-red-100 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"> <PowerOffIcon /> </button>
                         <button onClick={() => onTransfer(ticket)} title="Transferir" className="p-1 text-purple-600 hover:bg-purple-100 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500"> <ShareIcon /> </button>
                       </>
                     )}
                     {ticket.tabStatus === 'Pendentes' && (
                       <button onClick={() => onAccept(ticket.id)} title="Aceitar" className="p-1 text-green-600 hover:bg-green-100 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"> <CheckIcon /> </button>
                     )}
                   </div>
                   <p className="text-xs text-gray-500">{ticket.role || 'Cliente'}</p>
                 </div>
               </div>
               {/* System Info */}
               <div className="text-left sm:text-right w-full sm:w-auto">
                 <div className="flex items-center justify-start sm:justify-end gap-1 text-blue-600 text-xs font-medium"> <SystemIcon /> <span>Sistema</span> </div>
                 <p className="text-xs text-gray-500 mt-1">{ticket.issue || 'Não especificado'}</p>
               </div>
             </div>
             {/* Ticket Details Box */}
             <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
                 <div> <p className="text-gray-500 mb-0.5">Ticket</p> <p className="font-medium text-gray-800 break-words">{ticket.id}</p> </div>
                 <div> <p className="text-gray-500 mb-0.5">Categoria</p> <p className="font-medium text-gray-800 break-words">{ticket.category}</p> </div>
                 <div> <p className="text-gray-500 mb-0.5">Status</p> <StatusBadge status={ticket.status} /> </div>
                 <div> <p className="text-gray-500 mb-0.5">Prioridade</p> <StatusBadge status={getPriorityText(ticket.status === 'Fechado' ? ticket.originalStatus || ticket.status : ticket.status)} /> </div>
               </div>
             </div>
           </div>

           {/* Messages Area (Scrollable) */}
           <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white pb-4">
             {messages.map((msg) => (
               <div key={msg.id} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                 {/* User Avatar */}
                 {msg.sender === 'user' && (
                   <img className="w-6 h-6 rounded-full object-cover flex-shrink-0" src={`https://i.pravatar.cc/24?u=${encodeURIComponent(ticket.user)}`} alt={ticket.user} onError={(e) => e.target.src='https://placehold.co/24x24/E2E8F0/AAAAAA?text=?'}/>
                 )}
                 {/* Message Bubble */}
                 <div className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? '' : 'items-end'}`}>
                   <div className={`px-3 py-2 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-gray-100 text-gray-800 rounded-tl-none' : 'bg-blue-50 text-gray-800 rounded-tr-none border border-blue-100'}`}>
                     <p className="text-sm font-normal leading-snug break-words">{msg.text}</p>
                   </div>
                   <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>{msg.time}</p>
                 </div>
                 {/* Agent Avatar */}
                 {msg.sender === 'agent' && (
                   <img className="w-6 h-6 rounded-full object-cover flex-shrink-0" src={`https://i.pravatar.cc/24?u=agent`} alt="Agent" onError={(e) => e.target.src='https://placehold.co/24x24/E2E8F0/AAAAAA?text=A'}/>
                 )}
               </div>
             ))}
           </div>

           {/* Message Input Area */}
           <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
             <div className="flex items-center space-x-2 sm:space-x-3">
               <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 hidden sm:inline-block"><LinkIcon /></button>
               <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200"><PaperclipIcon /></button>
               <input type="text" placeholder="Mensagem..." className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" />
               <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 hidden sm:inline-block"><SmileIcon /></button>
               <button className="inline-flex items-center justify-center p-2.5 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"> <SendIcon /> </button>
             </div>
           </div>

        </div>
      </div>
    );
};

// --- TransferTicketModal ---
// Modal for selecting department and person to transfer a ticket
const TransferTicketModal = ({ isOpen, onClose, ticket, onConfirmTransfer }) => {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedPerson, setSelectedPerson] = useState('');
    const modalRef = useRef(null); // Ref for the modal content

    // Mock departments and people for transfer
    const departments = {
        'Suporte N1': ['Ana Silva', 'Bruno Costa', 'Carla Matos'],
        'Suporte N2': ['Carlos Dias', 'Daniela Lima', 'Diego Fernandes'],
        'Desenvolvimento': ['Eduardo Rocha', 'Fernanda Melo', 'Gabriel Souza'],
        'Financeiro': ['Helena Santos', 'Igor Pereira'],
    };
    const peopleInDepartment = departments[selectedDepartment] || [];

    // Reset person selection when department changes
    useEffect(() => {
        setSelectedPerson('');
    }, [selectedDepartment]);

    // Close the modal if clicked outside the content
    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    // Handle the transfer confirmation
    const handleTransfer = () => {
        if (selectedDepartment && selectedPerson) {
            onConfirmTransfer(ticket.id, selectedDepartment, selectedPerson);
            onClose(); // Close modal after confirmation
        } else {
            // Basic validation feedback
            alert("Por favor, selecione um setor e uma pessoa.");
        }
    };

    // Don't render if modal is not open or no ticket is provided
    if (!isOpen || !ticket) return null;

    return (
        // Modal Overlay
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4" onClick={handleOverlayClick}>
            {/* Modal Content */}
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Transferir {ticket.id}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer"> <XIcon /> </button>
                </div>
                {/* Modal Body - Selection inputs */}
                <div className="space-y-4">
                    {/* Department Selection */}
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
                        <select
                            id="department"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
                        >
                            <option value="" disabled>Selecione...</option>
                            {Object.keys(departments).map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                    {/* Person Selection (conditional) */}
                    {selectedDepartment && (
                        <div>
                            <label htmlFor="person" className="block text-sm font-medium text-gray-700 mb-1">Pessoa</label>
                            <select
                                id="person"
                                value={selectedPerson}
                                onChange={(e) => setSelectedPerson(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
                                disabled={peopleInDepartment.length === 0} // Disable if no people in selected dept
                            >
                                <option value="" disabled>Selecione...</option>
                                {peopleInDepartment.map(person => (
                                    <option key={person} value={person}>{person}</option>
                                ))}
                                {peopleInDepartment.length === 0 && <option disabled>Nenhuma pessoa</option>}
                            </select>
                        </div>
                    )}
                </div>
                {/* Modal Footer - Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleTransfer}
                        disabled={!selectedDepartment || !selectedPerson} // Disable if selection is incomplete
                        className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Transferir
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Componente Principal ---
// Manages the overall ticket system state and renders UI components
function TicketSystemWithChatPopup() {
  // --- State Variables ---
  const [tickets, setTickets] = useState(
      // Initialize tickets with originalStatus preserved for reopening logic
      initialTicketsData.map(t => ({...t, originalStatus: t.status}))
  );
  const [activeTab, setActiveTab] = useState('Pendentes'); // Current active tab ('Ativos', 'Pendentes', 'Finalizadas')
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [sortBy, setSortBy] = useState('default'); // Current sorting criteria ('default', 'date', 'status')
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // Visibility of sort dropdown
  const [selectedStatuses, setSelectedStatuses] = useState([]); // Applied status filters
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState([]); // Statuses selected in the dropdown (before applying)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false); // Visibility of filter dropdown
  const [selectedTicket, setSelectedTicket] = useState(null); // The ticket currently selected to show in the chat popup
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false); // Visibility of the transfer modal
  const [ticketToTransfer, setTicketToTransfer] = useState(null); // Ticket selected for transfer

  // --- Refs ---
  const sortDropdownRef = useRef(null); // Ref for the sort dropdown element
  const filterDropdownRef = useRef(null); // Ref for the filter dropdown button

  // --- Memoized Calculations ---
  // Calculate counts for each tab status
  const tabCounts = useMemo(() => {
    return tickets.reduce((acc, ticket) => {
      acc[ticket.tabStatus] = (acc[ticket.tabStatus] || 0) + 1;
      return acc;
    }, { 'Ativos': 0, 'Pendentes': 0, 'Finalizadas': 0 });
  }, [tickets]);

  // Get unique status values from all tickets for the filter dropdown
  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(tickets.map(ticket => ticket.status));
    return Array.from(statuses);
  }, [tickets]); // Recalculate if tickets data changes (e.g., status update)

  // --- Effects ---
  // Effect to handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close sort dropdown
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
      // Close filter dropdown (check button and dropdown content)
      const filterButton = filterDropdownRef.current;
      const filterDropdownContent = filterButton?.nextElementSibling; // Assumes dropdown is next sibling
      if (filterButton && !filterButton.contains(event.target) &&
          filterDropdownContent && !filterDropdownContent.contains(event.target)) {
        setIsFilterDropdownOpen(false);
        // Optionally discard temporary filter changes if closed without applying
        // setTempSelectedStatuses([...selectedStatuses]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- UI Event Handlers ---
  // Toggle dropdown visibility, ensuring only one is open at a time
  const toggleDropdown = (type) => {
    if (type === 'sort') {
      setIsSortDropdownOpen(prev => !prev);
      setIsFilterDropdownOpen(false); // Close filter dropdown
    } else if (type === 'filter') {
      if (!isFilterDropdownOpen) {
        // Sync temp filters with applied ones when opening
        setTempSelectedStatuses([...selectedStatuses]);
      }
      setIsFilterDropdownOpen(prev => !prev);
      setIsSortDropdownOpen(false); // Close sort dropdown
    } else { // Close both if type is null or undefined
      setIsSortDropdownOpen(false);
      setIsFilterDropdownOpen(false);
    }
  };
  const handleSortDropdownToggle = () => toggleDropdown('sort');
  const handleFilterDropdownToggle = () => toggleDropdown('filter');

  // Handle changing the sort criteria
  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    toggleDropdown(null); // Close dropdown
  };

  // Handle checking/unchecking a status filter in the dropdown
  const handleFilterStatusChange = (status) => {
    setTempSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status) // Remove status if already selected
        : [...prev, status] // Add status if not selected
    );
  };

  // Apply the selected status filters
  const applyFilters = () => {
    setSelectedStatuses([...tempSelectedStatuses]);
    toggleDropdown(null); // Close dropdown
  };

  // Clear all status filters
  const clearFilters = () => {
    setSelectedStatuses([]);
    setTempSelectedStatuses([]);
    toggleDropdown(null); // Close dropdown
  };

  // --- Ticket Action Handlers ---
  // Accept a pending ticket, moving it to 'Ativos'
  const handleAcceptTicket = (ticketId) => {
    console.log("Aceitando ticket:", ticketId);
    setTickets(currentTickets =>
      currentTickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, tabStatus: 'Ativos' } : ticket
      )
    );
    // Close chat if the accepted ticket was selected
    if (selectedTicket && selectedTicket.id === ticketId) {
      handleCloseChat();
    }
  };

  // Finish an active ticket, moving it to 'Finalizadas' and setting status to 'Fechado'
  const handleFinishTicketAction = (ticketId) => {
    console.log("Finalizando ticket:", ticketId);
    setTickets(currentTickets =>
      currentTickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, tabStatus: 'Finalizadas', status: 'Fechado' } : ticket
      )
    );
     // Close chat if the finished ticket was selected
    if (selectedTicket && selectedTicket.id === ticketId) {
      handleCloseChat();
    }
  };

  // Reopen a finished ticket, moving it to 'Ativos' and setting status to 'Reaberto'
  const handleReopenTicket = (e, ticketId) => {
    e.stopPropagation(); // Prevent row click event when clicking the button
    console.log("Reabrindo ticket:", ticketId);
    setTickets(currentTickets =>
      currentTickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, tabStatus: 'Ativos', status: 'Reaberto', statusPriority: 2 } : ticket // Assuming 'Reaberto' has medium priority
      )
    );
  };

  // Simulate initiating a call (placeholder action)
  const handleCallUser = (ticketId) => {
    console.log(`Iniciando chamada para o ticket ${ticketId}...`);
    alert(`Ligando para o cliente do ticket ${ticketId}... (Simulação)`); // Placeholder feedback
  };

  // Select a ticket to view in the chat popup (disabled for 'Finalizadas' tab)
  const handleSelectTicket = (ticket) => {
    if (activeTab === 'Finalizadas') {
        setSelectedTicket(null); // Don't select finished tickets for chat
        return;
    }
    setSelectedTicket(ticket);
    // Close dropdowns when a ticket is selected
    setIsSortDropdownOpen(false);
    setIsFilterDropdownOpen(false);
  };

  // Close the chat popup
  const handleCloseChat = () => {
    setSelectedTicket(null);
  }

  // Open the transfer modal for a specific ticket
  const openTransferModal = (ticket) => {
    setTicketToTransfer(ticket);
    setIsTransferModalOpen(true);
    setSelectedTicket(null); // Close chat popup when opening transfer modal
    // Close dropdowns as well
    setIsSortDropdownOpen(false);
    setIsFilterDropdownOpen(false);
  };

  // Close the transfer modal
  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
    setTicketToTransfer(null);
  };

  // Confirm the transfer, removing the ticket from the current user's list (simulation)
  const handleConfirmTransfer = (ticketId, department, person) => {
    console.log(`Transferindo ticket ${ticketId} para ${person} no setor ${department}`);
    // Simulate transfer by filtering out the ticket
    setTickets(currentTickets => currentTickets.filter(t => t.id !== ticketId));
    closeTransferModal();
    alert(`Ticket ${ticketId} transferido para ${person} (${department}). (Simulação)`); // Placeholder feedback
  };

  // --- Filtering and Sorting Logic ---
  // Filter tickets based on active tab, search term, and selected statuses
  const filteredTickets = useMemo(() => {
    // 1. Filter by active tab
    const tabFiltered = tickets.filter(ticket => ticket.tabStatus === activeTab);

    // 2. Filter by search term (case-insensitive) across multiple fields
    const searchFiltered = tabFiltered.filter(ticket => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        searchTerm === '' || // Show all if search is empty
        ticket.title.toLowerCase().includes(searchTermLower) ||
        ticket.id.toLowerCase().includes(searchTermLower) ||
        ticket.category.toLowerCase().includes(searchTermLower) ||
        ticket.user.toLowerCase().includes(searchTermLower) ||
        ticket.issue?.toLowerCase().includes(searchTermLower) // Optional chaining for issue
      );
    });

    // 3. Filter by selected status filters
    const statusFiltered = searchFiltered.filter(ticket => {
      return selectedStatuses.length === 0 || selectedStatuses.includes(ticket.status); // Show all if no filters applied
    });

    return statusFiltered;
  }, [tickets, activeTab, searchTerm, selectedStatuses]); // Recalculate when these dependencies change

  // Sort the filtered tickets based on the selected criteria
  const sortedTickets = useMemo(() => {
    const sortableTickets = [...filteredTickets]; // Create a mutable copy
    switch (sortBy) {
      case 'date':
        // Sort by date descending (newest first)
        sortableTickets.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));
        break;
      case 'status':
        // Sort by status priority (Alto > Médio/Reaberto > Baixo > Outros)
        const getSortPriority = (status) => {
          if (status === 'Alto') return 3;
          if (status === 'Médio' || status === 'Reaberto') return 2; // Treat Reaberto as Médio for sorting
          if (status === 'Baixo') return 1;
          return 0; // Default for Fechado or others
        };
        sortableTickets.sort((a, b) => getSortPriority(b.status) - getSortPriority(a.status));
        break;
      default: // 'default' or any other value - no specific sorting applied (maintains filtered order)
        break;
    }
    return sortableTickets;
  }, [filteredTickets, sortBy]); // Recalculate when filtered list or sort criteria changes

  // Calculate total entries for the current tab (before filtering/searching) for pagination display
  const totalEntriesForTab = useMemo(() =>
      tickets.filter(t => t.tabStatus === activeTab).length,
  [tickets, activeTab]);

  // --- JSX Rendering ---
  return (
    // Outer container with padding
    <div className="p-4 md:p-6 bg-gray-50">
      {/* Main content container with shadow and border */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 font-sans flex flex-col">

        {/* Header Section: Tabs and Controls */}
        <div className="p-4 flex-shrink-0 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Tabs */}
            <div className="flex w-full lg:w-auto overflow-x-auto pb-px">
              {['Ativos', 'Pendentes', 'Finalizadas'].map(tabName => (
                <button
                  key={tabName}
                  onClick={() => { setActiveTab(tabName); setSelectedTicket(null); }} // Change tab and deselect ticket
                  className={`py-2 px-4 text-sm font-medium cursor-pointer whitespace-nowrap ${
                    activeTab === tabName
                      ? 'border-b-2 border-blue-600 text-blue-600' // Active tab style
                      : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300' // Inactive tab style
                  }`}
                >
                  {tabName} ({tabCounts[tabName] || 0}) {/* Display tab name and count */}
                </button>
              ))}
            </div>

            {/* Controls: Search, Filter, Sort */}
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
              {/* Search Input */}
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  ref={filterDropdownRef}
                  onClick={handleFilterDropdownToggle}
                  className="flex w-full justify-center items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <FilterIcon /> Filtrar {selectedStatuses.length > 0 ? `(${selectedStatuses.length})` : ''} {/* Show filter count */}
                </button>
                {/* Filter Dropdown Content */}
                {isFilterDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-30 border border-gray-200 p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Filtrar por Status</h4>
                    {/* Scrollable list of status checkboxes */}
                    <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-2">
                      {uniqueStatuses.map(status => (
                        <label key={status} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50 cursor-pointer"
                            checked={tempSelectedStatuses.includes(status)}
                            onChange={() => handleFilterStatusChange(status)}
                          />
                          <span><StatusBadge status={status} /></span> {/* Display status badge next to checkbox */}
                        </label>
                      ))}
                    </div>
                    {/* Filter actions: Clear and Apply */}
                    <div className="flex justify-end gap-2 border-t border-gray-200 pt-3">
                      <button onClick={clearFilters} className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"> Limpar </button>
                      <button onClick={applyFilters} className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"> Aplicar </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative w-full sm:w-auto" ref={sortDropdownRef}>
                <button
                  onClick={handleSortDropdownToggle}
                  className="flex w-full justify-center items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  Ordenar <ChevronDownIcon />
                </button>
                {/* Sort Dropdown Content */}
                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleSortChange('default'); }} className={`block px-4 py-2 text-sm cursor-pointer ${sortBy === 'default' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>Padrão</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleSortChange('date'); }} className={`block px-4 py-2 text-sm cursor-pointer ${sortBy === 'date' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>Recente</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleSortChange('status'); }} className={`block px-4 py-2 text-sm cursor-pointer ${sortBy === 'status' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>Prioridade</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Body: Ticket Table (Scrollable) */}
        {/* Replaced 'max-h-manual' with 'max-h-[500px]' - Adjust height as needed */}
        <TableContentDiv className="overflow-y-auto px-4 max-h-[500px]"> {/* Vertical scroll container */}
          {/* Horizontal scroll container for the table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Sticky Table Header */}
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 w-24">ID</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Título</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 hidden md:table-cell">Categoria</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 hidden lg:table-cell">Usuário</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 w-28">Status</th>
                  <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6 text-center text-xs font-medium uppercase tracking-wide text-gray-500 w-24">Ações</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => handleSelectTicket(ticket)} // Select ticket on row click
                    className={`hover:bg-gray-100 ${selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''} ${activeTab === 'Finalizadas' ? 'cursor-default' : 'cursor-pointer'}`} // Highlight selected row, disable cursor for finished tab
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{ticket.id}</td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      <div className="truncate w-40 sm:w-auto font-medium">{ticket.title}</div> {/* Truncate long titles */}
                      <div className="text-xs text-gray-500">{ticket.date}</div>
                    </td>
                    <td className="hidden md:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ticket.category}</td>
                    <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ticket.user}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                      {/* Action Buttons based on active tab */}
                      <div className="inline-flex items-center gap-x-2">
                        {activeTab === 'Pendentes' && (
                          <button onClick={(e) => { e.stopPropagation(); handleAcceptTicket(ticket.id); }} title="Aceitar" className="p-1.5 text-green-600 hover:bg-green-100 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"> <CheckIcon /> </button>
                        )}
                        {activeTab === 'Ativos' && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); handleFinishTicketAction(ticket.id); }} title="Finalizar" className="p-1.5 text-red-600 hover:bg-red-100 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"> <PowerOffIcon /> </button>
                            <button onClick={(e) => { e.stopPropagation(); openTransferModal(ticket); }} title="Transferir" className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500"> <ShareIcon /> </button>
                          </>
                        )}
                        {activeTab === 'Finalizadas' && (
                          <button onClick={(e) => handleReopenTicket(e, ticket.id)} title="Reabrir" className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"> <RefreshCwIcon /> </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Message when no tickets are found */}
                {sortedTickets.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-10 px-4 text-sm text-gray-500">
                      Nenhum ticket encontrado para "{activeTab}"{searchTerm || selectedStatuses.length > 0 ? ' com os filtros aplicados' : ''}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TableContentDiv>

        {/* Footer Section: Pagination Info and Controls */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200">
          <p className="text-sm text-gray-700 mb-2 sm:mb-0">
            Mostrando {sortedTickets.length > 0 ? `1-${sortedTickets.length}` : '0'} de {totalEntriesForTab} entradas
            {selectedStatuses.length > 0 || searchTerm ? ' (filtradas)' : ''} {/* Indicate if results are filtered */}
          </p>
          {/* Basic Pagination Buttons (non-functional) */}
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" disabled>Anterior</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">Próximo</button>
          </div>
        </div>
      </div>

      {/* Popups/Modals */}
      {/* Chat Popup: Rendered conditionally based on selectedTicket and activeTab */}
      {selectedTicket && activeTab !== 'Finalizadas' && (
        <ChatInterfacePopup
            ticket={selectedTicket}
            onClose={handleCloseChat}
            onCall={handleCallUser}
            onFinish={handleFinishTicketAction}
            onAccept={handleAcceptTicket}
            onTransfer={openTransferModal}
        />
      )}
      {/* Transfer Modal: Rendered conditionally */}
      <TransferTicketModal
        isOpen={isTransferModalOpen}
        onClose={closeTransferModal}
        ticket={ticketToTransfer}
        onConfirmTransfer={handleConfirmTransfer}
      />
    </div>
  );
}

// Export the main component
export default TicketSystemWithChatPopup;
