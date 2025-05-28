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
    let people = [
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
        expect(previousPerson.name.charCodeAt(0)).toBeLessThan(
          person.name.charCodeAt(0),
        );
      }
      previousPerson = person;
    });
  });
});
