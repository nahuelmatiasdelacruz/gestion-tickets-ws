const currentTicketLbl = document.querySelector('span');
const createTicketBtn = document.querySelector('button');

const getLastTicket = async () => {
  const lastTicket = await fetch('http://localhost:3000/api/ticket/last', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => res.json());
  currentTicketLbl.innerHTML = lastTicket;
};

const createTicket = async () => {
  const newTicket = await fetch('http://localhost:3000/api/ticket/',{
    method: 'POST'
  }).then(res=>res.json());
  currentTicketLbl.innerHTML = newTicket.number;
}

createTicketBtn.addEventListener('click',createTicket);

getLastTicket();
