
import {assert} from 'chai';
import {describe, it, before, beforeEach} from 'mocha';

import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {execSync} from 'child_process';
import {readFileSync} from 'fs';

import {Tree} from './tree.mjs';

// https://nodejs.org/dist/latest/docs/api/esm.html#esm_no_filename_or_dirname
const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

describe('Tree', () => {
	function compareLt(a, b){
		return (a < b);
	}

	function isLonger(a, b){
		return (a.length > b.length); 
	}

	function equals(a, b){
		return (a == b);
	}

	describe('Creation and inserting values', () => {
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

	describe('Other compare functions', () => {
		it('String length', () => {
			const tree = new Tree(isLonger);
			tree.insertValue('abc');
			tree.insertValue('123456');
			tree.insertValue('A');
			tree.insertValue('AB');

			assert.equal(tree.value, 'abc');
			assert.equal(tree.left.value, '123456');
			assert.equal(tree.right.value, 'A');
			assert.equal(tree.right.left.value, 'AB');
		});

		it('Equals', () => {
			const tree = new Tree(equals);
			tree.insertValue(false);
			tree.insertValue(0);
			tree.insertValue(1);
			tree.insertValue(2);

			assert.strictEqual(tree.value, false);
			assert.strictEqual(tree.left.value, 0);
			assert.strictEqual(tree.right.value, 1);
			assert.strictEqual(tree.right.right.value, 2);
		});

		it('Trees with different compare functions', () => {
			const tree1 = new Tree(compareLt);
			const tree2 = new Tree(isLonger);

			tree1.insertValue(100);
			tree2.insertValue('xyz');
			tree1.insertValue(55);
			tree2.insertValue('p');

			assert.equal(tree1.left.value, 55);
			assert.equal(tree2.right.value, 'p');
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
	
	describe('Reference test', () => {
		it('Check output of test.mjs', () => {
			const test_script = join(ROOT_DIR, 'reftest.mjs'); // https://www.fit.vutbr.cz/study/courses/WAP/private/proj/2022/test.mjs
			const test_output = join(ROOT_DIR, 'reftest.out'); // https://www.fit.vutbr.cz/study/courses/WAP/private/proj/2022/v%C3%BDstup

			const ref_output = readFileSync(test_output, {encoding: 'utf-8'});

			const buffer = execSync(['node', test_script].join(' '), {timeout: 1000});
			const output = buffer.toString('utf-8');

			assert.equal(output, ref_output);
		});
	});
});
