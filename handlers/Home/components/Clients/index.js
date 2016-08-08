/** @flow */

require('./styles.css');

import React, {Component, PropTypes} from 'react';
import {Resolver} from 'react-resolver';
import api from 'api';
import lookup from 'lookup';

class Clients extends Component {
  render(): ?ReactElement {
    return (
      <div className="HomeClients">
        <div className="HomeClients-content">
          <h2 className="HomeClients-title">
            For over a decade
          </h2>
          <div className="HomeClients-description">
            we have helped ambitious business and technology teams differentiate, compete and win.
          </div>
        </div>
        <div className="HomeClients-clients">
          {this.props.clients.items.map(n => (
            <div className="HomeClients-client" key={n.name}>
              <div className="HomeClients-context">
                {lookup(n, 'description') || 'Nothing to see here, move along!'}
              </div>
              <div className="HomeClients-image-container">
                <img className="HomeClients-img" title={n.name} src={n.image[0].fields.file.url} alt={n.image[0].fields.title}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Clients.displayName = 'Clients';

Clients.propTypes = {
  clients: PropTypes.any.isRequired,
};

export default Resolver.createContainer(Clients, {
  resolve: {
    clients() {
      return api(`contentful?content_type=client&limit=8`);
    },
  },
});
