/**
 * @file Module containing definition of the Tree class using prototypes
 * @author Ondřej Krejčí (xkrejc69)
 * @date 3/2022
 * 
 * WAP Project 1
 */

export {Tree};

/**
 * Constructs an empty binary search tree using the given comparison function
 * @constructor
 * @see {@link https://www.digitalocean.com/community/tutorials/js-objects-prototypes-classes}
 * @param {compareFn} compare comparison function for inserted values
 * @returns {Tree}
 */
function Tree(compare){
	this.compare = compare;
	this.value = null;
	this.left = null;
	this.right = null;
	return this;
}

/**
 * Compares two values
 * @callback compareFn
 * @param {*} a inserted value
 * @param {*} b value in tree
 * @return {bool}
*/

/**
 * Inserts a new value to the empty tree.
 * Changes the prototype to {@link FullTree}.
 * Sets the left and right child to new empty trees.
 * @param {*} value
 */
Tree.prototype.insertValue = function(value) {
	this.value = value;
	this.left = new Tree(this.compare);
	this.right = new Tree(this.compare);

	Object.setPrototypeOf(this, FullTree.prototype);
}

/**
 * Traverses the tree in preorder
 * @note The generator is always empty
 * @yields {*} next value from the tree in preorder traversal
 */
Tree.prototype.preorder = function*() {
	return;
};

/**
 * Traverses the tree in inorder
 * @note The generator is always empty
 * @yields {*} next value from the tree in inorder traversal
 */
Tree.prototype.inorder = function*() {
	return;
};

/**
 * Traverses the tree in postorder
 * @note The generator is always empty
 * @yields {*} next value from the tree in postorder traversal
 */
Tree.prototype.postorder = function*() {
	return;
};

/**
 * Constructs a binary search tree using the given comparison function and initial value
 * @constructor
 * @param {compareFn} compare comparison function for inserted values
 * @param {*} value value of the tree's root node
 * @returns {FullTree}
 */
function FullTree(compare, value){
	this.compare = compare;
	this.value = value;
	this.left = new Tree(this.compare);
	this.right = new Tree(this.compare);
	return this;
}

/**
 * Inserts a new value to the tree
 * @param {*} value
 */
FullTree.prototype.insertValue = function(value) {
	if(this.compare(value, this.value)){
		this.left.insertValue(value);
	}
	else{
		this.right.insertValue(value);
	}
}

/**
 * Traverses the tree in preorder
 * @yields {*} next value from the tree in preorder traversal
 */
FullTree.prototype.preorder = function*() {
	yield this.value;
	yield* this.left.preorder();
	yield* this.right.preorder();
};

/**
 * Traverses the tree in inorder
 * @yields {*} next value from the tree in inorder traversal
 */
FullTree.prototype.inorder = function*() {
	yield* this.left.inorder();
	yield this.value;
	yield* this.right.inorder();
};

/**
 * Traverses the tree in postorder
 * @yields {*} next value from the tree in postorder traversal
 */
FullTree.prototype.postorder = function*() {
	yield* this.left.postorder();
	yield* this.right.postorder();
	yield this.value;
};


//// Simple implementation of the tree with multiple conditions

/**
 * Constructs an empty binary search tree using the given comparison function
 * @constructor
 * @param {compareFn} compare comparison function for inserted values
 * @returns {BasicTree}
 */
function BasicTree(compare) {
	this.compare = compare;
	this.value = null;
	this.left = null;
	this.right = null;
	return this;
}

/**
 * Inserts a new value to the tree
 * @param {*} value
 */
BasicTree.prototype.insertValue = function(value) {
	if(!this.value){
		this.value = value;
		this.left = new BasicTree(this.compare);
		this.right = new BasicTree(this.compare);
	}
	else if(this.compare(value, this.value)){
		this.left.insertValue(value);
	}
	else{
		this.right.insertValue(value);
	}
}

/**
 * Traverses the tree in preorder
 * @yields {*} next value from the tree in preorder traversal
 */
BasicTree.prototype.preorder = function*() {
	if(!this.value)
		return;
	
	yield this.value;
	yield* this.left.preorder();
	yield* this.right.preorder();
};

/**
 * Traverses the tree in inorder
 * @yields {*} next value from the tree in inorder traversal
 */
BasicTree.prototype.inorder = function*() {
	if(!this.value)
		return;

	yield* this.left.inorder();
	yield this.value;
	yield* this.right.inorder();
};

/**
 * Traverses the tree in postorder
 * @yields {*} next value from the tree in postorder traversal
 */
BasicTree.prototype.postorder = function*() {
	if(!this.value)
		return;

	yield* this.left.postorder();
	yield* this.right.postorder();
	yield this.value;
};
