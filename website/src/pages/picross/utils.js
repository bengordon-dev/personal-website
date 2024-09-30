export function initialRowNums(newHeight, newWidth, newBoard) {
  let newRowNums = []
  for (let i = 0; i < newHeight; i++) {
    let row = []
    let counter = 0
    for (let j = 0; j < newWidth; j++) {
      let num = newBoard.at((i * newWidth) + j)
      if (num === 0  && counter > 0) {
        row.push(counter)
        counter = 0
      } else if (num === 1) {
        counter += 1
      }
    }
    if (counter > 0) {
      row.push(counter)
    }
    newRowNums.push(row)
  }
  return newRowNums
}

export function initialColNums(newHeight, newWidth, newBoard) {
  let newColNums = []
  for (let j = 0; j < newWidth; j++) {
    let col = []
    let counter = 0;
    for (let i = 0; i < newHeight; i++) {
      let num = newBoard.at((i * newWidth) + j)
      if (num === 0 && counter > 0) {
        col.push(counter)
        counter = 0
      } else if (num === 1) {
        counter += 1
      }
    }
    if (counter > 0) {
      col.push(counter)
    }
    newColNums.push(col)
  }
  return newColNums
}

export function crossNumbers(arr, groupCount) {
  let out = [-1, groupCount];
  let groupLength = 0;
  for (let i = 0; arr[i] > 0 && i < arr.length; i++) {
    if (arr[i] === 2) { // blue square
      groupLength++;
    } else { // gray square
      if (groupLength > 0) {
        out[0]++;
        groupLength = 0;
      }
    }
  }
  groupLength = 0;
  for (let i = arr.length - 1; arr[i] > 0 && i >= 0; i--) {
    if (arr[i] === 2) { // blue square
      groupLength++;
    } else { // gray square
      if (groupLength > 0) {
        out[1]--;
        groupLength = 0;
      }
    }
  }
  return out
}
