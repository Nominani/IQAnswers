// ==UserScript==
// @name         EnySolve
// @namespace    http://tampermonkey.net/
// @version      2.28
// @description  ENY the best
// @author       Nominani
// @match        *iq.karelia.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// ==/UserScript==

(function() {
    if (!window.location.href.includes("next")) { return }

    var i;

    function vec(q) {
        return (4 * parseInt(q.split(" ")[3], 16)).toString(16) + 'h'
    }

    function tochka(q) {
        var s = q.split(" ")
        var baza = parseInt(s[0] + s[1] + s[2] + s[3], 2)
        var smesh = parseInt(s[4] + s[5] + s[6] + s[7], 2)
        return (baza*16 + smesh).toString(16).toUpperCase()
    }

    function rezhim(q) {
        var s = q.split(" ")
        var first = parseInt(s[12])
        var second = parseInt(s[18])
        var third = parseInt(s[25])

        var fs = Math.ceil(first*third*(10**6)*(10**-9)).toString()
        var ns = Math.ceil(second*third*(10**6)*(10**-9)).toString()
        return fs + "-" + ns + "-" + ns + "-" + ns
    }

    function maks(q) {
        return (parseInt(q.split(" ")[9]) * 8).toString()
    }

    function checkDT(q, gl) { // В GDT хранятся дескрипторы
        var s = q.split(" ")
        var itog = []
        for (i = 0; i < 6; i++) {
            if (s[6+i*3][1] == gl) itog.push(s[6+i*3][6] + s[6+i*3][7])
        }
        return itog
    }

    function posled(q) {
        if (q.includes("1) продолжение выполнения прерванной программы 2) определение типа выбранного запроса 3) выполнение программы - обработчика прерывания 4) определение наиболее приоритетного незамаскированного запроса на прерывание (если одновременно поступило несколько запросов) 5) восстановление сохраненных значений счетчика команд и регистра флагов прерванной программы 6) сохранение текущего состояния счетчика команд и регистра флагов 7) определение")) return "4,2,6,7,3,5,1"
        if (q.includes("находим базовый адрес таблицы страниц, из линейного адреса находим номер страницы 2. в дескрипторе находим базовый адрес сегмента 3. из CR3 находим базовый адрес каталога страниц, из линейного адреса - индекс элемента КТС 4. находим базовый адрес страницы, из линейного адреса находим смещение в странице 5. находим физический адрес 6. из селектора в сегментном регистре определяем таблицу сегментов и находим индекс дескриптора в соответствующей таблице дескрипторов сегментов 7. зная")) return "6,2,7,3,1,4,5"
        if (q.includes("Принять сигнал от МП (HLDA), подтверждающий факт перевода микропроцессором своих шин в третье состояние. 2. Сформировать на шине адреса компьютера адрес ячейки памяти, предназначенной для обмена. 3. Выработать сигналы, обеспечивающие управление обменом. 4. Сформировать запрос к МП на захват шин (сигнал HRQ). 5. Проверить условие окончания сеанса прямого доступа (обнуление счетчика данных или снятие сигнала запроса на ПДП). Если условие окончания не выполнено, то изменить адрес в регистре текущего адреса на длину переданных данных и повторить предыдущие шаги. 6. Принять запрос на ПДП (сигнал DRQ) от УВВ. 7. Уменьшить значение в счетчике данных на длину переданных данных. 8. С")) return "6,4,1,8,2,3,7,5"
    }

    function ocher(q) {
        var s = q.split("\n\n")
        var cs = 0
        var ip = 0
        for (i=0; i<s.length; i++) {
            if (s[i].includes("CS")) cs = parseInt(s[i].substring(0, 19).replaceAll(" ", ""), 2)
            else if (s[i].includes("IP")) ip = parseInt(s[i].substring(0, 19).replaceAll(" ", ""), 2)
        }
        return (cs*16 + ip).toString(16).toUpperCase()
    }

    function ocherSSSP(q) { //
        var s = q.split("\n\n")
        var cs = 0
        var ip = 0
        for (i=0; i<s.length; i++) {
            if (s[i].includes("SS")) cs = parseInt(s[i].substring(0, 19).replaceAll(" ", ""), 2)
            else if (s[i].includes("SP")) ip = parseInt(s[i].substring(0, 19).replaceAll(" ", ""), 2)
        }
        return (cs*16 + ip).toString(16).toUpperCase()
    }

    function cash(q) {
        var s = q.split(" ")
        var addr = parseInt(s[s.length - 1], 16)
        var strok = parseInt(s[4], 10)
        var bait = parseInt(s[7], 10)

        addr = addr.toString(2)
        strok = strok.toString(2).length - 1
        bait = bait.toString(2).length - 1

        return parseInt(addr.substring(0, addr.length-bait-strok), 2).toString() + " (" + addr.substring(0, addr.length-bait-strok).length.toString() + " бит)"
    }

    function chasto(q) {
        q = q.replace("PC ", "PC")
        q = q.replace("PC", "PC ")
        var s = q.split(" ")
        var f = -999
        if (q.includes("DDR4")) f = 16
        else if (q.includes("DDR3")) f = 8
        else if (q.includes("DDR2")) f = 4
        else if (q.includes("DDR")) f = 2
        else if (q.includes("ambus")) f = 0.25

        var d = parseInt(s[s.length-1])

        return (d/(f*8)).toString() + " МГц"
    }

    function marka(q) {
    var s = q.split(" ")
    var f = -999
    if (q.includes("DDR4")) f = 16
    else if (q.includes("DDR3")) f = 8
    else if (q.includes("DDR2")) f = 4
    else if (q.includes("DDR")) f = 2
    else if (q.includes("ambus")) f = 0.25

    var d = parseInt(s[s.length-2])

    return "PC " + (d*f*8).toString()
}

function cashvhod(q) {
    q = q.replaceAll("-", " ").replaceAll("А", "A").replaceAll("В", "B").replaceAll("С", "C").replaceAll("Е", "E")
    var s = q.split(" ")
    var addr = parseInt(s[s.length - 1], 16)
    var strok = parseInt(s[6], 10)
    var bait = parseInt(s[9], 10)

    addr = addr.toString(2)
    strok = strok.toString(2).length - 1
    bait = bait.toString(2).length - 1

    return parseInt(addr.substring(0, addr.length-bait-strok), 2).toString(16) + " (" + addr.substring(0, addr.length-bait-strok).length.toString() + " бит)"
}





    var qq = document.getElementsByTagName("table")[4].innerText
    var el = document.createElement("a")
    el.style.opacity = "0.1"
    document.getElementsByTagName("font")[1].append(el)
    var ans = ""

    if (qq.includes("В LDT хранятся дескрипторы")) ans = checkDT(qq, "1")
    else if (qq.includes("В GDT хранятся дескрипторы")) ans = checkDT(qq, "0")
    else if (qq.includes("Вектор прерывания INT") && qq.includes("в реальном режиме имеет")) ans = vec(qq)
    else if (qq.includes("вектор некоторого прерывания в реальном режиме") && qq.includes("точки входа")) ans = tochka(qq)
    else if (qq.includes("Рассчитайте возможный наилучший режим чтения для микросхем")) ans = rezhim(qq)
    else if (qq.includes("вершины стека") && qq.includes("Считая, что проц")) ans = ocherSSSP(qq)
    else if (qq.includes("очередной к") && qq.includes("Считая, что проц")) ans = ocher(qq)
    else if (qq.includes("Для кэша") && qq.includes("разрядность тега")) ans = cash(qq)
    else if (qq.includes("Укажите порядок нахождения")) ans = posled(qq)
    else if (qq.includes("Последовательность действий контроллера ПДП")) ans = posled(qq)
    else if (qq.includes("Рассчитайте частоту тактового")) ans = chasto(qq)
    else if (qq.includes("Рассчитайте максимальную пропускную способность блока")) ans = maks(qq)
    else if (qq.includes("Определите марку блока памяти")) ans = marka(qq)
    else if (qq.includes("входового ассоциативного")) ans = cashvhod(qq)
    
    var tgl = false

    document.addEventListener("keydown", function(e) {
        if (e.key == "z" || e.key == "я" || e.key == "Z" || e.key == "Я") {
            if (tgl) { el.innerText = ""; }
            else { el.innerText = ans; }
            tgl = !tgl
        }
    })
    
})();