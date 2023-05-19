const select = (s) => document.querySelector(s)
const selectAll = (s) => document.querySelectorAll(s)

const creatives = selectAll('.creative')
const modalItem = select('#modalItem')
const modalContainer = select('#modalContainer')

creatives.forEach(element => element.addEventListener('click', (e) => {
    const creativeData = e.target.children[0] || e.target
    creativeData.width = creativeData.dataset.size ? creativeData.dataset.size.split('x')[0] : creativeData.clientWidth
    creativeData.height = creativeData.dataset.size ? creativeData.dataset.size.split('x')[1] : creativeData.clientHeight
    const iframe = document.createElement('iframe')
    
    iframe.setAttribute('src', `./static/creatives/${creativeData.dataset.path}/index.html`)
    iframe.setAttribute('width', `${creativeData.width}`)
    iframe.setAttribute('height', `${creativeData.height}`)
    
    modalItem.append(iframe)
    modalContainer.style.display = 'block'

    const span = document.createElement('span')
    span.classList.add('modalClose')
    modalItem.append(span)

    span.addEventListener('click', () => {
        modalContainer.style.display = 'none'
        modalItem.innerHTML = ''
    })

    window.onclick = function (e) {
        if (e.target == modalContainer) {
            modalContainer.style.display = 'none'
            modalItem.innerHTML = ''
        }
    }
}))