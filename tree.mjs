/**
 * @file Module containing definition of the Tree class using prototypes
 * @author Ondřej Krejčí (xkrejc69)
 * @date 3/2022
 * 
 * WAP Project 1
 */

/**
 * @module tree
 */

export {Tree};

/**
 * Constructs an empty binary search tree using the given compare function
 * @class
 * @see {@link https://www.digitalocean.com/community/tutorials/js-objects-prototypes-classes}
 * @param {Tree~compare} compare comparison function for inserted values
 * @returns {Tree}
 */
function Tree(compare) {
	this.compare = compare;
	this.value = null;
	this.left = null;
	this.right = null;
	return this;
}

/**
 * Compares two values
 * @callback Tree~compare
 * @param {*} a inserted value
 * @param {*} b value in tree
 * @return {bool}
*/

/**
 * Inserts a new value to the tree
 * @param {*} value
 */
Tree.prototype.insertValue = function(value) {
	if(!this.value){
		this.value = value;
		this.left = new Tree(this.compare);
		this.right = new Tree(this.compare);
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
Tree.prototype.preorder = function*() {
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
Tree.prototype.inorder = function*() {
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
Tree.prototype.postorder = function*() {
	if(!this.value)
		return;

	yield* this.left.postorder();
	yield* this.right.postorder();
	yield this.value;
};
