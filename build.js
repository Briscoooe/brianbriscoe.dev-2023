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
const COMPONENTS_DIR = path.join(__dirname, 'components');
const OUT_DIR = path.join(__dirname, 'build');
(async () => {
  const componentFileNameList = fs.readdirSync(COMPONENTS_DIR);
  for (const componentFileName of componentFileNameList) {
    require(path.join(COMPONENTS_DIR, componentFileName));
  }
  let indexFileString = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
  for (const elementName of Object.keys(customElements.elements)) {
    const elementNameWithTags = `<${elementName}></${elementName}>`
    const elementComponent = new customElements.elements[elementName]();
    elementComponent.connectedCallback();
    indexFileString = indexFileString.replace(elementNameWithTags, elementComponent.innerHTML);
  }
  fs.mkdirSync(OUT_DIR);
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), indexFileString);
})();
