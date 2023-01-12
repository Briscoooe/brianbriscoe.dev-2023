const fs = require('fs');
const path = require("path");

class HTMLElement {}
class CustomElementRegistry {
  elements = {};
  constructor(props) {}

  define(name, constructor, options) {
    this.elements[name] = constructor;
  }
}
global.HTMLElement = HTMLElement;
global.customElements = new CustomElementRegistry();

const SRC_DIR = path.join(__dirname, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const OUT_DIR = path.join(__dirname, 'build');

function importWebComponents() {
  const componentFileNameList = fs.readdirSync(COMPONENTS_DIR);
  for (const componentFileName of componentFileNameList) {
    require(path.join(COMPONENTS_DIR, componentFileName));
  }
}

function mkDirIfNotExists(absoluteDirPath) {
  if (!fs.existsSync(absoluteDirPath)) {
    fs.mkdirSync(absoluteDirPath);
  }
}

function init() {
  mkDirIfNotExists(OUT_DIR);
}

function buildFile(absoluteDirectoryName, fileName) {
  console.log('Building', path.join(absoluteDirectoryName, fileName));
  let fileString = fs.readFileSync(path.join(absoluteDirectoryName, fileName), 'utf-8');
  for (const elementName of Object.keys(customElements.elements)) {
    const elementNameWithTags = `<${elementName}></${elementName}>`
    const elementComponent = new customElements.elements[elementName]();
    elementComponent.connectedCallback();
    fileString = fileString.replace(elementNameWithTags, elementComponent.innerHTML);
  }
  const relativeDirectoryName = absoluteDirectoryName.replace(SRC_DIR, '');
  const outputPath = path.join(OUT_DIR, relativeDirectoryName);
  mkDirIfNotExists(outputPath);
  fs.writeFileSync(path.join(outputPath, fileName), fileString)
}

function iterateDirectoryFiles(absoluteDirectoryName) {
  for (const sourceFileOrFolder of fs.readdirSync(absoluteDirectoryName)) {
    const lstat = fs.lstatSync(path.join(absoluteDirectoryName, sourceFileOrFolder));
    if (lstat.isFile()) {
      if (sourceFileOrFolder.endsWith('.css')) {
        fs.cpSync(path.join(absoluteDirectoryName, sourceFileOrFolder), path.join(OUT_DIR, sourceFileOrFolder));
      } else if (sourceFileOrFolder.endsWith('.html')) {
        buildFile(absoluteDirectoryName, sourceFileOrFolder);
      }
    } else if (lstat.isDirectory()) {
      iterateDirectoryFiles(path.join(absoluteDirectoryName, sourceFileOrFolder))
    }
  }
}
function build() {
  init()
  importWebComponents()
  iterateDirectoryFiles(SRC_DIR);
}

build()
