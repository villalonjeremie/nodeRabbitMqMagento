import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Exportation de commande!</p>;
  }
}

render(<App/>, document.getElementById('main'));