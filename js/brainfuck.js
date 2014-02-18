// Brainfuck is the most minimalistic scripting language ever.
// Some years ago, I made an interpreter using C#. Now I'm porting it to Javascript.
// For the language specification, refer to http://esolangs.org/wiki/Brainfuck
// Maybe I'll add comments to the code below someday.
// For now, rest assured that I have tested it against some examples, from hello world and cat programs to the more complex calculators.

function brainfuck(code) {
  "use strict";

  var data = [];
  data.length = 30000;

  var j;

  for (j = 0; j < 30000; j++) {
    data[j] = 0;
  }

  j = 0;

  var k, bracketCount;

  var printQueue = "";

  for (var i = 0; i < code.length; i++) {
    if (code[i] === ">") {
      j++;
      if (j >= 30000) {
        throw new Error("Data pointer overflow.");
      }
    } else if (code[i] === "<") {
      j--;
      if (j < 0) {
        throw new Error("Data pointer underflow");
      }
    } else if (code[i] === "+") {
      data[j]++;
      if (data[j] > 255) {
        data[j] = 0;
      }
    } else if (code[i] === "-") {
      data[j]--;
      if (data[j] < 0) {
        data[j] = 255;
      }
    } else if (code[i] === ".") {
      printQueue += String.fromCharCode(data[j]);
    } else if (code[i] === ",") {
      var input = window.prompt("Input a single character at position " + j +
                         " (extra characters will be ignored).");
      data[j] = input.charCodeAt(0);
    } else if (code[i] === "[") {
      if (!data[j]) {
        bracketCount = 0;
        for (k = i + 1; k < code.length; k++) {
          if (code[k] === "[") {
            bracketCount++;
          } else if (code[k] === "]") {
            bracketCount--;
          }

          if (bracketCount < 0) {
            break;
          }
        }

        if (k === code.length) {
          throw new Error("Unmatched bracket at index " + i + ".");
        } else {
          i = k;
        }
      }
    } else if (code[i] === "]") {
      if (data[j]) {
        bracketCount = 0;
        for (k = i - 1; k > 0; k--) {
          if (code[k] === "]") {
            bracketCount++;
          } else if (code[k] === "[") {
            bracketCount--;
          }

          if (bracketCount < 0) {
            break;
          }
        }

        if (k === 0) {
          throw new Error("Unmatched bracket at index " + i + ".");
        } else {
          i = k;
        }
      }
    }
  }

  if (printQueue.length > 0) {
    return printQueue;
  }
}