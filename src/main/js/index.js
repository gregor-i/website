import {miceSvg} from './mice.js'

window.render = function(){
  const svg = document.querySelector("svg")
  const seed = Math.random() * 100000
  console.log(`Seed: ${seed}`)
  svg.outerHTML = miceSvg(seed)
}

window.addEventListener('DOMContentLoaded', (event) => {
    render()
});
