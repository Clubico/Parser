import { JSONConverter } from './json-converter.ts'

type Extensions = "JSON" | "CSV";

export class Converter {
  static convert(input: string, source: Extensions) {
    switch (source) {
      case "JSON":
        return new JSONConverter(input);
      case "CSV":
        throw new Error("Not implemented");
      default:
        throw new Error("Invalid source");
    }
  }
}