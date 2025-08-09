import type { GLOBAL_LAYER_SETTINGS } from 'shared/types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const settings: GLOBAL_LAYER_SETTINGS = {
		msg: 'hi from top level layout!'
	};
	return settings;
};
