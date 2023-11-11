import { Converter } from './string-converter/index.ts';

function main() {  
  // For testing purposes
  // testing PR
  const input = '{"name": "John"}';
  const test = Converter.convert(input, "JSON").toJS();
  console.log(test);
}

main()