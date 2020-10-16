import { buildBasicFunction as buildBasicTypescriptFunction } from "./typescript";
import { buildBasicFunction as buildBasicJavascriptFunction } from "./javascript";
import { buildBasicFunction as buildBasicCSharpFunction } from "./csharp";
import faker from "faker";

const buildRandomPhrase = () =>
  faker.fake(
    // "{{hacker.verb}} {{hacker.noun}}\n{{hacker.verb}} {{hacker.noun}}\n"
    "{{hacker.phrase}}\n"
  );

export const buildRandomFunction = () => {
  const builders = [
    buildRandomPhrase,
    buildBasicTypescriptFunction,
    buildBasicJavascriptFunction,
    buildBasicCSharpFunction,
  ];

  const builder = builders[Math.floor(Math.random() * builders.length)];
  return builder();
};
