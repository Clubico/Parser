import { assertEquals, assertThrows } from "https://deno.land/std@0.206.0/assert/mod.ts";
import { Converter } from './index.ts'

Deno.test("JSONConverter should convert JSON to JS", () => {
  const input = '{"name": "John"}';
  const expected = { name: "John" };
  const actual = Converter.convert(input, "JSON").toJS();
  assertEquals(actual, expected);
});

Deno.test("JSONConverter should convert JSON with null to JS", () => {
  const input = '{"name": null}';
  const expected = { name: null };
  const actual = Converter.convert(input, "JSON").toJS();
  assertEquals(actual, expected);
});

Deno.test("JSONConverter should convert JSON with empty string to JS", () => {
  const input = '{"name": ""}';
  const expected = { name: "" };
  const actual = Converter.convert(input, "JSON").toJS();
  assertEquals(actual, expected);
});

Deno.test("JSONConverter should convert nested JSON to JS", () => {
  const input = '{"name": "John", "address": {"city": "London"}}';
  const expected = { name: "John", address: { city: "London" } };
  const actual = Converter.convert(input, "JSON").toJS();
  assertEquals(actual, expected);
});

Deno.test("JSONConverter should convert JSON array to JS", () => {
  const input = '[{"name": "John"}, {"name": "Jane"}]';
  const expected = [{ name: "John" }, { name: "Jane" }];
  const actual = Converter.convert(input, "JSON").toJS();
  assertEquals(actual, expected);
});

Deno.test("JSONConverter should convert JSON array with nested objects to JS", () => {
  const input = '[{"name": "John", "address": {"city": "London"}}, {"name": "Jane", "address": {"city": "Paris"}}]';
  const expected = [{ name: "John", address: { city: "London" } }, { name: "Jane", address: { city: "Paris" } }];
  const actual = Converter.convert(input, "JSON").toJS();
  assertEquals(actual, expected);
});

Deno.test("JSONConverter should convert JSON array with nested arrays to JS", () => {
  const input = '[{"name": "John", "streets": ["Baker Street", "Oxford Street"]}, {"name": "Jane", "streets": ["Champs-Élysées"]}]';
  const expected = [{ name: "John", streets: ["Baker Street", "Oxford Street"] }, { name: "Jane", streets: ["Champs-Élysées"] }];
  const actual = Converter.convert(input, "JSON").toJS();
  assertEquals(actual, expected);
});

Deno.test("JSONConverter should convert JSON array with nested objects and arrays to JS", () => {
  const input = '[{"name": "John", "address": {"city": "London", "streets": ["Baker Street", "Oxford Street"]}}, {"name": "Jane", "address": {"city": "Paris", "streets": ["Champs-Élysées"]}}]';
  const expected = [{ name: "John", address: { city: "London", streets: ["Baker Street", "Oxford Street"] } }, { name: "Jane", address: { city: "Paris", streets: ["Champs-Élysées"] } }];
  const actual = Converter.convert(input, "JSON").toJS();
  assertEquals(actual, expected);  
});

Deno.test("JSONConverter should throw error when provided with invalid JSON", () => {
  const input = '{"name": "John"';
  const expected = "Unexpected end of JSON input";
  assertThrows(() => Converter.convert(input, "JSON").toJS(), Error, expected);
})