const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');
const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');
const lblCurrentTicket = document.querySelector('small');


const searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){
  window.location = 'index.html';
  throw new Error('Escritorio es requerido');
}

const deskNumber = searchParams.get('escritorio');
let workingTicket = null;
deskHeader.innerText = deskNumber;

const checkTicketCount = (currentCount = 0) => {
  if(currentCount === 0){
    noMoreAlert.classList.remove('d-none');
  }else{
    noMoreAlert.classList.add('d-none');
  }
  lblPending.innerHTML = currentCount;
}

const loadInitialCount = async () => {
  const pending = await fetch('http://localhost:3000/api/ticket/pending').then(res=>res.json());
  checkTicketCount(pending.length);
}

const getTicket = async () => {
  await finishTicket();
  const {status,ticket} = await fetch(`http://localhost:3000/api/ticket/draw/${deskNumber}`).then( res => res.json());
  if(status === 'error'){
    lblCurrentTicket.innerText = message;
    return;
  };
  workingTicket = ticket;
  lblCurrentTicket.innerText = ticket.number;
}

const finishTicket = async () => {
  if(!workingTicket) return;
  const {status,message} = await fetch(`http://localhost:3000/api/ticket/done/${workingTicket.id}`,{
    method: 'PUT'
  }).then(res=>res.json());
  if(status === 'ok'){
    workingTicket = null;
    lblCurrentTicket.innerText = 'Nadie';
  }
}

const connectToWebSockets = () => {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
    const {type,payload} = JSON.parse(event.data);
    if(type!=='on-ticket-count-changed') return;
    lblPending.innerHTML = payload;
    checkTicketCount(payload);
  };

  socket.onclose = ( event ) => {
    setTimeout( () => {
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}

btnDraw.addEventListener('click',getTicket);
btnDone.addEventListener('click',finishTicket);

connectToWebSockets();
loadInitialCount();