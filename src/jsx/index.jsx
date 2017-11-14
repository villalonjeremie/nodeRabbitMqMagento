import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Hello React Coucou YOYOYO coucou couo!</p>;
  }
}

render(<App/>, document.getElementById('main'));