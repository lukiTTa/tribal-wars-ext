var btnInicia = document.getElementById("iniciaColeta");

var CP = 0;
var CM = 0;
var CG = 0;
var CE = 0;

btnInicia.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let quantidade = document.getElementById("quantidade").value;
  let status = document.getElementById("status");
  status.innerText = "Ativo 🟢";
  let checkP = document.getElementById("pequenaCol").checked;
  let checkM = document.getElementById("mediaCol").checked;
  let checkG = document.getElementById("grandeCol").checked;
  let checkE = document.getElementById("extremaCol").checked;
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: calculoquantidade,
    args: [quantidade, checkP, checkM, checkG, checkE],
  });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: iniciaColeta,
    args: [quantidade],
  });
});

function calculoquantidade(quantidade, checkP, checkM, checkG, checkE) {
  if (checkP == false) {
    CE = 0;
    CG = 0;
    CM = 0;
    CP = 0;
    return
  }

  if (checkM == false) {
    CE = 0;
    CG = 0;
    CM = 0;
    CP = quantidade;
    return
  }

  if (checkG == false) {
    CE = 0;
    CG = 0;
    if (quantidade >= 130) {
      CM = Math.round((quantidade + 110) / 2);
      CP = CM - 110;
      return
    }
    CM = quantidade;
    CP = 0;
    return
  }

  if (checkE == false) {
    CE = 0;
    if (quantidade >= 290) {
      CG = Math.round((quantidade + 190) / 3);
      CM = CG - 40;
      CP = CG - 150;
      return
    }
    if (quantidade >= 60) {
      CG = Math.round((quantidade + 40) / 2);
      CM = CG - 40;
      CP = 0;
      return
    }
    CG = quantidade
    CM = 0;
    CP = 0;
    return
  }

  if (quantidade >= 460) {
    CE = Math.round((quantidade + 220) / 4);
    CG = CE - 10;
    CM = CG - 50;
    CP = CG - 160;
    return
  }
  if (quantidade >= 140) {
    CE = Math.round((quantidade + 60) / 3);
    CG = CE - 10;
    CM = CG - 50;
    CP = 0;
    return
  }
  if (quantidade >= 30) {
    CE = Math.round((quantidade + 10) / 2);
    CG = CE - 10;
    CM = 0
    CP = 0;
    return
  }
  CE = quantidade;
  CG = 0
  CM = 0;
  CP = 0;
}


function iniciaColeta(quantidade) {
  const input = document.getElementsByTagName("input")[0];
  const buttons = Array.from(document.getElementsByClassName("btn btn-default free_send_button"));

  buttons.forEach(button => {
    let value = String(quantidade / 2);
    setTimeout(() => { aplicaValores(value, button); }, 5000);
    input.value = "";
  });

  function aplicaValores(value, button) {
    input.value = "";
    setTimeout(() => {
      var valueSplit = value.split("");
      var i = 0;
      var time = setInterval(function () {
        if (!valueSplit[i]) {
          clearInterval(time);
          return;
        }
        var el = input;
        el.value += valueSplit[i];
        triggerEvent(el, 'keyup');
        // triggerEvent(el, 'keydown');
        // triggerEvent(el, 'keypress');
        i++;
      }, 100);
      button.click();
      input.value = "";
    }, 10000);
  }


  function triggerEvent(el, type) {
    if ('createEvent' in document) {
      var e = document.createEvent('HTMLEvents');
      e.initEvent(type, false, true);
      el.dispatchEvent(e);
    }
  }
}
