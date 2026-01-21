import { aTimeout, assert } from '@open-wc/testing';
import { component } from '@pionjs/pion';
import { html } from 'lit-html';
import { assert as sinonAssert, spy } from 'sinon';
import type { DialogElement } from '../types';
import useFocus from '../use-focus';

type TestFocusDialogElement = DialogElement & { focusFn?: () => void };

const TestFocusDialog = () =>
	component<DialogElement & { focusFn?: () => void }>((host) => {
		useFocus();
		host.focusFn = () => host.focus();
		return html` <button class="child">Child Button</button> `;
	});

customElements.define('test-focus-dialog', TestFocusDialog());

describe('use-focus', () => {
	it('focuses host when manualFocus is false', async () => {
		const el = document.createElement(
			'test-focus-dialog',
		) as TestFocusDialogElement;
		const focusSpy = spy(el, 'focus');
		document.body.appendChild(el);
		await aTimeout(0);
		sinonAssert.calledOnce(focusSpy);
		el.remove();
	});

	it('does not focus host when manualFocus is true', async () => {
		const el = document.createElement(
			'test-focus-dialog',
		) as TestFocusDialogElement;
		el.manualFocus = true;
		const focusSpy = spy(el, 'focus');
		document.body.appendChild(el);
		await aTimeout(0);
		sinonAssert.notCalled(focusSpy);
		el.remove();
	});

	it('does not focus host when child has focus', async () => {
		const el = document.createElement(
			'test-focus-dialog',
		) as TestFocusDialogElement;
		el.manualFocus = true;
		document.body.appendChild(el);
		await aTimeout(0);
		const childButton = el.shadowRoot?.querySelector('.child') as HTMLElement;
		childButton.focus();
		const focusSpy = spy(el, 'focus');
		el.manualFocus = false;
		await aTimeout(0);
		sinonAssert.notCalled(focusSpy);
		el.remove();
	});

	it('removes tabindex after focusing', async () => {
		const el = document.createElement(
			'test-focus-dialog',
		) as TestFocusDialogElement;
		document.body.appendChild(el);
		await aTimeout(0);
		const tabindex = el.getAttribute('tabindex');
		assert.isNull(tabindex);
		el.remove();
	});
});
