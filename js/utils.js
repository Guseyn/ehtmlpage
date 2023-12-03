window.copyUnilangExample = (pre) => {
  const text = pre.innerText
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.top = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

function showTooltip(event) {
  const tooltip = document.getElementById('tooltip')
  tooltip.style.left = (event.pageX + 10) + 'px'
  tooltip.style.top = (event.pageY + 10) + 'px'
  tooltip.style.opacity = 1
  setTimeout(function () {
    tooltip.style.opacity = 0
  }, 2000)
}

document.addEventListener('click', (event) => {
  let clickedElement = event.target
  while (clickedElement !== null) {
    if (clickedElement.tagName && clickedElement.tagName.toLowerCase() === 'code') {
      const selectedText = window.getSelection().toString()
      if (selectedText.length === 0) {
        window.copyUnilangExample(clickedElement)
        showTooltip(event)
      }
      break
    }
    clickedElement = clickedElement.parentNode;
  }
})
