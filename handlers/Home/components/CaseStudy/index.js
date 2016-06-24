/** @flow */

require('./styles.css');

import React, {Component} from 'react';
import {Resolver} from 'react-resolver';
import Hero from 'Hero';
import api from 'api';
import lookup from 'lookup';
import {Link} from 'react-router';

var {PropTypes} = React;

class CaseStudy extends Component {

  render(): ReactElement {
    var {slug, clientname, summary, image} = this.props.study.items[0];

    return (
      <Hero
        childrenPosition="before"
        color="black"
        image={lookup(image, 'fields.file.url')}
        dontSetMetaTags={true}>
        <div className="HomeCaseStudy-banner">
          <h2 className="HomeCaseStudy-title">
            We help businesses evolve.
          </h2>
          <div className="HomeCaseStudy-description">
            For our clients, this means new revenue, substantial efficiency gains and a better quality of life for employees and customers.
          </div>
        </div>
        <Link key={slug} to="study-article" params={{slug: slug}}>
          <div className="HomeCaseStudy-feature">
            <div className="HomeCaseStudy-feature-container">
              <h3 className="HomeCaseStudy-feature-title">
                {clientname}
              </h3>
              <div className="HomeCaseStudy-feature-description">
                {summary}
              </div>
            </div>
            <div className="HomeCaseStudy-feature-learn">
              Learn more
            </div>
          </div>
         </Link>
      </Hero>
    );
  }
}

CaseStudy.displayName = 'CaseStudy';

CaseStudy.propTypes = {
  study: PropTypes.any.isRequired,
};

export default Resolver.createContainer(CaseStudy, {
  resolve: {
    study() {
      return api(`contentful?content_type=case_study&limit=1&fields.featured=true`);
    },
  },
});
