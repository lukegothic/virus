export const range = (start, stop, step = 1) => Array.from({ length: (stop - start + 1) / step }, (_, i) => start + (i * step));
export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }