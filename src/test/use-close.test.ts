import { fixture } from '@open-wc/testing';
import { component } from '@pionjs/pion';
import { html } from 'lit-html';
import { assert as sinonAssert, spy } from 'sinon';
import type { DialogElement } from '../types';
import useClose from '../use-close';

// Note: Tests use a component wrapper because renderHook from @neovici/testing
// doesn't expose a host element that useHost() can access.
// See: https://github.com/Neovici/testing/issues/4

const TestCloseDialog = () =>
	component<DialogElement & { closeFn?: () => void }>((host) => {
		const { close } = useClose();
		host.closeFn = close;
		return html`
			<button class="close" value="cancel">Cancel</button>
			<button class="other">Other</button>
		`;
	});

customElements.define('test-close-dialog', TestCloseDialog());

describe('use-close', () => {
	it('close dispatches close event', async () => {
		const el = (await fixture(html`
			<test-close-dialog></test-close-dialog>
		`)) as any;
		const closeSpy = spy();
		el.addEventListener('close', closeSpy);
		el.closeFn();
		sinonAssert.calledOnce(closeSpy);
	});

	it('close invokes onClose callback', async () => {
		const onCloseSpy = spy();
		const el = (await fixture(html`
			<test-close-dialog .onClose=${onCloseSpy}></test-close-dialog>
		`)) as any;
		el.closeFn();
		sinonAssert.calledOnce(onCloseSpy);
	});

	it('click on cancel button triggers close', async () => {
		const el = await fixture(html` <test-close-dialog></test-close-dialog> `);
		const closeSpy = spy();
		el.addEventListener('close', closeSpy);
		const cancelButton = el.shadowRoot?.querySelector('.close');
		cancelButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		sinonAssert.calledOnce(closeSpy);
	});

	it('escape key triggers close', async () => {
		const el = await fixture(html` <test-close-dialog></test-close-dialog> `);
		const closeSpy = spy();
		el.addEventListener('close', closeSpy);
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		sinonAssert.calledOnce(closeSpy);
	});

	it('non-cancel clicks are ignored', async () => {
		const el = await fixture(html` <test-close-dialog></test-close-dialog> `);
		const closeSpy = spy();
		el.addEventListener('close', closeSpy);
		const otherButton = el.shadowRoot?.querySelector('.other');
		otherButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		sinonAssert.notCalled(closeSpy);
	});

	it('cleanup removes event listeners', async () => {
		const el = await fixture(html` <test-close-dialog></test-close-dialog> `);
		const closeSpy = spy();
		el.addEventListener('close', closeSpy);
		el.remove();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		sinonAssert.notCalled(closeSpy);
		const cancelButton = el.shadowRoot?.querySelector('.close');
		cancelButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		sinonAssert.notCalled(closeSpy);
	});
});
