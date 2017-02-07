import $ from 'balalaika'
import Promise from 'bluebird'

export default function () {
  if (!document.querySelector('.Home')) {
    return;
  }
  console.log("hometemplate yo")

  const swappers = $('.Home__swapper')
  const doSwap = () => {
    const delayStep = 50;
    Promise.all(swappers.map((swapper, ix) => Promise
      .resolve(swapper)
      .delay(delayStep * ix)
      .then(() => {
        swapper.classList.remove('is-unredacting')
        swapper.classList.add('is-redacted')
      })
      .delay(500)
      .then(() => {
        const other = swapper.getAttribute('data-swap')
        const current = swapper.textContent
        swapper.setAttribute('data-swap', current)
        swapper.textContent = other
        swapper.classList.add('is-unredacting')
      })
      .delay(200)
      .then(() => {
        swapper.classList.remove('is-redacted')
      })
    )).delay(4000).then(doSwap)
  }

  Promise.delay(4000).then(doSwap)

}
