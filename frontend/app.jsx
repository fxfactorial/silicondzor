import Application from '../lib/silicondzor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { autorun, observable } from 'mobx';

import { BrowserRouter as Router } from 'react-router-dom';
// Solely because of Safari's fetch sucking
import 'whatwg-fetch';

render((<Router>
        <Application/>
        </Router>),
       document.getElementById('container'));
