export interface Props {
	onClose?: () => void;
	unmovable?: boolean;
	closeable?: boolean;
	manualFocus?: boolean;
}

export type DialogElement = HTMLElement & Props;
