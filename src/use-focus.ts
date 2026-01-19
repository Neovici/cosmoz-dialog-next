import { useLayoutEffect } from '@pionjs/pion';
import { useHost } from '@neovici/cosmoz-utils/hooks/use-host';
import type { DialogElement } from './types';

export default () => {
	const host = useHost<DialogElement>(),
		{ manualFocus } = host;
	useLayoutEffect(() => {
		if (!manualFocus && !host.matches(':focus-within')) {
			host.setAttribute('tabindex', '-1');
			host.focus();
			host.removeAttribute('tabindex');
		}
	}, [manualFocus]);
};
