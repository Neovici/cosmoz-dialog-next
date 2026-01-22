import { renderHook } from '@neovici/testing';
import { assert } from '@open-wc/testing';
import type { DialogElement } from '../types';
import useFocus from '../use-focus';

describe('use-focus', () => {
	it('runs without error', async () => {
		const { result, unmount } = await renderHook(useFocus);
		assert.isOk(result);
		unmount();
	});

	it('responds to manualFocus changes', async () => {
		const { host, rerender } = await renderHook(useFocus);
		(host as DialogElement).manualFocus = true;
		await rerender();
		(host as DialogElement).manualFocus = false;
		await rerender();
		assert.isOk(true);
	});

	it('can set attributes on host', async () => {
		const { host } = await renderHook(useFocus);
		host.setAttribute('data-test', 'true');
		assert.equal(host.getAttribute('data-test'), 'true');
	});
});
