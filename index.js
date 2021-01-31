"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
var kinds = {
    "FU": "歩",
    "KY": "香",
    "KE": "桂",
    "GI": "銀",
    "KI": "金",
    "KA": "角",
    "HI": "飛",
    "OU": "玉",
    "TO": "と",
    "NY": "成香",
    "NK": "成桂",
    "NG": "成銀",
    "UM": "馬",
    "RY": "竜",
};
var abbrev = function (kind) {
    kinds[kind.charAt(0)] = kinds[kind];
};
["FU", "GI", "HI", "OU", "TO", "UM", "RY"].forEach(abbrev);
/**
 * Convert all the abbreviations to proper kifu format within free text
 * Refer https://www.shogi.or.jp/faq/kihuhyouki.html
 * @param input
 */
function convert(input) {
    var isBlack = true;
    return input.replace(/(\\?)(([1-9１-９])([1-9１-９])(x?)|(x))(FU?|KY|KE|GI?|KI|KA|HI?|OU?|TO?|NY|NK|NG|UM?|RY?)(([lrc]?)([ayh]?)([n+-]?)(d?)) ?/gi, function (match, flip, _, x, y, same1, same2, kind, _2, lr, ayh, promote, da) {
        if (!flip)
            isBlack = !isBlack;
        return (isBlack ? "☖" : "☗") +
            (x ? ("１２３４５６７８９"[+zenkaku2hankaku(x) - 1] + "一二三四五六七八九"[+zenkaku2hankaku(y) - 1]) : "") +
            (same1 || same2 ? "同" : "") +
            kinds[kind.toUpperCase()] +
            formatLrmhc(lr) +
            formatAyh(ayh) +
            formatPromote(promote) +
            (da ? "打" : "");
    });
}
exports.convert = convert;
function formatLrmhc(str) {
    switch (str.toLowerCase()) {
        case "l":
            return "左";
        case "r":
            return "右";
        case "c":
            return "直";
        default:
            return "";
    }
}
function formatAyh(str) {
    switch (str.toLowerCase()) {
        case "a":
            return "上";
        case "y":
            return "寄";
        case "h":
            return "引";
        default:
            return "";
    }
}
function formatPromote(str) {
    switch (str.toLowerCase()) {
        case "n":
        case "+":
            return "成";
        case "-":
            return "不成";
        default:
            return "";
    }
}
function zenkaku2hankaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}
function main() {
    var output = document.getElementById("output");
    document.getElementById("input").addEventListener("input", function (e) {
        output.textContent = convert(e.target.value);
    });
    output.textContent = convert(document.getElementById("input").value);
}
