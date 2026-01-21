import { aTimeout, fixture } from '@open-wc/testing';
import { component } from '@pionjs/pion';
import { html } from 'lit-html';
import type { DialogElement } from '../types';
import useMove from '../use-move';

type TestMoveDialogElement = DialogElement;

const TestMoveDialog = () =>
	component<DialogElement>((/* host */) => {
		useMove();
		return html`
			<div class="title">Title</div>
			<div class="content">Content</div>
		`;
	});

customElements.define('test-move-dialog', TestMoveDialog());

describe('use-move', () => {
	it('does not throw when unmovable is true', async () => {
		await fixture(html`
			<test-move-dialog .unmovable=${true}></test-move-dialog>
		`);
	});

	it('does not throw when mousedown on content', async () => {
		const el = (await fixture(html`
			<test-move-dialog></test-move-dialog>
		`)) as TestMoveDialogElement;
		const content = el.shadowRoot?.querySelector('.content') as HTMLElement;
		content.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
	});

	it('does not throw when mousedown on title', async () => {
		const el = (await fixture(html`
			<test-move-dialog></test-move-dialog>
		`)) as TestMoveDialogElement;
		const title = el.shadowRoot?.querySelector('.title') as HTMLElement;
		title.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
	});

	it('re-runs setup when unmovable changes', async () => {
		const el = (await fixture(html`
			<test-move-dialog .unmovable=${true}></test-move-dialog>
		`)) as TestMoveDialogElement;
		el.unmovable = false;
		await aTimeout(0);
		const title = el.shadowRoot?.querySelector('.title') as HTMLElement;
		title.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
	});

	it('handles multiple unmovable changes', async () => {
		const el = (await fixture(html`
			<test-move-dialog></test-move-dialog>
		`)) as TestMoveDialogElement;
		el.unmovable = true;
		await aTimeout(0);
		el.unmovable = false;
		await aTimeout(0);
		el.unmovable = true;
		await aTimeout(0);
	});
});
