// Select all filter buttons and filterable cards
const filterButtons = document.querySelectorAll(".calculator-buttons button");
const filterableCards = document.querySelectorAll(".calculators .card");
const cardDescription = document.getElementById('description')

// Define the filterCards function
const filterCards = e => {
    document.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');

    //Iterate over each filterable card
    filterableCards.forEach(card => {
        // add "hide" class to hide the card nitially
        card.classList.add('hide')
        // Check f the card matches the selected filter or "all" is selected
        if (card.dataset.name === e.target.dataset.name) {
            card.classList.remove('hide');
            if (e.target.dataset.name === 'calculate') {
                cardDescription.innerHTML = 'This is a regular calculator';
            } else if (e.target.dataset.name === 'age') {
                cardDescription.innerHTML = 'This is an Age Calculatore';
            } else if (e.target.dataset.name === 'age-days') {
                cardDescription.innerHTML = 'This Calculate Age in days';
            } else if (e.target.dataset.name === 'time') {
                cardDescription.innerHTML = 'This is time calculator';
            }
        }
    })

}

// add click event listener to each filter button
filterButtons.forEach(button => button.addEventListener('click', filterCards));

// calculate

const display = document.getElementById('display');

function appendToDsiplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = '';
}

function calculate1() {
    if (display.value.trim() !== '') {
        try {
            let result = eval(display.value);
            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid Operation');
            }
            display.value = result;
        } catch (error) {
            if (error instanceof TypeError && error.message.includes('divide by zero')) {
                display.value = 'You cant divide by 0';
            } else {
                display.value = '';
            }
        }
    }
}

// calculate age

const calculate2 = document.getElementById('age');
const inputValue = document.getElementById('input-value');
const output = document.getElementById('output');

function calculateAge() {
    const birthdayValue = inputValue.value;
    if (birthdayValue === 0) {
        alert('plase enter birthday');
    } else {
        let age = getAge(birthdayValue);
        output.innerText = `Your age is ${age} ${age > 1 ? "Years" : "Year"} old`
    }
}

function getAge(birthdayValue) {
    const currentDate = new Date();
    const birthday = new Date(birthdayValue);
    let age = currentDate.getFullYear() - birthday.getFullYear();
    const month = currentDate.getMonth() - birthday.getMonth();

    if (
        month < 0 ||
        (month === 0 && currentDate.getDate() < birthday.getDate())
    ) {
        age--;
    }
    return age;
}

// age in days 

calculate2.addEventListener('click', calculateAge);

const defaultValue = document.getElementById('default-value');
const ageValue = document.getElementById('input-value-days');
const calculate3 = document.querySelector('.age-days button');
const output2 = document.getElementById('output2');


calculate3.addEventListener('click', () => {
    const currentDate = defaultValue.value;
    const birthdayValue = ageValue.value;

    let date = new Date(currentDate);

    let birthday = new Date(birthdayValue);

    let daysInMills = date - birthday;

    let countDays = Math.floor(daysInMills / (1000 * 60 * 60 *24));

    let years = date.getFullYear() - birthday.getFullYear();
    
    let contMonths = date.getMonth() - birthday.getMonth();

    output2.innerText = `You are ${countDays} Days Old And ${years * 12 + contMonths} Month Old`;
})

// Calculate Time

const timeDate = document.getElementById('time-date');
const calculate4 = document.querySelector('.time button');
const output3 = document.getElementById('output3');
const years = document.getElementById('years');
const months = document.getElementById('months');
const days = document.getElementById('days');


calculate4.addEventListener('click', () => {
    let time = timeDate.value;

    let currentDate = new Date();
    let date = new Date(time);

    let contYears = date.getFullYear() - currentDate.getFullYear(); // substrac date year from curren Year

    let howMonths = date.getMonth() - currentDate.getMonth(); // month we need to complate year

    months.innerHTML = `Time in months : ${contYears * 12 + howMonths}`; // multyplay years by 12 and substrac months we need to complate a year

    let contMonths = (contYears * 12 + howMonths) % 12; // how months going to stay after dived years into months

    if (howMonths <= 0 && !contMonths == 0) {
        contYears--;
    } // if the year didn't complate 12 months its not goning to count
    years.innerHTML = `Time in years : ${contYears}`;

    // cont days          

    let diffInMillis = date - currentDate;// substrac date from curren date and reuturn the result in millis seconds

    // Convert the difference to days
    let countDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24)); // get a day and dived the mill second to it 

    days.innerHTML = `Time in days: ${countDays}`;

    output3.style.display = 'flex';
})
