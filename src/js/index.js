import '../scss/main.scss';


// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

console.log('HELLO 🚀')



const system_logowania = {
    imie: "daniel",
    wiek: 40,
    tablica: [], //zawiera nick uczestnika
}
if (!localStorage.getItem("nickName")) {
    localStorage.setItem("nickName", JSON.stringify(system_logowania));

}
const system = JSON.parse(localStorage.getItem("nickName"))



const screen = document.querySelector('.screen--js')
const rejestracja = document.querySelector('.rejestracja--js');
rejestracja.addEventListener('click', () => {
    document.querySelector(".rejestracja").classList.add("rejestracja---js");
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
console.log(system);