import App from './App.svelte';
import * as _ from 'lodash';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
})

export default app;
