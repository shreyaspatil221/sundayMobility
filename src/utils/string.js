
const emptyFiller = '-';

export function handleEmpty(inputString) {
  return (inputString || emptyFiller);
}

export function trimLastChar(inputString) {
  return inputString.substring(0, inputString.length - 1);
}

export function trimFirstChar(inputString) {
  return inputString.substring(1, inputString.length);
}

export function trimFirstNChars(inputString, n = 0) {
  return inputString.substring(n, inputString.length);
}

export function trimLastNChars(inputString, n = 0) {
  return inputString.substring(0, inputString.length - n);
}

export function isLastChar(inputString, charToCheck) {
  return (inputString.substring(inputString.length - 1, inputString.length) === charToCheck);
}

export function isFirstChar(inputString, charToCheck) {
  return (inputString.substring(0, 1) === charToCheck);
}

export function stringContains(inputString, charToCheck) {
  return (inputString && charToCheck ? inputString.toLowerCase().indexOf(charToCheck.toLowerCase()) !== -1 : false);
}
