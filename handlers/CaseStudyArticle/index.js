require('./styles.css');

import React from 'react';
import markdown from 'markdown';
import {Resolver} from 'react-resolver';
import * as fmt from 'fmt';

import api from 'api';
import Hero from 'Hero';
import ShareLinks from 'ShareLinks';

var {PropTypes} = React;

class CaseStudyArticle extends React.Component {
  render(): ?ReactElement {
    var {
      title,
      tags,
      author,
      datePublished,
      body,
      image,
    } = this.props.article;
    var jobTitle = author.title || author.jobTitle;

    var metaTags = [
      {name: 'title', content: title},
      {name: 'description', content: body},
    ];

    return (
      <article className="CaseStudyArticle">
        <Hero
          title="Work"
          image={image.fields.file.url}
          color="black"
          subtitle={title} />
        <div
          className="CaseStudyArticle-content"
          dangerouslySetInnerHTML={{__html: markdown(body)}} />
      </article>
    );
  }
}

CaseStudyArticle.propTypes = {
  article: PropTypes.object.isRequired,
};

CaseStudyArticle.displayName = 'CaseStudyArticle';

export default Resolver.createContainer(CaseStudyArticle, {
  resolve: {
    article(props) {
      return api(`contentful/${props.params.slug}`);
    },
  },
});
