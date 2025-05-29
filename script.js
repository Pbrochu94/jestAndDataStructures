//double-chained list---------------------------------
class Node {
  constructor(value) {
    this.value = value;
    this.previousPointer = null;
    this.nextPointer = null;
  }
}

class List {
  constructor() {
    this.tail = null;
    this.head = null;
  }
  append(node) {
    node.previousPointer = this.head;
    if (!node.previousPointer) {
      this.tail = node;
    }
    if (node.previousPointer) {
      node.previousPointer.nextPointer = node;
    }
    this.head = node;
  }
}

let list = new List();

//hash table-----------------------------------------

let table = [];

function hash(value) {
  //hash function
  let index = value.name.charCodeAt(0); //Get first char value
  if (table[index]) {
    //if theres already a value in the same spot
    if (!Array.isArray(table[index])) {
      table[index] = [table[index]];
    }
    let arrayLength = table[index].length;
    let wordLength = value.name.length;
    for (let i = 0; i < arrayLength; i++) {
      for (let x = 0; x < wordLength; x++) {
        if (!value.name.charCodeAt(x) || !table[index][i].name.charCodeAt(x)) {
          table[index].unshift(value);
          return;
        }
        if (value.name.charCodeAt(x) < table[index][i].name.charCodeAt(x)) {
          table[index].unshift(value);
          return;
        }
      }
    }
  }
  table[index] = value;
}

//Selection sort--------------------

let sortArr = [11, 23, 8, 14, 30, 9, 6, 17, 22, 28, 25, 15, 7, 10, 19];

function sort(arr) {
  let length = arr.length;
  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      if (arr[x] < arr[y]) {
        let placeholder = arr[x];
        arr[x] = arr[y];
        arr[y] = placeholder;
      }
    }
  }
}
//bubble sort----------------------
/*
let array = [11, 23, 8, 14, 30, 9, 6, 17, 22, 28, 25, 15, 7, 10, 19];

function bubble(arr) {
  let length = array.length;
  for (let x = 0; x < length; x++) {
    for (let i = length - 1; i >= 0; i--) {
      if (arr[i] < arr[i - 1]) {
        let placeholder = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = placeholder;
      }
    }
  }
}

console.log(array);
bubble(array);
console.log(array);
*/

//merging sort----------------------

let array = [11, 23, 8, 14, 30, 9, 6, 17, 22, 28, 25, 15, 7, 10, 19];

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let middle = Math.ceil(arr.length / 2);
  let leftSide = arr.splice(0, middle);
  let rightSide = arr;
  return merge(mergeSort(leftSide), mergeSort(rightSide));
}

function merge(leftArr, rightArr) {
  let newArr = [];
  let lengthOfBoth = leftArr.length + rightArr.length;
  for (let x = 0; x < lengthOfBoth; x++) {
    if (leftArr[0] < rightArr[0] || rightArr[0] === undefined) {
      newArr.push(leftArr.shift());
    } else {
      newArr.push(rightArr.shift());
    }
  }
  return newArr;
}

//binary search---------------------

function binarySearch(arr, number) {
  let midIndex = Math.floor(arr.length / 2);
  if (arr[midIndex] === number) {
    return number;
  }
  if (arr.length === 1 && arr !== number) {
    return "Number not found";
  }
  if (number < arr[midIndex]) {
    return binarySearch(arr.slice(0, midIndex), number);
  } else {
    return binarySearch(arr.slice(midIndex, arr.length), number);
  }
}

//Binary tree-----------------------
/*
class Card {
  constructor(name, power) {
    this.name = name;
    this.power = power;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class powerScale {
  constructor() {
    this.root = null;
  }
  add(name, power) {
    if (arguments.length > 2) {
      // if more than 2 args
      console.log("Too many arguments!");
      return;
    }
    let newCard = new Card(name, power);
    if (!this.root) {
      this.root = newCard;
      return;
    }
    if(newCard)
    if (newCard.power < this.root.power) {
      this.root.leftChild = newCard;
    } else {
      this.root.rightChild = newCard;
    }
    newCard.parent = this.root;
  }
}

let tree = new powerScale();
tree.add("Red eyes black dragon", 2100);
tree.add("Baby red eyes black dragon", 1800);
tree.add("Blue eyes white dragon", 3000);
tree.add("Relinquished", 0);

console.log(tree);
*/

let operations = {
  hash,
  sort,
  binarySearch,
};

let database = {
  table,
  sortArr,
};

const construct = {
  Node,
  list,
};

export { construct, operations, database };
