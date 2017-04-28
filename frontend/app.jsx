// Solely because of Safari's fetch sucking
import 'whatwg-fetch';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Application from '../lib/silicondzor';

render((<Router><Application/></Router>), document.querySelector('#container'));
