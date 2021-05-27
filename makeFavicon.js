import * as mice from './src/main/js/mice.js'
import fs from "fs"

const seed = 58978.062771038545

const svg = mice.miceSvg(seed, {n: 5, strokeWidth: "0.25"})

fs.writeFile('./build/favicon.svg', svg, err => {
  if (err) {
    console.error(err)
    return
  }
})
