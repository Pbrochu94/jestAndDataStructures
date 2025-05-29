import { construct, operations, database } from "./script";

describe("Test lists", () => {
  test("Checking that last node added is at the end of the list", () => {
    let arr = [10, 20, 30];
    let mockFunction = jest.fn((number) => {
      let newNode = new construct.Node(number);
      construct.list.append(newNode);
    });
    for (let i = 0; i < arr.length; i++) {
      //expect(mockFunction(arr[i])).toBe(construct.list.tail);
      mockFunction(arr[i]);
      expect(construct.list.head.value).toBe(mockFunction.mock.calls[i][0]);
    }
  });
  test("Checking that previous node is assigned to previous pointer of curr node", () => {
    let arr = [10, 20, 30];
    let mockFunction = jest.fn((number) => {
      let newNode = new construct.Node(number);
      construct.list.append(newNode);
      return newNode;
    });
    for (let i = 0; i < arr.length; i++) {
      mockFunction(arr[i]);
      if (i > 0) {
        expect(mockFunction.mock.results[i].value.previousPointer).toEqual(
          mockFunction.mock.results[i - 1].value,
        );
      }
    }
  });
  test("Check if current node is assigned to last node next pointer", () => {
    let arr = [10, 20, 30];
    let mockFunction = jest.fn((number) => {
      let newNode = new construct.Node(number);
      construct.list.append(newNode);
      return newNode;
    });
    for (let i = 0; i < arr.length; i++) {
      mockFunction(arr[i]);
      if (i > 0) {
        expect(mockFunction.mock.results[i].value).toEqual(
          mockFunction.mock.results[i].value.previousPointer.nextPointer,
        );
      }
    }
  });
});

describe("Test hash table", () => {
  test("Check if hash function sort in alphabetical order according to the first letter", () => {
    let mockCheckAlphaOrder = jest.fn((firstName, secondName) => {
      let length = firstName.length;
      let result = true;
      for (let i = 0; i < length; i++) {
        if (!secondName[i] || !firstName[i]) {
          return result;
        }
        if (secondName[i] > firstName[i]) {
          return true;
        }
        if (secondName[i] < firstName[i]) {
          return false;
        }
        return;
      }
    });
    let people = [
      { name: "Denis", age: 80 },
      { name: "Delphine", age: 30 },
      { name: "Michel", age: 65 },
      { name: "Patrick", age: 30 },
      { name: "Sylvie", age: 63 },
    ];
    let previousPerson;
    people.forEach((person) => {
      operations.hash(person);
    });
    database.table.forEach((person) => {
      if (previousPerson) {
        if (previousPerson.length > 1) {
          expect(
            mockCheckAlphaOrder(previousPerson[0].name, person.name),
          ).toBeTruthy();
        } else {
          expect(
            mockCheckAlphaOrder(previousPerson.name, person.name),
          ).toBeTruthy();
        }
      }
      previousPerson = person;
    });
  });
});
describe("Test selection sort algorithm", () => {
  test("Numbers are in order from smallest to biggest", () => {
    console.log(database.sortArr);
    let mockCheckOrder = jest.fn((array) => {
      array.forEach((number) => {
        console.log(number);
      });
    });
  });
});
describe("Test binary search", () => {
  let sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  test("If number is found in array", () => {
    sortedArr.forEach((number) => {
      expect(operations.binarySearch(sortedArr, number)).toBe(number);
    });
  });
  test("If number not in array returns `Number not found`", () => {
    for (let i = 11; i < 20; i++) {
      expect(operations.binarySearch(sortedArr, i)).toBe("Number not found");
    }
  });
});
