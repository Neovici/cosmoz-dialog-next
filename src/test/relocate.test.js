import { assert } from '@open-wc/testing';
import relocate from '../relocate';

test('relocate without handle', () => {
	const el = document.createElement('div');
	Object.assign(el.style, {
		position: 'absolute',
		top: '100px',
		left: '100px',
		width: '120px',
		height: '100px',
	});
	document.body.append(el);

	const onRelocate = relocate(el);
	onRelocate(new MouseEvent('mousedown', { clientX: 120, clientY: 100 }));
	assert.equal(el.style.top, '100px');
	assert.equal(el.style.left, '100px');

	document.dispatchEvent(
		new MouseEvent('mousemove', { clientX: 130, clientY: 100 })
	);
	assert.equal(el.style.top, '100px');
	assert.equal(el.style.left, '110px');
	document.dispatchEvent(new MouseEvent('mouseup'));
});
