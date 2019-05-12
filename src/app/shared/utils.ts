// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export const getId = () =>
  Math.random()
    .toString(36)
    .substring(2) + new Date().getTime().toString(36);

export const randomItem = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

export const range = (n: number): number[] => Array.from(Array(n).keys());
