const $ = selector => document.querySelector(`${selector}`)
const getGuides = () => JSON.parse(localStorage.getItem('guias'))
const setGuides = value => localStorage.setItem('guias', JSON.stringify(value))
const stringConcater = arr => arr.reduce((prev, cur) => `${prev} ${cur}`, '')

const re_render = () => {
  $('#counter').innerHTML = getGuides() ? getGuides().length : 0
  $('#guias div').innerHTML = getGuides() ? stringConcater(getGuides()) : ''
}

document.addEventListener('DOMContentLoaded', function () {
  const queryButton = $('#queryButton')
  const receptionButton = $('#receptionButton')
  const clearButton = $('#clearButton')

  re_render()

  if (queryButton) {
    queryButton.onclick = function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'query' },
          function (response) {
            if (response.result.length !== 0) {
              setGuides(response.result)
              re_render()
            }
          }
        )
      })
    }
  }

  if (clearButton) {
    clearButton.onclick = function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'clear', guias: localStorage.getItem('guias') },
          function (response) {
            if (response) {
              setGuides(response.guias)
              re_render()
            }
          }
        )
      })
    }
  }

  if (receptionButton) {
    receptionButton.onclick = function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'clickLink' },
          function (response) {}
        )
      })
    }
  }
})
