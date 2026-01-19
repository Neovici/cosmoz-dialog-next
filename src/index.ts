import { component, html, ComponentOptions } from '@pionjs/pion';
import { when } from 'lit-html/directives/when.js';
import { useHost } from '@neovici/cosmoz-utils/hooks/use-host';
import styles from './style.css';
import useClose from './use-close';
import useMove from './use-move';
import useFocus from './use-focus';
import { Props, DialogElement } from './types';
import { clearIcon } from '../cz-icon/clear.js';

export type { Props };
export const useDialog = () => {
	useClose();
	useMove();
	useFocus();
};

export const renderDialog = ({
	title,
	content,
	styles: extraStyles,
	closeable = false,
}: {
	title: string;
	content: unknown;
	styles: unknown;
	closeable: boolean;
}) => {
	const host = useHost<DialogElement>();

	return html`
		<style>
			${styles}${extraStyles}
		</style>
		<div class="title" part="title">
			${title}
			${when(
				closeable,
				() => html`
					<button
						class="close"
						@click=${() => {
							host.dispatchEvent(new Event('close'));
							host.onClose?.();
						}}
					>
						${clearIcon()}
					</button>
				`,
			)}
		</div>
		<div class="content" part="content">${content}</div>
	`;
};

type Opts<P extends object> = ComponentOptions<P> & { styles?: unknown };

export const dialog = <T extends Props = Props>(
	renderer: (host: HTMLElement & T) => unknown,
	{ observedAttributes, styles, ...opts }: Opts<T> = {},
) =>
	component<T>(
		(host) => {
			useDialog();
			return renderDialog({
				title: host.heading || host.title,
				content: renderer(host),
				styles,
				closeable: host.closeable,
			});
		},
		{
			observedAttributes: [
				'title',
				'heading',
				'manual-focus',
				'unmovable',
				'closeable',
				...(observedAttributes ?? []),
			] as ComponentOptions<T>['observedAttributes'],
			...opts,
		},
	);
