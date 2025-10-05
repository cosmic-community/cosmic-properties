const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScriptIntoHTML(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`Script already exists in ${filePath}`);
    return;
  }
  
  const headEndIndex = content.indexOf('</head>');
  if (headEndIndex !== -1) {
    content = content.slice(0, headEndIndex) + scriptTag + '\n' + content.slice(headEndIndex);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected console capture script into ${filePath}`);
  }
}

const outDir = path.join(process.cwd(), '.next', 'server', 'app');

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScriptIntoHTML(filePath);
    }
  });
}

console.log('Injecting console capture script into HTML files...');
processDirectory(outDir);
console.log('Console capture script injection complete!');