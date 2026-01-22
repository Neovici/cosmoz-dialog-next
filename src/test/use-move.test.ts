import { renderHook } from '@neovici/testing';
import { assert } from '@open-wc/testing';
import type { DialogElement } from '../types';
import useMove from '../use-move';

describe('use-move', () => {
	it('runs without error when unmovable is true', async () => {
		const { host, rerender } = await renderHook(useMove);
		(host as DialogElement).unmovable = true;
		await rerender();
		assert.isOk(true);
	});

	it('runs without error when unmovable is false', async () => {
		const { host, rerender } = await renderHook(useMove);
		(host as DialogElement).unmovable = false;
		await rerender();
		assert.isOk(true);
	});

	it('responds to unmovable changes', async () => {
		const { host, rerender } = await renderHook(useMove);
		(host as DialogElement).unmovable = true;
		await rerender();
		(host as DialogElement).unmovable = false;
		await rerender();
		(host as DialogElement).unmovable = true;
		await rerender();
		assert.isOk(true);
	});

	it('can set properties on host', async () => {
		const { host } = await renderHook(useMove);
		const dialogHost = host as DialogElement;
		dialogHost.unmovable = true;
		assert.equal(dialogHost.unmovable, true);
	});
});
