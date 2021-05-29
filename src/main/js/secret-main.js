import * as aes from 'crypto-js/aes.js'
import * as md5 from 'crypto-js/md5.js'
import * as Utf8 from 'crypto-js/enc-utf8.js'

window.decrypt = function(file, key){
  const encrypted = fetch(file + ".aes")
    .then(response => response.text())
    .then(responseText => {
      let decrypted = aes.decrypt(responseText, key).toString(Utf8)
      let blob = new Blob([decrypted], {type: "image/svg+xml"})
      window.location = URL.createObjectURL(blob)
    })
}
