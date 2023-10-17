chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (
    request.action === 'query' &&
    document.URL == 'https://sistema.sunagro.gob.ve/guias_transito.php'
  ) {
    let elementos = document.querySelectorAll('[id^="ajax_guia_"]')
    let numeroDeGuias = Array.from(elementos).map(elemento =>
      elemento.id.slice(11)
    )
    let result = Array.from(new Set(numeroDeGuias))

    sendResponse({ result: result })
  }

  if (
    request.action === 'clear' &&
    document.URL == 'https://sistema.sunagro.gob.ve/recepcion_rubros_add.php'
  ) {
    const guiasArr = JSON.parse(request.guias)

    const firstNumOfTheArray = guiasArr.shift()
    const inputGuide = document.getElementById('nro_guia')
    const insertButton = document.getElementById('btn_insertar')

    inputGuide.value = firstNumOfTheArray

    insertButton.click()

    sendResponse({ guias: guiasArr })
  }

  if (request.action === 'clickLink') {
    const receptionBtn = document.querySelector(
      'a[href="recepcion_rubros_add.php"'
    )
    receptionBtn.click()

    sendResponse({ status: 'ok' })
  }
})
