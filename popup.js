var btnInicia = document.getElementById("iniciaColeta");

btnInicia.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let quantidade = document.getElementById("quantidade").value;
  let status = document.getElementById("status");
  status.innerText = "Ativo 🟢";

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: iniciaColeta,
    args: [quantidade],
  });
});

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