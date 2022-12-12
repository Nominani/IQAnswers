// ==UserScript==
// @name         ArchNegr
// @namespace    http://tampermonkey.net/
// @version      beta.5
// @description  The third generation of super cool script
// @author       AGB Team
// @match        *iq.karelia.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(async() => {
    console.log("Попили, блин, пивка")
    //------------------------------------------------------------------
    var qq = {"SampleQuestion": ["SampleAnswer", "4.99"]}
    var tqq = {}
    var last = {}



    //------------------------------------------------------------------
    unsafeWindow.getQ = function() {return qq}
    unsafeWindow.getTQ = function() {return tqq}
    unsafeWindow.getLast = function() {return last}
    unsafeWindow.setQ = function(newq) {qq = newq;}
    unsafeWindow.setTQ = function(newq) {tqq = newq; GM_setValue("tqq", tqq)}
    unsafeWindow.setLast = function(newl) {last = newl; GM_setValue("last", last)}



    //------------------------------------------------------------------

    function dristConvert(a) {
        var b = {}
        var ii = 1

        Object.keys(a).forEach((k) => {b[ii.toString()] = {"q": k, "a":a[k][0], "res":a[k][1]}; ii += 1})

        return b
    }

    function dristRevert(a) {
        var b = {}
        var ii = 1

        Object.keys(a).forEach((k) => {b[a[k].q] = [a[k].a, a[k].res]; ii += 1} )

        return b
    }

    function sendAnswers() {
        var _0xd0b6=["\x50\x4F\x53\x54","\x68\x74\x74\x70\x3A\x2F\x2F\x31\x38\x35\x2E\x32\x33\x37\x2E\x32\x32\x35\x2E\x31\x33\x32\x2F\x73\x65\x6E\x64","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E","\x78\x6D\x6C\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74"];GM[_0xd0b6[4]]({method:_0xd0b6[0],url:_0xd0b6[1],data:JSON[_0xd0b6[2]](dristConvert(last)),headers:{"\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65":_0xd0b6[3]},onload:function(_0x28c4x1){}})
    }

    function getAnswers(qs) {
        var _0xe55c=["\x50\x4F\x53\x54","\x68\x74\x74\x70\x3A\x2F\x2F\x31\x38\x35\x2E\x32\x33\x37\x2E\x32\x32\x35\x2E\x31\x33\x32\x2F\x67\x65\x74","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E","\x27","\x22","\x72\x65\x70\x6C\x61\x63\x65\x41\x6C\x6C","\x5C\x22","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x70\x61\x72\x73\x65","\x78\x6D\x6C\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74"];GM[_0xe55c[10]]({method:_0xe55c[0],url:_0xe55c[1],data:JSON[_0xe55c[2]]([qs]),headers:{"\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65":_0xe55c[3]},onload:function(_0x3badx1){qq= dristRevert({"\x31":JSON[_0xe55c[9]](_0x3badx1[_0xe55c[8]][_0xe55c[6]](_0xe55c[5],_0xe55c[7])[_0xe55c[6]](_0xe55c[4],_0xe55c[5]))}); try {document.title = qq[Object.keys(qq)[0]][1].toString() + " " + document.title} catch (e) {}}})
    }



    //------------------------------------------------------------------
    tqq = await GM_getValue("tqq") //------------------------------------------------------------- 
    if (tqq === undefined) {unsafeWindow.setTQ({})}

    if (window.location.href.includes("finish")) {
        last = tqq
        tqq = {}
        var rating = document.getElementsByTagName("b")[4].innerText
        GM_setValue("last", last)

        Object.keys(last).forEach((e) => {last[e][1] = parseFloat(rating)})
        sendAnswers()

        return
    }

    if (!window.location.href.includes("next")) {tqq = {}; return }



    //------------------------------------------------------------------

    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    function antiMos(encstr) {
        encstr += "\n"
        var regx = /(?<=\n)[^\n]{2,}(?=\n)/g;
        var lines = encstr.match(regx);
        var endq = ""

        if (encstr.replaceAll("\n", "").replaceAll(" ", "").replaceAll("	", "").length < 2) {return encstr.replaceAll("\n", "").replaceAll(" ", "").replaceAll("	", "")}

        for (var y = 1; y < lines.length; y = y+2) {
            lines[y] = lines[y] + " "
        }

        for (var j = 0; j < lines.length; j = j+2) {
            for (var i = 0; i < lines[j].length; i++) {
                if (lines[j][i] == " ") {
                    if (lines[j+1][i] != " ") {
                        lines[j] = lines[j].replaceAt(i, lines[j+1][i])
                    }
                }
            }
            endq += " " + lines[j]
        }
        return endq;
    }

    var question = document.evaluate("//*[contains(@style, 'padding-left:30px; padding-right:30px')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText

    if (question.includes("\n\n") && !question.includes("\n\n1111") && !question.includes("1\n\tS") && !question.includes("0\n\tS") && !question.includes(":\n\n0000")) { question = antiMos(question) }

    getAnswers(question) //-------------------------------------------------------------------------------

    var anrad = document.getElementsByName("a_form_id[]");
    var nans = {}

    for (var i=0; i<anrad.length; i++) {
        if (anrad[i].parentElement.parentNode.parentElement.innerText.includes("\n\n")) {
            nans[antiMos(anrad[i].parentElement.parentNode.parentElement.innerText)] = anrad[i];
        }
        else {
            nans[anrad[i].parentElement.parentNode.parentElement.innerText] = anrad[i];
        }
    }

    async function saveAnswer() {
        var a = []
        var nons = document.getElementsByName("a_form_id[]");

        for (var i=0; i<nons.length; i++) {
            if (nons[i].checked) {
                if (nons[i].parentElement.parentNode.parentElement.innerText.includes("\n\n")) {
                    a.push(antiMos(nons[i].parentElement.parentNode.parentElement.innerText));
                }
                else {
                    a.push(nons[i].parentElement.parentNode.parentElement.innerText);
                }
            }
        }

        tqq[question] = [a.join("|"), "0"]
        await GM_setValue("tqq", tqq)
    }

    document.evaluate("//*[contains(@value, 'Отослать ответ')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.addEventListener("click", async() => {
        await saveAnswer();
    });
    document.addEventListener("keydown", function(e) {
        if (e.key == "ё" || e.key == "Ё" || e.key == "`" || e.key == "~") {
            if (qq[question] != undefined) {
                if (qq[question][0].includes("|")) {
                    var ans = qq[question][0]
                    for (let x of ans.split("|"))
                    {
                        nans[x].click()
                    }
                }
                else {
                    nans[qq[question][0]].click()
                }
                
            }}
    })

})();