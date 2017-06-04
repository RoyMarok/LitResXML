'use strict';

function httpGet(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}
function findAndCount(str){
    let newStr = ''+str;
    newStr.replace(/<a ([^>]+)*>([^<]*)<\/a>/ig, (matchStr, attr, anchorText, offset, sourceStr)=> {
        State.symbols+=anchorText.replace(/\s/ig, '').length;
        State.anchors++;
        if (!verifyLink(attr.match(/href="#([^"]+)/i)[1], sourceStr)) State.badLinks++;
    });
    renderSateData(State);
}
function verifyLink(href, str) {
    let reg = new RegExp('id="'+href+'"','ig');
    return !!str.search(reg)
}

function getFile() {
    State.filePath = getFilePath();
    httpGet(getFilePath()).then(response => {
        findAndCount(response);
    });
}
function getFilePath() {
    return document.location.search.slice(1).match(/XML=([^&]*)/i,)[1];
}
function renderSateData(State) {
    console.log(State);
    document.getElementById('path').innerHTML = State.filePath;
    document.getElementById('anchors').innerHTML = State.anchors;
    document.getElementById('badAnchors').innerHTML = State.badLinks;
    document.getElementById('anchorsTextLength').innerHTML = State.symbols;
}
let State = {
    anchors:0,
    badLinks: 0,
    symbols: 0,
    filePath: ''
};
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
      getFile();
  }
}
