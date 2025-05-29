const fs = require('fs');
const path = require('path');

function fixEsmImports(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix relative imports to include .js extension
      content = content.replace(
        /from ["'](\.[^"']*?)["']/g, 
        (match, importPath) => {
          if (!importPath.endsWith('.js')) {
            return match.replace(importPath, importPath + '.js');
          }
          return match;
        }
      );
      
      // Fix export * from relative imports
      content = content.replace(
        /export \* from ["'](\.[^"']*?)["']/g,
        (match, importPath) => {
          if (!importPath.endsWith('.js')) {
            return match.replace(importPath, importPath + '.js');
          }
          return match;
        }
      );
      
      fs.writeFileSync(filePath, content);
    }
  });
}

fixEsmImports('./dist/esm');
console.log('ESM imports fixed!'); 