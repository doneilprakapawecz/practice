import '../scss/main.scss';


// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

console.log('HELLO 🚀')
let id_uzytkownika = "";
let stan_logowania = 0;

function przerwij() {
    document.querySelector(".rejestracja").classList.remove("rejestracja---js");
    document.querySelector('.logowanie').classList.remove("logowanie---js");
}

const system_logowania = {
    imie: "daniel",
    wiek: 40,
    tablica: [], //zawiera nick uczestnika
}
if (!localStorage.getItem("nickName")) {
    localStorage.setItem("nickName", JSON.stringify(system_logowania));

}
const system = JSON.parse(localStorage.getItem("nickName"))

document.querySelector(".przerwij--js").addEventListener('click', przerwij);

const screen = document.querySelector('.screen--js')
const rejestracja = document.querySelector('.rejestracja--js');
rejestracja.addEventListener('click', () => {
    if (stan_logowania == 0) {
        przerwij();
        document.querySelector(".rejestracja").classList.add("rejestracja---js");
    } else {
        alert('najpierw się wyloguj');
    }
});
const button_zatwierdz = document.querySelector('.zatwierdz');
const nick = document.querySelector('.nicko');
const haslo1 = document.querySelector('.haslo1');
const haslo2 = document.querySelector('.haslo2');
button_zatwierdz.addEventListener('click', () => {
    let flaga = 0;
    let haslo = 0;
    if (nick.value == "") {
        alert('nick nie może być pusty');
        flaga = 1;
    }
    if (system.tablica.length > 0) {
        for (let i = 0; i < system.tablica.length; i++) {
            if (nick.value === system.tablica[i].nazwa_uzytkownika) {
                alert('ten nick już istnieje, wybierz inny');
                flaga = 1;
                nick.value = "";
            }
        }
    }
    if (haslo1.value < 4 || haslo1 > 100) {
        alert('hasło musi mieć co najmniej 4 znaki i nie więcej niż 100');
    } else {
        if (haslo1.value === haslo2.value) {
            haslo = 1;
        } else {
            alert('potwierdzenie różni się od hasła');
        }
    }

    if (flaga == 0 && haslo == 1) {

        const uzytkownik = {
            nazwa_uzytkownika: nick.value,
            haslo: haslo1.value,
            poziom: 0
        }
        system.tablica.push(uzytkownik);
        localStorage.setItem("nickName", JSON.stringify(system));
        document.querySelector(".rejestracja").classList.remove("rejestracja---js");


        nick.value = "";
        haslo1.value = "";
        haslo2.value = "";
    }

});

const logowanie__js = document.querySelector('.logowanie--js')
logowanie__js.addEventListener('click', () => {
    if (stan_logowania == 0) {
        przerwij();
        logowanie.classList.add("logowanie---js")
    } else if (stan_logowania == 1) {
        document.querySelector(".first-header").textContent = "project 1";
        id_uzytkownika = "";
        stan_logowania = 0;
        logowanie__js.textContent = "zaloguj się";
    }
})


const logowanie = document.querySelector('.logowanie');
const nick_log = document.querySelector('.nicko-log');
const haslo_log = document.querySelector('.haslo-log');
const zaloguj = document.querySelector('.zaloguj');
zaloguj.addEventListener('click', () => {
    for (let i = 0; i < system.tablica.length; i++) {
        if (nick_log.value === system.tablica[i].nazwa_uzytkownika) {
            id_uzytkownika = i;

        }
    }
    if (nick_log.value === "") alert('musisz podać nick');
    if (haslo_log.value === "") alert('musisz podać hasło');
    if (nick_log.value != "" && haslo_log.value != "") {
        if (id_uzytkownika !== "") {
            if (nick_log.value === system.tablica[id_uzytkownika].nazwa_uzytkownika &&
                haslo_log.value === system.tablica[id_uzytkownika].haslo) {
                document.querySelector(".first-header").textContent = nick_log.value;
                logowanie__js.textContent = "wyloguj";
                stan_logowania = 1;
                nick_log.value = "";
                haslo_log.value = "";
                przerwij();
            } else {
                alert("nick lub hasło jest nieprawidłowe");
                nick_log.value = "";
                haslo_log.value = "";
            }
        } else {
            alert("nick lub hasło jest nieprawidłowe");
            nick_log.value = "";
            haslo_log.value = "";
        }
    }
})