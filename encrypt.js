import fsPromises from 'fs/promises'
import aes from 'crypto-js/aes.js'
import md5 from 'crypto-js/md5.js'
import Utf8 from 'crypto-js/enc-utf8.js'

const [_node, _script, ...args] = process.argv

if(args.length != 3){
  console.log("this script needs 3 arguments:")
  console.log(" 1. the keyphrase")
  console.log(" 2. the file to encrypt")
  console.log(" 3. the output file. Don't include the extension, tt will automatically append '.eas' amd '.md5'.")
  process.exit(-1);
}

const [key, inputFile, outputFile] = args

let content = await fsPromises.readFile(inputFile, "utf8")
console.log("read input: " + inputFile)

const checksum = md5(content)
await fsPromises.writeFile(outputFile + ".md5", checksum.toString())
console.log("written md5: " + outputFile + ".md5")

const encrypted = aes.encrypt(content, key)
await fsPromises.writeFile(outputFile + ".aes", encrypted.toString())
console.log("written encrypted: " + outputFile + ".aes")

// checking:
const decrypted = aes.decrypt(encrypted.toString(), key)
console.log("check" + (decrypted.toString(Utf8) == content ? "OK" : "Error"))
