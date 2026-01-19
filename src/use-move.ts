import { useEffect } from '@pionjs/pion';
import { useHost } from '@neovici/cosmoz-utils/hooks/use-host';

import type { DialogElement } from './types';
import relocate from './relocate';

export default () => {
	const host = useHost<DialogElement>(),
		{ unmovable } = host;
	useEffect(() => {
		if (unmovable) {
			return;
		}

		const root = host.shadowRoot;
		if (!root) return;
		const onDown = relocate(host, '.title');

		root.addEventListener('mousedown', onDown as EventListener);
		return () => root.removeEventListener('mousedown', onDown as EventListener);
	}, [unmovable]);
};
