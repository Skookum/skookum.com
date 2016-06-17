/** @flow */
require('./styles.css');

import React, {PropTypes} from 'react';
import {Resolver} from 'react-resolver';
import Hero from 'Hero';
import ContactForm from 'ContactForm';
import api from 'api';
import lookup from 'lookup';
import {Link} from 'react-router';
import markdown from 'markdown';
import CapabilityHighlights from 'CapabilityHighlights';


class Capability extends React.Component {
  render(): ReactElement {
    var {capability, capabilityHighlights, capabilities} = this.props;
    capability = capability[0];

    var heroImage = lookup(capability.heroImage, 'fields.file.url') || '/public/images/hero-default.png';
    var headlineImage = lookup(capability.headlineImage, 'fields.file.url') || '/public/images/headline-default.png';
    var cite = lookup(capability, 'cite');

    var metaTags = [
      {name: 'title', content: capability.metaTitle},
      {name: 'description', content: capability.metaDescription},
      {name: 'twitter:title', content: capability.metaTitle},
      {name: 'twitter:description', content: capability.metaDescription},
      {property: 'og:title', content: capability.metaTitle},
      {property: 'og:description', content: capability.metaDescription},
      {itemProp: 'name', content: capability.metaTitle},
      {itemProp: 'description', content: capability.metaDescription},
    ];

    return (
      <div className="Capability">
        <Hero childrenPosition="before" color="black" image={heroImage} title={capability.name} metaTags={metaTags}/>
        <div className="Capability-statement" style={{backgroundImage: `url(${headlineImage})`}} >
          <div className="Capability-statement-container">
            <h2 className="Capability-statement-title">
              {capability.headline}
              {cite && <span className="Capability-statement-cite"> - {cite}</span>}
            </h2>
            <div className="Capability-statement-description" dangerouslySetInnerHTML={{__html: markdown(capability.description)}}/>
          </div>
        </div>
        <h2 className="Capability-title">
          {capability.slogan}
        </h2>
        <CapabilityHighlights highlights={capabilityHighlights} />
      </div>
    );
  }
}

Capability.propTypes = {};

Capability.displayName = 'Capability';


Capability.contextTypes = {
  router: PropTypes.func.isRequired,
};


export default Resolver.createContainer(Capability, {
  contextTypes: Capability.contextTypes,

  resolve: {
    capabilityHighlights(props, context) {
      var {capability} = context.router.getCurrentParams();
      return api(`contentful/capability_highlights/${capability}`);
    },
    capability(props, context) {
      var {capability} = context.router.getCurrentParams();
      return api(`contentful/capability/${capability}`);
    },
    capabilities(props, context) {
      return api(`contentful/capabilities`);
    },
  },
});
