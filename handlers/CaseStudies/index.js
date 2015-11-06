/* @flow */
import React from 'react';
import Hero from 'Hero';
import CaseStudiesContent from 'CaseStudiesContent';
import {Resolver} from 'react-resolver';
import api from 'api';
import lookup from 'lookup';

class CaseStudies extends React.Component {
  render(): ?ReactElement {
    var heroInfo = this.props.heroInfo[0];

    var metaTags = [
      {name: 'title', content: heroInfo.metaTitle},
      {name: 'description', content: heroInfo.metaDescription},
    ];

    return (
      <div className="CaseStudies">
        <Hero color="black" 
          image={lookup(heroInfo, 'image.fields.file.url') || '/public/images/hero-default.png'}
          videos={lookup(heroInfo, 'videos')}
          poster={lookup(heroInfo, 'poster.fields.file.url')}
          title={heroInfo.title} 
          subtitle={lookup(heroInfo, 'subtitle')}
          metaTags={metaTags} />
        <CaseStudiesContent />
      </div>
    );
  }
}

CaseStudies.propTypes = {};

CaseStudies.displayName = 'CaseStudies';

export default Resolver.createContainer(CaseStudies, {
  resolve: {
    heroInfo() {
      return api(`contentful/hero/work`);
    },
  },
});
