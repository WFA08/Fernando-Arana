let pantalla = document.getElementById("pantalla");

function agregar(valor) {
    pantalla.value += valor;
}

function calcular() {
    try {
        pantalla.value = eval(pantalla.value);
    } catch (error) {
        pantalla.value = "Error";
    }
}

function limpiar() {
    pantalla.value = "";
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

document.addEventListener("keydown", function(event) {
    const teclasValidas = "0123456789+-*/().";
    if (teclasValidas.includes(event.key)) {
        agregar(event.key);
    } else if (event.key === "Enter") {
        calcular();
    } else if (event.key === "Backspace") {
        borrar();
    } else if (event.key === "Escape") {
        limpiar();
    }
});