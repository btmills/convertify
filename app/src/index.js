import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Converter from './converter';
import App from './app';

window.Converter = Converter;

React.initializeTouchEvents(true);
injectTapEventPlugin();

Converter.initialize().then(() => {

	React.render(
		<App currencies={Converter.currencies} />,
		document.body
	);

});
