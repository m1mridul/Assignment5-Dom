const busLayout = [
    [{ seat: 'A1', class: 'Business' }, { seat: 'A2', class: 'Business' }, null, { seat: 'A3', class: 'Business' }, { seat: 'A4', class: 'Business' }],
    [{ seat: 'B1', class: 'Economy' }, { seat: 'B2', class: 'Economy' }, null, { seat: 'B3', class: 'Economy' }, { seat: 'B4', class: 'Economy' }],
    [{ seat: 'C1', class: 'Economy' }, { seat: 'C2', class: 'Economy' }, null, { seat: 'C3', class: 'Economy' }, { seat: 'C4', class: 'Economy' }],
    [{ seat: 'D1', class: 'Economy' }, { seat: 'D2', class: 'Economy' }, null, { seat: 'D3', class: 'Economy' }, { seat: 'D4', class: 'Economy' }],
    [{ seat: 'E1', class: 'Economy' }, { seat: 'E2', class: 'Economy' }, null, { seat: 'E3', class: 'Economy' }, { seat: 'E4', class: 'Economy' }],
    [{ seat: 'F1', class: 'Economy' }, { seat: 'F2', class: 'Economy' }, null, { seat: 'F3', class: 'Economy' }, { seat: 'F4', class: 'Economy' }],
    [{ seat: 'G1', class: 'Economy' }, { seat: 'G2', class: 'Economy' }, null, { seat: 'G3', class: 'Economy' }, { seat: 'G4', class: 'Economy' }],
    [{ seat: 'H1', class: 'Economy' }, { seat: 'H2', class: 'Economy' }, null, { seat: 'H3', class: 'Economy' }, { seat: 'H4', class: 'Economy' }],
    [{ seat: 'I1', class: 'Economy' }, { seat: 'I2', class: 'Economy' }, null, { seat: 'I3', class: 'Economy' }, { seat: 'I4', class: 'Economy' }],
    [{ seat: 'J1', class: 'Economy' }, { seat: 'J2', class: 'Economy' }, null, { seat: 'J3', class: 'Economy' }, { seat: 'J4', class: 'Economy' }]
];

const busElement = document.getElementById('bus');
const selectedSeatsInput = document.getElementById('selected-seats');
const selectedSeatsInput2 = document.getElementById('selected-seats');
const totalPriceDisplay = document.getElementById('total-price');
const grandtotalPriceDisplay = document.getElementById('grand-total-price');
const availableSeatsDisplay = document.getElementById('available-seats');
const selectedSeatClassDisplay = document.getElementById('selected-seat-class');

let availableSeats = 24;
let selectedSeats = [];
function generateBusLayout() {
    let busHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < busLayout.length; i++) {
        busHTML += '<div style="display: flex; justify-content: center; margin-bottom: 10px;">';
        busHTML += `<div style="width: 20px; margin: 5px; display: flex; justify-content: center; align-items: center; font-weight: bold;">${alphabet[i]}</div>`;
        for (let j = 0; j < busLayout[i].length; j++) {
            const seatData = busLayout[i][j];
            if (seatData === null) {
                busHTML += '<div style="width: 40px; height: 40px; margin: 5px;"></div>';
            } else {
                const { seat, class: seatClass } = seatData;
                const seatId = `${i}-${j}`;
                busHTML += `<div style="width: 40px; height: 40px; margin: 5px; background-color: ${seat ? '#ccc' : 'transparent'}; cursor: ${seat ? 'pointer' : 'default'}; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold;" data-id="${seatId}" data-class="${seatClass}" ${seat ? `onclick="selectSeat('${seatId}', '${seatClass}')"` : ''}>${seat || ''}</div>`;
            }
        }
        busHTML += '</div>';
    }
    busElement.innerHTML = busHTML;
    updateAvailableSeats();
}

function selectSeat(seatId, seatClass) {
    const seat = document.querySelector(`[data-id="${seatId}"]`);
    if (!seat) return; // Gap clicked, do nothing
    if (seat.classList.contains('selected')) {
        seat.style.backgroundColor = '#ccc';
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(id => id !== seatId);
        availableSeats++;
    } else {
        if (selectedSeats.length < 4 && availableSeats > 0) {
            seat.style.backgroundColor = '#6c6';
            seat.classList.add('selected');
            selectedSeats.push(seatId);
            availableSeats--;
        } else {
            alert('You can select at most 4 seats and available seats are not enough.');
        }
    }
    updateTotalPrice();
    updateGrandTotalPrice();
    updateAvailableSeats();
    updateSelectedSeatClass(seatClass);
}

function updateTotalPrice() {
    const pricePerSeat = 500;
    const totalPrice = selectedSeats.length * pricePerSeat;
    totalPriceDisplay.textContent = totalPrice;
    selectedSeatsInput.value = selectedSeats.join(',');
}
function updateGrandTotalPrice() {
    const pricePerSeat = 500;
    const totalPrice = selectedSeats.length * pricePerSeat;
    grandtotalPriceDisplay.textContent = totalPrice;
    selectedSeatsInput.value = selectedSeats.join(',');
}
function updateAvailableSeats() {
    availableSeatsDisplay.textContent = availableSeats;
}

function updateSelectedSeatClass(seatClass) {
    selectedSeatClassDisplay.textContent = seatClass;
}
generateBusLayout();