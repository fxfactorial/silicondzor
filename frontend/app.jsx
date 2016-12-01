import Application from '../lib/silicondzor';
import React from 'react';
import { render } from 'react-dom';
// Solely because of Safari's fetch sucking
import 'whatwg-fetch';

render(<Application/>, document.getElementById('container'));
