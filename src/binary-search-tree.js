const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    // console.debug("add");
    // console.debug(data);
    if (this.rootNode == null) {
      this.rootNode = new Node(data, null);
      return this.rootNode;
    }
    if (this.has(data)) return false;
    let place = this.findPlace(data, this.rootNode);
    let node = new Node(data, place);
    if (data < place.data) {
      place.left = node;
    } else {
      place.right = node;
    }
  }

  findPlace(data, startNode) {
    if (data < startNode.data) {
      if (!startNode.left) {
        return startNode;
      } else {
        return this.findPlace(data, startNode.left);
      }
    }

    if (!startNode.right) {
      return startNode;
    } else {
      return this.findPlace(data, startNode.right);
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    return this.findFrom(data, this.rootNode);
  }

  findFrom(data, startNode) {
    if (data === startNode.data) {
      return startNode;
    } else {
      if (data < startNode.data) {
        if (!startNode.left) {
          return null;
        } else {
          return this.findFrom(data, startNode.left);
        }
      }

      if (!startNode.right) {
        return null;
      } else {
        return this.findFrom(data, startNode.right);
      }
    }
  }

  remove(data) {
    // console.debug("rem");
    // console.debug(data);

    let goal = this.find(data);

    if (!goal) return false;
    if (goal.right) {
      let min = this.minFrom(goal.right);

      goal.data = min.data;
      if (min.parent !== goal) {
        min.parent.left = min.right;
      } else {
        goal.right = min.right;
        // min.parent = goal.parent;
        // if (goal.parent.left === goal) {
        //   goal.parent.left = min;
        // } else {
        //   goal.parent.right = min;
        // }
      }
      if (min.right) {
        min.right.parent = min.parent;
      }
    } else {
      if (goal.parent === this.rootNode) {
        if (goal.parent.left === goal) {
          this.rootNode.left = goal.left;
        } else {
          this.rootNode.right = goal.left;
        }

        return true;
      }

      if (goal.parent.right === goal) {
        goal.parent.right = goal.left;
      } else {
        goal.parent.left = goal.left;
      }
    }
    return true;
  }

  min() {
    return this.minFrom(this.rootNode).data;
  }

  minFrom(currentNode) {
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  max() {
    return this.maxFrom(this.rootNode).data;
  }

  maxFrom(currentNode) {
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }
}

class Node {
  constructor(data, parent) {
    this.data = data;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

module.exports = {
  BinarySearchTree,
};
