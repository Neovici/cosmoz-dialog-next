import '@neovici/cosmoz-spinner';
import { html } from 'lit-html';
import { dialog } from '.';

customElements.define(
	'cosmoz-dialog-loading',
	dialog(
		() => html`
			<style>
				.content {
					flex-direction: row;
					align-items: center;
					justify-content: center;
					padding: 30px;
				}
				cosmoz-spinner {
					width: 32px;
					height: 32px;
					margin-right: 12px;
				}
			</style>
			<cosmoz-spinner></cosmoz-spinner>
			<slot></slot>
		`,
	),
);
