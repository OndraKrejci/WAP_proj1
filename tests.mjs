
import {assert} from 'chai';
import {describe, it, before, beforeEach} from 'mocha';

import {Tree} from './tree.mjs';

describe('Tree', () => {
	function compareLt(a, b){
		return (a < b);
	}

	describe('Simple', () => {
		let tree;

		beforeEach(() => {
			tree = new Tree(compareLt);
		});

		it('Empty tree', () => {
			assert.equal(tree.value, null);
		});

		it('Insert first value', () => {
			tree.insertValue(5);
			assert.equal(tree.value, 5);
		});

		it('Insert left', () => {
			tree.insertValue(10);
			tree.insertValue(5);
			assert.equal(tree.left.value, 5);
		});

		it('Insert right', () => {
			tree.insertValue(10);
			tree.insertValue(15);
			assert.equal(tree.right.value, 15);
		});

		it('Insert multiple values', () => {
			tree.insertValue(10);
			tree.insertValue(5);
			tree.insertValue(15);
			tree.insertValue(4);
			tree.insertValue(6);
			tree.insertValue(16);

			const leftTree = new Tree(compareLt);
			leftTree.insertValue(5);
			leftTree.insertValue(4);
			leftTree.insertValue(6);
			assert.deepEqual(tree.left, leftTree);

			const rightTree = new Tree(compareLt);
			rightTree.insertValue(15);
			rightTree.insertValue(16);
			assert.deepEqual(tree.right, rightTree);
		});
	});
	
	// Source: https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
	describe('Traversals', () => {
		let tree;

		before(() => {
			tree = new Tree(compareLt);
			for(let num of [25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90]){
				tree.insertValue(num);
			}
		})

		it('Preorder', () => {
			const preorder = Array.from(tree.preorder());
			assert.deepEqual(preorder, [25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90]);
		});

		it('Inorder', () => {
			const inorder = Array.from(tree.inorder());
			assert.deepEqual(inorder, [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]);
		});

		it('Postorder', () => {
			const postorder = Array.from(tree.postorder());
			assert.deepEqual(postorder, [4, 12, 10, 18, 24, 22, 15, 31, 44, 35, 66, 90, 70, 50, 25]);
		});
	});
});
