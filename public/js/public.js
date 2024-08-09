
const renderTickets = (tickets = []) => {
  for(let i = 0;i<tickets.length;i++){
    if(i>=4) break;
    const ticket = tickets[i];
    if(!ticket) continue;
    const lblTicket = document.querySelector(`#lbl-ticket-0${i+1}`);
    const lblDesk = document.querySelector(`#lbl-desk-0${i+1}`);
    
    lblTicket.innerText = `Ticket: ${ticket.number}`;
    lblDesk.innerText = ticket.handleAtDesk;
  }
}

const loadCurrentTickets = async () => {
  const tickets = await fetch('http://localhost:3000/api/ticket/working-on').then(res=>res.json());
  renderTickets(tickets);
};

loadCurrentTickets();