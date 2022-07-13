const fs = require("fs")
const path = require("path")

const sourceFilePath = path.join(__dirname, "source-files")
const outputDirectoryPath = path.join(__dirname, "results")
const outputFileName = "result.md"

// See if there are files in the source-files directory
fs.readdir(sourceFilePath, (err, files) => {
  if (err) console.log(`There was an error: ${err}`)

  if (!files.length) console.log("There are no files to concatenate")

  // delete existing results directory if one exists
  fs.rmSync(outputDirectoryPath, { recursive: true, force: true })

  // make a new results directory
  fs.mkdirSync(outputDirectoryPath)

  // create an empty results output file in the results directory
  fs.writeFileSync(`${outputDirectoryPath}/${outputFileName}`, "")

  // construct formal file path for each of the the files in the source directory
  files = files.map(file => path.join(sourceFilePath, file))

  // filter out any files that don't meet the supported file types
  files = files.filter(file => {
    if (path.extname(file).toLowerCase() === ".txt" || path.extname(file).toLowerCase() === ".md") {
      return file
    }
  })

  // read each file's contents and append the contents to the output file
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, "utf8")
      fs.appendFileSync(`${outputDirectoryPath}/${outputFileName}`, `\n${content}\r\n`)
    } catch (err) {
      console.log(err)
    }
  })

  console.log(`File Concatenation Successful: See "${outputDirectoryPath}/${outputFileName}"`)
})
