let events = [];
let arreglo = [];  // CARGAR LA INFORMACION 
/* DECLARACION DE LAS VARIABLES DE LAS REFERENCIAS DE LOS INPUTS Y LOS BOTONES */
const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const buttonAdd = document.querySelector('#bAdd');
const eventsContainer = document.querySelector('#eventsContainer');
const form = document.querySelector('.form');

/* LOCAL STORAGE */

// try {
//     arr = JSON.parse(json);
// } catch (error) {
//     arr = [];
// }
// events = arr ? [...arr] : [];


/* AGREGO EL EVENTO DEL LISTENER */

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addEvent();
});

buttonAdd.addEventListener('click', (e) => {
    e.preventDefault();
    addEvent();
});

const addEvent = () => {
    if (eventName.value === "" || eventDate.value === "") {
        return;
    }
    if (dateDiff(eventDate.value) < 0) {
        return;
    }

    /* CREO UN OBJETO */
    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value
    };

    events.unshift(newEvent); // lo agrego al arreglo

    

    eventName.value = "";
    renderEvent();
};

/* ME REGRESA EL NUMERO DE DIAS QUE FALTA  */
const dateDiff = (d) => {
    const targetDate = new Date(d);
    const today = new Date();
    const diference = targetDate.getTime() - today.getTime();
    const days = Math.ceil(diference / (1000 * 3600 * 24));
    return days;
};

/* RENDERIZO LOS EVENTOS */
const renderEvent = () => {
    const eventsHtml = events.map(event => {
        return `
        <div class="event">
            <div class="days">
            <span class="days-number">${dateDiff(event.date)}</span>
            <span class="days-text">Dias</span>
            </div>

            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>

            <div class="actions" >
                <button class="bDelete" data-id="${event.id}">ELIMINAR</button>
            
            </div>
        </div>
        `;

    });
    eventsContainer.innerHTML = eventsHtml.join("");
    const btnDelete = document.querySelectorAll('.bDelete');

    /* ELIMINO UN EVENTO GUARDADO */
    btnDelete.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = button.getAttribute('data-id');
            events = events.filter(event => event.id !== id)
            renderEvent();
        })
    });
}

// /* LOCAL STORAGE */
// const save = (data) => {
//     localStorage.setItem('items', data);
// }

// const load = () => {
//     return localStorage.getItem('items');
// }