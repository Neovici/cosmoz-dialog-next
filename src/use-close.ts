import { useEffect, useCallback } from '@pionjs/pion';
import { useHost } from '@neovici/cosmoz-utils/hooks/use-host';
import type { DialogElement } from './types';

export default () => {
	const host = useHost<DialogElement>();
	const close = useCallback(() => {
		host.dispatchEvent(new Event('close'));
		host.onClose?.();
	}, []);
	useEffect(() => {
		const onClose = (e: Event) => {
				e.preventDefault();
				close();
			},
			root = host.shadowRoot!,
			onClick = (e: MouseEvent) =>
				(e.target as HTMLButtonElement).value === 'cancel' && onClose(e),
			onEscape = (e: KeyboardEvent) =>
				!e.defaultPrevented && e.key === 'Escape' && onClose(e);
		root.addEventListener('click', onClick as EventListener);
		document.addEventListener('keydown', onEscape, true);
		return () => {
			root.removeEventListener('click', onClick as EventListener);
			document.removeEventListener('keydown', onEscape, true);
		};
	}, []);
	return { close };
};
