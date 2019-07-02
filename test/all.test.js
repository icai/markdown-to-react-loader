const fs = require('fs');
const path = require('path');
const markdownToReact = require('../lib/markdown-to-react-loader');
const pretter = require('prettier');


const testIO = (inFile, outFile) => {
  let input = getFileContents(inFile);
  let output = getFileContents(outFile);

  let processed = pretter.format(
    markdownToReact(input),
    {
      parser: 'babel',
    }
  );

  expect(output).toEqual(processed);
}

const getFileContents = file => {
  return fs.readFileSync(path.resolve(__dirname, file)).toString('utf-8');
}

test('Compiles hello, world', () => {
  testIO('io/simple.md', 'io/simple.js');
});

test('Compiles file with imports', () => {
  testIO('io/imports.md', 'io/imports.js');
});

test('Compiles file with code block', () => {
  testIO('io/codeblock.md', 'io/codeblock.js');
});
