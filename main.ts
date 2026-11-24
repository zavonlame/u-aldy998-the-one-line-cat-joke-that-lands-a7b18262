// The One-Line Cat Joke That Lands — one joke, one line, written to /output/entry.txt.
// The joke itself lives here as a literal: the grader runs this program against
// the GitHub repo alone, so it must not read any other file to find its text.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Setup: vet says the cat is fat, food goes up high. Turn: the cat stops
// dieting and starts reigning — a dragon guarding treasure he won't share.
// The em dash is part of the joke's rhythm: setup, beat, then the turn.
const JOKE =
  "The vet says my cat is fat, so I moved his food to the top of the fridge — he now naps up there beside it, like a dragon guarding treasure he won't share.";

// Gate from the kit: entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace.
const GATE_MIN = 1;
const GATE_MAX = 200;

function jokeIsValid(text) {
  // Count Unicode code points, not UTF-16 units, so the gate matches the
  // scorer's character count.
  const chars = [...text].length;
  if (chars < GATE_MIN || chars > GATE_MAX) return false;
  return text.trim().length > 0;
}

function outputDir() {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function main() {
  if (!jokeIsValid(JOKE)) {
    throw new Error("joke fails the 1-200 character gate");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), JOKE, "utf8");
}

main();
