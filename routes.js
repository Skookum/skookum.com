/** @flow */
import React from 'react';
import {DefaultRoute, Route, NotFoundRoute} from 'react-router';

import App from './handlers/Base';
import Blog from'./handlers/Blog';
import BlogArticle from'./handlers/BlogArticle';
import Careers from'./handlers/Careers';
import CaseStudies from'./handlers/CaseStudies';
import CaseStudyArticle from'./handlers/CaseStudyArticle';
import Contact from'./handlers/Contact';
import Culture from'./handlers/Culture';
import Events from'./handlers/Events';
import Home from'./handlers/Home';
import NotFound from './handlers/NotFound';
import OpenSource from'./handlers/OpenSource';
import Services from './handlers/Services';
import Service from './handlers/Service';
import StyleGuide from './handlers/StyleGuide';
import InnovationCamp from './handlers/InnovationCamp';

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route path="work">
      <Route name="study-article" path=":slug" handler={CaseStudyArticle} />
      <DefaultRoute name="work" handler={CaseStudies} />
    </Route>
    <Route path="events">
      <Route name="events-location" path=":location" handler={Events} />
      <DefaultRoute name="events" handler={Events} />
    </Route>
    <Route path="blog">
      <Route name="tag" path="tags/:tag" handler={Blog} />
      <Route name="blog-article" path=":slug" handler={BlogArticle} />
      <DefaultRoute name="blog" handler={Blog} />
    </Route>
    <Route name="careers" path="careers" handler={Careers} />
    <Route name="culture" path="culture" handler={Culture} />
    <Route name="contact" path="contact" handler={Contact} />
    <Route name="open-source" path="open-source" handler={OpenSource} />
    <Route name="capabilities" path="capabilities">
      <Route name="service" path=":service" handler={Service} />
      <DefaultRoute handler={Services} />
    </Route>
    <Route name="styleguide" path="styleguide" handler={StyleGuide} />
    <Route name="innovation-camp" path="innovation-camp" handler={InnovationCamp} />
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

export default routes;
