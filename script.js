let display = document.getElementById("display");

function addNumber(number) {
    if (display.value === "0" || display.value === "Error") {
        display.value = number === "." ? "0." : number;
    } else {
        if (number === "." &&
            display.value.split(/[+\-*/]/).pop().includes(".")) {
            return;
        }

        display.value += number;
    }
}

function addOperator(operator) {
    let lastChar = display.value.slice(-1);

    if (display.value === "Error") return;

    if ("+-*/".includes(lastChar)) {
        display.value = display.value.slice(0, -1);
    }

    display.value += operator;
}

function clearDisplay() {
    display.value = "0";
}

function deleteNumber() {
    display.value = display.value.slice(0, -1);

    if (display.value === "") {
        display.value = "0";
    }
}

function calculate() {
    try {
        let expression = display.value;

        if (!/^[0-9+\-*/. ]+$/.test(expression)) {
            throw new Error("Input tidak valid");
        }

        if (/[+\-*/.]$/.test(expression)) {
            throw new Error("Perhitungan belum lengkap");
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Tidak bisa dihitung");
        }

        display.value = Number(result.toFixed(10)).toString();

    } catch (error) {
        display.value = "Error";
    }
}