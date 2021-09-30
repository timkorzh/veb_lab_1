let r = document.getElementById("r").value;
let x = document.getElementById("x").value;
let y = document.getElementById("y").value;
let table = document.getElementById("tbody");
console.log(x.value + " " + y + " " + r);
// let cookies_data = (Cookies.get("data") !== undefined && Cookies.get("data") !== "") ? Cookies.get("data") : "";

function fieldsEmpty() {
    var isEmpty = false;

    if (!r.value) {
        r.style.borderBottom = "1px solid red";
        $('#messageR').text("Это поле обязательно для заполнения");
        isEmpty = true;
    } else $('#messageR').text("");

    if (!x.value) {
        x.style.borderBottom = "1px solid red";
        $('#messageX').text("Это поле обязательно для заполнения");
        isEmpty = true;
    } else $('#messageX').text("");

    if (!y.value) {
        y.style.borderBottom = "1px solid red";
        $('#messageY').text("Это поле обязательно для заполнения");
        isEmpty = true;
    } else $('#messageY').text("");
    return isEmpty;
}

function isValuesValid() {
    let isOK = true
    if (r.value >= 4 || r.value <= 1 || isNaN(r.value)){
        r.style.borderBottom = "1px solid red";
        alert("Некорректный ввод");
        isOK = false;
    } else {
        r.style.borderBottom = "1px solid #ACACAC";
    }

    if (!isNaN(parseFloat(x.value)) && ![-5, -4, -3, -2, -1, 0, 1, 2, 3].includes(parseFloat(x.value))) {
        x.style.borderBottom = "1px solid red";
        alert("Некорректный ввод");
        isOK = false;
    }
    if (y.value >= 3 || y.value <= -3 || isNaN(y.value)){
        y.style.borderBottom = "1px solid red";
        alert("Некорректный ввод");
        isOK = false;
    } else {
        y.style.borderBottom = "1px solid #ACACAC";
    }
    return isOK;
}

$(document).ready(function () {
    $('[data-reset]').on('click', function (e) {
        e.preventDefault();
        console.log("here")
        $.ajax({
            url: "reset.php",
            async: true,
            type: "POST",
            data: {},
            cache: false,
            success: function(response) {
                table.innerHTML = `
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Выполнение</th>
                    <th>Время</th>
                </tr>
                `
            },
            error: function(xhr) {

            }
        });
    })
})

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        alert ("tftyftyvgvghv");
        e.preventDefault();
        let isOkFields = !fieldsEmpty();
        if (!isOkFields) return;
        let isOkValues = isValuesValid();
        if (isOkFields && isOkValues) {
            $.ajax({
                url: "save_and_out.php",
                async: true,
                type: "POST",
                data: {
                    "x": x.value,
                    "y": y.value,
                    "r": r.value
                },
                cache: false,
                success: function(response) {
                    let table = document.getElementById("tbody");
                    table.insertAdjacentHTML('beforeend', response);
                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                }
            });
        }
    })
});
function sendReset() {

    for(let i=1; i<=5; i++) {

        document.getElementById('radio_r' + i).checked = false;

    }

    for(let i=1; i<=9; i++) {
        document.getElementById('cbx_x' + i).checked = false;
    }
    document.getElementById('tbx_y').value = '';
    document.getElementById("x_inc").innerHTML = "";
    document.getElementById("y_inc").innerHTML = "";
    document.getElementById("r_inc").innerHTML = "";
    document.getElementById("table-place").innerHTML = "";
    window.sessionStorage.setItem("stored", "");
}
window.onload = function loadSessionStorage() {
    document.getElementById("table-place").innerHTML = window.sessionStorage.getItem("stored");
}

$(document).ready(function () {
    $.ajax({
        url: "save_and_out.php",
        async: true,
        type: "POST",
        success: function (response){
            let table = document.getElementById("tbody");
            table.insertAdjacentHTML('beforeend', response);
        }
    })
})