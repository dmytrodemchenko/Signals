import fs from 'fs';
import path from 'path';

const filePath = path.resolve('dist/index.min.js');
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Remove multiple spaces and newlines, but keep spaces between words
  const minified = content.replace(/\s+/g, ' ').trim();
  fs.writeFileSync(filePath, minified);
  console.log('Successfully flattened dist/index.min.js into a single row.');
}
