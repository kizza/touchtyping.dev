import faker from "faker";
import { buildBasicFunction as buildBasicCSharpFunction } from "./csharp";
import { buildBasicFunction as buildBasicJavascriptFunction } from "./javascript";
import {
  buildBasicFunction as buildBasicTypescriptFunction,
  buildBasicFunction2 as buildBasicTypescriptFunction2,
} from "./typescript";
import { oneOf } from "./util";

const buildRandomPhrase = () => faker.fake("{{hacker.phrase}}\n");

export const buildRandomFunction = () => {
  const builders = [
    buildRandomPhrase,
    buildBasicTypescriptFunction,
    buildBasicTypescriptFunction2,
    buildBasicJavascriptFunction,
    buildBasicCSharpFunction,
  ];

  return oneOf(builders)();
};
