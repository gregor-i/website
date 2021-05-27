import {multiply, subtract, add, identity, transpose, matrix} from "mathjs"

export function miceSvg(seed, {n = 50, iterations = 300, deltaTime = 0.1, strokeWidth = "0.005"} = {}){
  const p0 = initialPositions(n)
  const attraction = randomPermutation(n, setupRandom(seed))
  const repulsion = multiply(attraction, attraction, attraction, 0.1)
  const M = subtract(attraction, add(identity(n), repulsion))
  const S = matrixExponential(multiply(M, deltaTime), 50)

  function * iterate(n, p0, S) {
    let p = p0
    for (let i = 0; i < n; i++) {
      p = multiply(p, S)
      yield p;
    }
  }

  const positions = [...iterate(iterations, p0, S)]

  return svg(p0, positions, n, strokeWidth)
}

function circle(strokeWidth){
 return `
<linearGradient id="hslGradientUpper">
  <stop offset="0%"   stop-color="hsl(180, 100%, 50%)" />
  <stop offset="33%"  stop-color="hsl(120, 100%, 50%)" />
  <stop offset="67%"  stop-color="hsl( 60, 100%, 50%)" />
  <stop offset="100%" stop-color="hsl(  0, 100%, 50%)" />
</linearGradient>
<linearGradient id="hslGradientLower">
  <stop offset="0%"   stop-color="hsl(180, 100%, 50%)" />
  <stop offset="33%"  stop-color="hsl(240, 100%, 50%)" />
  <stop offset="67%"  stop-color="hsl(300, 100%, 50%)" />
  <stop offset="100%" stop-color="hsl(360, 100%, 50%)" />
</linearGradient>
<path d="M -1 0 a 1 1 0 1 0 2 0" stroke="url(#hslGradientLower)" stroke-width="${strokeWidth}" fill="none" />
<path d="M 1 0 a 1 1 0 1 0 -2 0" stroke="url(#hslGradientUpper)" stroke-width="${strokeWidth}" fill="none" />
`;
}

function svg(p0, positions, n, strokeWidth){
  let size = 1 + strokeWidth/2
  let svg = `<svg viewBox="${-size} ${-size} ${2*size} ${2*size}" xmlns="http://www.w3.org/2000/svg">\n`;
  for(let i = 0; i<n; i++){
      let path = `<path d="M ${p0._data[0][i]} ${p0._data[1][i]} `
      positions.forEach(position => {
          path += `L ${position._data[0][i]} ${position._data[1][i]} `
      })
      path += `" class="mouse" style="mix-blend-mode: hue;" fill="none" stroke="hsl(${i / n * 360 - 90}, 100%, 50%)" stroke-width="${strokeWidth}"/>`;
      svg += path + "\n";
  }
  svg += circle(strokeWidth);
  svg += "</svg>";
  return svg;
}

function setupRandom(i){
  // https://stackoverflow.com/a/19301306/10972520
  var mask = 0xffffffff;
  var m_w = (123456789 + i) & mask;
  var m_z = (987654321 - i) & mask;

  return function(){
      m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
      var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
      result /= 4294967296;
      return result;
  }
}

function initialPositions(n){
  const p0 = []
  for(let i = 0; i<n; i++){
      const angle = Math.PI * 2.0 / n * i
      p0[i] = [Math.sin(angle), Math.cos(angle)]
  }
  return transpose(matrix(p0))
}

function randomPermutation(n, random){
  const T = []
  for(let i = 0; i<n; i++){
      T[i] = new Array(n).fill(0)
      T[i][i] = 1
  }

  for(let i = 0; i < n*n; i++){
    const from = Math.floor(random() * n);
    const to = Math.floor(random() * n);
    const swap = T[to]
    T[to] = T[from]
    T[from] = swap
  }
  return matrix(T)
}

function matrixExponential(M, steps){
  const n = M.size()[0]
  let sum = identity(n)
  let power = identity(n)
  for(let i = 1; i < steps; i++){
    power = multiply(power, M, 1.0 / i)
    sum = add(sum, power)
  }
  return sum
}
