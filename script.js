
const account1 = {
  owner: 'Sisay Yadessa',
  movements: [100, 250, -800, -600, 1500, -410, 30, 2300],
  interestRate: 1.5, // %
  pin: 1111,
  movementDate: [
    '2013,6,22,1,3,24',
    '2022,9,2,11,55,44',
    '2013,6,22,1,3,44',
    '2037,11,2,12,34,34',
    '2037,1,2,12,34,44',
    '2007,8,2,9,4,14',
    '2022,9,2,11,55,24',
    '2007,8,2,9,4,44',
  ],
};

const account2 = {
  owner: 'Eyob Yadessa',
  movements: [600, 2700, -250, -190, -2410, -1000, 4800, -30],
  interestRate: 1.2,
  pin: 2222,
  movementDate: [
    '2013,6,22,1,3,44',
    '2007,8,2,9,4,44',
    '2022,9,2,11,55,44',
    '2037,11,2,12,34,44',
    '2037,11,2,12,34,34',
    '2013,6,22,1,3,24',
    '2007,8,2,9,4,14',
    '2022,9,2,11,55,24',
  ],
};

const account3 = {
  owner: 'Bishu Ketsela',
  movements: [200, -200, -140, 760, 120, 40, 400, -60],
  interestRate: 0.5,
  pin: 3333,
  movementDate: [ //Y,M,D,H,MIN,SEC
    '2013,6,22,1,3,44',
    '2037,11,2,12,34,44',
    '2022,9,2,11,55,44',
    '2007,8,2,9,4,44',
    '2037,11,2,12,34,34',
    '2013,6,22,1,3,24',
    '2007,8,2,9,4,14',
    '2022,9,2,11,55,24',
  ],
};

const account4 = {
  owner: 'Yadessa Midekissa',
  movements: [340, 9600, -600, 130, 200],
  interestRate: 1,
  pin: 4444,
  movementDate: [
    '2037,11,2,12,34,44',
    '2013,6,22,1,3,44',
    '2007,8,2,9,4,44',
    '2022,9,2,11,55,44',
    '2025,4,25,10,0,0',

  ],
};

const accounts = [account1, account2, account3, account4];

// Elemensts
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');

const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');

const depositBtn = document.querySelector(".form__btn--EnterAmount");
const enterDeposit = document.querySelector('.form__input--em');

const withdrawBtn = document.querySelector(".form__btn--EnterWithAmount");
const enterWithdraw = document.querySelector('.form__input--ewithm');

const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const changeUsd = document.querySelector('.change');

const createBtn = document.querySelector('.createAccount')
const disp = document.querySelector('.display');

const fname = document.querySelector('.fname');
const lname = document.querySelector('.lname');
const initalDeposit = document.querySelector('.initDeposit');
const psw = document.querySelector('.psw')

const submit = document.querySelector('.submit');
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const d = new Date();
const dateArr = [ //to add date in movementDate array
  d.getFullYear(),
  d.getMonth() + 1,
  d.getDate(),
  d.getHours(),
  d.getMinutes(),
  d.getSeconds()
].join(',');

// console.log(dateArr)


labelDate.textContent = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`

/////////////////////////////////////////////////
const display = function (acc, sort) {
  containerMovements.innerHTML = ''   // it remove the old or previous array

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements //If sort is true, we clone movements1 and sort it ascendingly.b/se it's a-b
  //slice() creates a shallow copy of the array movements1.

  movs.forEach(function (mov, i) {

    const dateParts = acc.movementDate[i].split(',').map(Number);
    /*   .split(',') → splits the string into parts using commas.
       .map(Number) → converts "each" string part into a number.
       for e.g console.log(typeof (dateParts[0])) is number b/se of map(Number) but
       console.log(typeof (dateParts)) is Object b/se it's array
   */

    const datesMovs = new Date(...dateParts);
    const day = String(datesMovs.getDate()).padStart(2, '0'); //to use padStart we muse use string convertion
    const month = String(datesMovs.getMonth()).padStart(2, '0'); // JS months are 0-indexed
    const year = datesMovs.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const convertedMov = isUSD ? mov * 1.14 : mov;
    const currency = isUSD ? '$' : '€';
    const type = (mov > 0) ? 'deposit' : 'withdraw';

    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__date">${formattedDate}</div>

          <div class="movements__value">${currency}${convertedMov.toFixed(2)}</div>
        </div>;  `


    containerMovements.insertAdjacentHTML('afterbegin', html)

  })
}

const balance = function (uu) {
  const read = uu.reduce(function (sum, mov) {
    return sum + mov;
  }, 0) // ,0= sum is noting which initialy zero
  const converted = isUSD ? read * 1.14 : read;
  const currency = isUSD ? '$' : '€';
  labelBalance.textContent = `${currency}${converted.toFixed(2)}`;
  return read; // for line no. around 340 or for btnTransfer
}

// let x=accounts.find(function(name){  //the paramter name is copies of 4 accounts form account array
//   return name.owner==='Sarah Smith';   
// })
// console.log(x)

const valueIn = function (x) { // the x variable is hold copies movements
  const inCash = x.filter(function (mov) {
    return mov > 0;
  }).reduce(function (sum, mov) {
    return sum + mov;
  }, 0)

  const addCash = isUSD ? inCash * 1.14 : inCash;
  const currency1 = isUSD ? '$' : '€'
  labelSumIn.textContent = `${currency1}${addCash.toFixed(2)}`
}

const valueOut = function (j) {
  const outCash = j.filter(function (mov1) {
    return mov1 < 0;
  }).reduce(function (s, mov1) {
    return s + mov1;
  }, 0)// ,0 means initial s=0 OR ,0 means If your array is empty, it just returns 0 without no crash, no error. for e.g somebody account have only deposit it's return valueout=0
  const subCash = isUSD ? outCash * 1.14 : outCash
  const currency1 = isUSD ? '$' : '€'

  labelSumOut.textContent = `${currency1}` + Math.abs(`${subCash}`).toFixed(2)
}
const interestIn = function (ij) { // ij is the variable hold copies of current account w/c contain owner,mov,ir, and pin
  const interestCash = ij.movements.filter(function (m) {
    return m > 0;
  }).map(function (m) { //now the variable m that found in map parameter is movements that are >0 which is gained from filter output
    return (ij.interestRate * m) / 100;
  }).reduce(function (s, m1) { // m1 is gained from map output
    return s + m1;
  }, 0)
  const intersted = isUSD ? interestCash * 1.14 : interestCash;
  const currency1 = isUSD ? '$' : '€'
  labelSumInterest.textContent = `${currency1}${intersted.toFixed(2)}`
}
/* for e.g account jd
  Step-by-step interest calc:
Ony deposits:

[5000, 3400, 8500]
Interest per deposit (at 1.5%):
5000 × 1.5% = 75
3400 × 1.5% = 51
8500 × 1.5% = 127.5

Total interest:75+51+127.5=253.50
*/

const upDate = function () {
  display(currentAccount)
  balance(currentAccount.movements)
  valueIn(currentAccount.movements)
  valueOut(currentAccount.movements)
  interestIn(currentAccount)
}
let timeZone;
const grid = function () {
  let time = 180;

  const tz = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, "0");// to use padStart() method we must use String datatype
    let sec = String(Math.trunc(time % 60)).padStart(2, "0");// module %
    labelTimer.textContent = `${min}:${sec}`

    if (time === 0) {
      clearInterval(timeZone); //this method used to clear setInterval method()
      labelWelcome.textContent = 'Log in to get started'
      containerApp.style.opacity = '0';
    }

    time--;
  }

  tz();
  timeZone = setInterval(tz, 1000)

  return timeZone;
}
let a = Math.trunc(Math.random() * 9) + 1;

let userName1;
const currentUser = function (user) {
  user.forEach(function (acc) {
    acc.userName1 = acc.owner.toLowerCase().split(' ').map(function (name) {
      return name[0];
    }).join('');
    console.log(acc.userName1);
  })
}
currentUser(accounts);

let currentAccount
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();   //// This stops the form from reloading the page
  // console.log('gg')

  currentAccount = accounts.find(function (x) { // the paramter x is copies of 4 accounts form account array
    return x.userName1 === inputLoginUsername.value  // the variable userName1 comes from currentUser function
  }) //after checking identicality of username the u can move to checking psw on line no.294
  console.log(currentAccount)

  if (inputLoginUsername.value === '') {
    window.alert('please fill the user inputbox')

  }
  else if (!currentAccount) {
    window.alert('You are not user❌')

  }
  else if (currentAccount.pin !== Number(inputLoginPin.value)) {
    window.alert('You use incorrect pin')
  }

  //currentAccount.accounts
  else if (currentAccount.pin === Number(inputLoginPin.value)) //by default all numbers that user insert into inputbox are string so, that is why we converted into number
  {
    containerApp.style.opacity = '100';
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0].charAt(0).toUpperCase() + currentAccount.owner.split(' ')[0].slice(1).toLowerCase()}`// this means select the first name or index until whitespace containing
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur()  //used to remove the blinking cursor from pin input box after clicking the -> button
    inputLoginUsername.blur();
    if (timeZone) {
      clearInterval(timeZone)
    }
    timeZone = grid(); //setTimeout and SetInterval methods used for security issues
    upDate()

  }
  document.querySelector('.display').remove();//permanently remove the form
  disp.style.opacity = '0';
})


btnClose.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the form from reloading

  // Check if username and pin match
  if (inputCloseUsername.value === currentAccount.userName1 && Number(inputClosePin.value) === currentAccount.pin) {

    // Find the index of the account to be closed
    const indexacc = accounts.findIndex(function (acc) { //the parameter acc is copies of 4 accounts form account array
      return acc.userName1 === currentAccount.userName1;
    });

    // Remove the account from the accounts array
    accounts.splice(indexacc, 1);

    // Hide the app interface by changing its opacity
    containerApp.style.opacity = 0;
    console.log(accounts)
    // Reset the welcome message
    labelWelcome.textContent = 'Log in to get started';
    inputCloseUsername.value = inputClosePin.value = ''; // Clear the input fields
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  let amountTrans = Number(inputTransferAmount.value)

  const receverAccount = accounts.find(function (n) {
    return n.userName1 === inputTransferTo.value;
  })
  if (amountTrans > 0 &&
    receverAccount &&
    balance(currentAccount.movements) >= amountTrans &&
    receverAccount.userName1 !== currentAccount.userName1
  ) {
    currentAccount.movements.push(-amountTrans);// in movments array[-333] put like this
    receverAccount.movements.push(amountTrans)

    currentAccount.movementDate.push(dateArr)
    receverAccount.movementDate.push(dateArr)


    upDate();
    clearInterval(timeZone) //to update the running time to three minutes/reset the time to 03:00
    timeZone = grid();
  }
  inputTransferAmount.value = inputTransferTo.value = ''
})




btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputLoanAmount.value === '') {
    window.alert('please fill the input box of loan amount')
  } else {
    window.alert('Please wait one miniuts to approve loan🫷')//after u prss ok window alert button the time reset to 03:00
  }

  let amount = Number(inputLoanAmount.value)
  const loan = currentAccount.movements.some(function (m) {
    return m >= amount * 0.1;  //if there is one movments that is Greater-than  your want loan or the amount variable times 10%  otherwise no loan
  })
  clearInterval(timeZone) //to update the running time to three minutes/reset the time to 03:00
  timeZone = grid();
  setTimeout(function () {
    if (amount > 0 && loan) {
      currentAccount.movements.push(Math.floor(amount))
      currentAccount.movementDate.push(dateArr)
      upDate()
      window.alert('congra! you loan is approved🍾')
    }
    else {
      window.alert('Sorry, none of your transaction are greater than or equal to 10% of your requested loan,')
    }
  }, 60000)
  inputLoanAmount.value = ''

})


depositBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (enterDeposit.value !== '') // is not to be enterDeposit.value!==0 b/se every thing in js by default is string not number
  {
    let deposit = Number(enterDeposit.value);
    currentAccount.movements.push(deposit);
    currentAccount.movementDate.push(dateArr)

    upDate();

    enterDeposit.value = ''
    clearInterval(timeZone) //to update the running time to three minutes/reset the time to 03:00
    timeZone = grid();
  }
})



withdrawBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (enterWithdraw.value !== '') {
    let withdraw = Number(enterWithdraw.value);
    currentAccount.movements.push(-withdraw);
    currentAccount.movementDate.push(dateArr)

    upDate();
    enterWithdraw.value = ''
    clearInterval(timeZone) //to update the running time to three minutes/reset the time to 03:00
    timeZone = grid();

  }

})

let isUSD = false;
changeUsd.addEventListener('click', function (e) {
  e.preventDefault(e);
  isUSD = !isUSD //after switching their is function calling 
  upDate()

  console.log(isUSD)
})
let sorted = false

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sorted = !sorted; // to switch when i click sort button ////after switching their is function calling 
  display(currentAccount, sorted)

  console.log(sorted)
})

/* 
setTimeout(function(){
  console.log('hy you')
},1000)*/


submit.addEventListener('click', function (e) {
  e.preventDefault();

  // Reselect the input fields now that they exist
  const fname = document.querySelector('.fname').value.trim();//trim() removes whitespace from both ends of a string.
  const mname = document.querySelector('.mname').value.trim();
  const lname = document.querySelector('.lname').value.trim();

  const deposit = Number(document.querySelector('.initDeposit').value);


  // First Name: required, letters only
  if (fname === '') {
    alert('First Name is required.');
    return;
  }
  if (!/^[A-Za-z]+$/.test(fname)) {
    alert('First Name must contain only letters.');
    return;
  }
  if (mname === '') {
    alert('Middle Name is required.');
    return;
  }
  if (!/^[A-Za-z]+$/.test(mname)) {
    alert('Middle Name must contain only letters.');
    return;
  }

  // Last Name: required, letters only
  if (lname === '') {
    alert('Last Name is required.');
    return;
  }
  if (!/^[A-Za-z]+$/.test(lname)) {
    alert('Last Name must contain only letters.');
    return;
  }

  // Deposit: required, must be a number and > 50
  if (deposit < 50) {
    alert('Initial Deposit must be a number greater than or equal to 50.');
    return;
  }


  // === UNIQUENESS CHECK ===
  const nameExists = accounts.some(acc => acc.owner === `${fname} ${lname}`);
  if (nameExists) {
    alert('An account with this name already exists.');
    return;
  }


  const minNum = 0;
  const maxNum = 9;
  const x = Math.trunc(Math.random() * (maxNum - minNum)) + minNum;
  const y = Math.trunc(Math.random() * (maxNum - minNum)) + minNum;
  const z = Math.trunc(Math.random() * (maxNum - minNum)) + minNum
  a = Math.trunc(Math.random() * (maxNum - minNum)) + minNum;

  const pinNum = Number(x + '' + y + '' + z + '' + a)
  // If all validation passes, create account

  const newAcc = {
    owner: `${fname} ${mname} ${lname}`,
    movements: [deposit],
    interestRate: 1.0, // default interest rate
    pin: pinNum,
    movementDate: [dateArr],
  };

  accounts.push(newAcc);
  currentUser(accounts); // regenerate usernames

  alert(`Account created successfully! You can now log in with your username, ${newAcc.userName1}, and PIN: ${pinNum}`);
  fname.value = mname.value = lname.value = ''
  document.querySelector('.display').remove(); // permanently remove the form
  disp.style.opacity = '0';

})

/*
/^[A-Za-z]+$/
This is a regular expression (regex) pattern.

^ → start of the string

[A-Za-z] → allows only letters, uppercase (A–Z) or lowercase (a–z)

+ → one or more letters (at least one required)

$ → end of the string

The first / = start of the pattern reqular experetion regex

The last / = end of the pattern  reqular experetion regex

Everything inside = the actual regex

^ in regex means:
"Start of string"

It tells the regex engine:
👉 “The pattern must begin at the start of the string.”

/^A/.test("Apple");   // ✅ true → starts with A
/^A/.test("Banana");  // ❌ false → starts with B

$ in regex means:
"End of string"

It tells the regex engine:
👉 “The pattern must end here — at the end of the string.”


/B$/.test("Web");     // ✅ true → ends with "B"
/B$/.test("Blog");    // ❌ false → ends with "g"

*/

// let newAccount
// submit.addEventListener('click',function(e){
//   e.preventDefault();


//      newAccount= `{
//       owner:${fname.value.trim()+' '+lname.value.trim()},
//       movements: [${initalDeposit.value}],
//       interestRate: 1.2,
//       pin: ${psw.value},
//       movementDate:[
//         ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}
//       ],
//     }`
//     accounts.push(newAccount)
//     currentUser(accounts); // regenerate usernames

//   console.log(`${fname.value+''+lname.value}`)

// })

// const act = [33, 43, 42, 41, 55, 65, 23];

// act.forEach(function (m, l, a) {
//   if (m < 50)
//     console.log(m, l, a)
// })
// spreads operator
// function add(a, b, c) {
//   return a + b + c;
// }

// const values = [1, 2, 3];
// console.log(add(...values)); // It "spreads" the array into individual elements.  Output: 6

