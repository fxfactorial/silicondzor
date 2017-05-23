// Solely because of Safari's fetch sucking
import 'whatwg-fetch';
import App from '../lib/silicondzor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom';

render(
	<AppContainer>
		<Router>
			<App/>
		</Router>
	</AppContainer>,
	document.querySelector('#container'));

if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../lib/silicondzor', () => {
        const NewApp = require('../lib/silicondzor').default;
        render(
				<AppContainer>
					<Router>
						<NewApp/>
					</Router>
				</AppContainer>,
				document.querySelector('#container'));
    });
}