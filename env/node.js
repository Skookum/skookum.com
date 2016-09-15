/** @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');
var debug = require('debug')('app startup');

import express from 'express';
import React from 'react';
import Router from 'react-router';
import {Resolver} from 'react-resolver';
import api from '../api';
import routes from '../routes';
import {resources} from './webpack';
import DocMeta from 'react-doc-meta';
import {readFileSync as read} from 'fs';
import {join} from 'path';
import fs from 'fs';

var siteMap = fs.readFileSync(join(process.cwd(), 'sitemap.xml'));

var validPaths = ['blog', 'capabilities', 'work', 'contact', 'events', 'open-source', 'innovation-camp', 'careers'];

var baseRedirects = (req, res, next) => {
  var redirect = false;
  var url = req.url;
  var host = req.headers.host;
  var isStaging = host === '45.55.81.193';
  var subDomainCheck = host.split('.');
  var subDomain = subDomainCheck.length > 2 ? subDomainCheck[0] : '';
  var domain = subDomainCheck.length > 2 ? subDomainCheck.slice(1).join('.') : subDomainCheck.join('.');
  var redirectStr = req.protocol + '://' + domain;

  if (isStaging) {
    redirectStr = req.protocol + '://' + req.headers.host;
  }

  if (url.indexOf('/?') > -1 && url.indexOf('/?') !== 0) {
    redirect = true;
    url = url.replace('/?', '?');
  }

  if (url.indexOf('2013/blog') > -1) {
    redirect = true;
    url = url.substring(url.indexOf('/blog/'));
  }

  if (url !== '/' && url.slice(-1) === '/') {
    redirect = true;
    url = url.substring(0, url.length - 1);
  }

  if (subDomain && !isStaging) {
    redirect = true;
    var validPath = validPaths.find((path) => path === subDomain);
    if (validPath) {
      redirectStr += url.indexOf('/' + validPath) === 0 ? '' : '/' + validPath;
    }
  }

  if (subDomain === 'staging' && isStaging) {
    redirect = false;
  }

  if (redirect) {
    return res.redirect(301, redirectStr + url);
  }
  next();
};

var REDIRECTS = [
  ['case-studies', '/work'],
  ['node', '/open-source'],
  ['hunter-loftis-speaker-info', '/events'],
  ['events/townhall-event-w-mayor-anthony-foxx', '/events'],
  ['josh-oakhurst-speaker-info', '/events'],
  ['events/mobile-apps-from-a-z-a-skookum-digital-workshop', '/events'],
  ['visit-us', '/contact'],
  ['living-and-working-in-charlotte-north-carolina-jobs-relocating', '/careers'],
  ['jobs', '/careers'],
  ['internet-of-things', '/the-internet-of-things-applications'],
  ['it-consulting', '/capabilities'],
  ['blog/tags/net', '/blog/tags/development'],
  ['blog/node-js-you-learn-to-write-the-real-time-web/dsc_4121/', '/blog'],
  ['blog/forget-native-learn-to-write-html5-apps/dsc_4048/', '/blog'],
  ['blog/node-js-you-learn-to-write-the-real-time-web/dsc_4129/', '/blog'],
  ['jobs', '/careers'],
  ['resources/solve-for-bob.pdf', '/public/pdfs/solve-for-bob.pdf'],
  ['press', '/contact'],
  ['directions', '/contact'],
  ['nightshift', 'http://www.nightshiftc.lt'],
  ['why-charlotte', '/careers'],
];

var tmpl = o => read('./index.html', 'utf8')
  .replace('†react†', o.html)
  .replace('†__resolver__†', JSON.stringify(o.data))
  .replace('†head†', resources());

var app = express();

app.use('/api', api);
app.use('/cdn', express.static(join(process.cwd(), 'dist')));
app.use('/public', express.static(join(process.cwd(), 'public')));
app.use('/email', express.static(join(process.cwd(), 'email')));

REDIRECTS.forEach(function(redirect) {
  var [old, current] = redirect;
  app.get('/' + old, function(req, res) {
    res.redirect(301, current);
  });
});

// labs.skookum.com - a large number of visits come to the site through this and should be handled.
app.get('/demos/*', function(req, res) {
  res.redirect('http://labs.skookum.com');
});

// sitemap.xml
app.get('/sitemap.xml', function(req, res) {
  res.type('application/xml; charset=utf-8');
  res.send(siteMap);
});

// Google Webmaster Tools Verification.
app.get('/google81a679ad3faaa5e0.html', function(req, res) {
  res.type('text/html');
  res.send('google-site-verification: google81a679ad3faaa5e0.html');
});

// robots.txt
app.get('/robots.txt', function(req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /info/\n');
});

app.get('*', baseRedirects, function(req, res) {
  var router = Router.create({
    routes: routes,
    location: req.url,
    onAbort(redirect) {
      res.writeHead(303, {Location: redirect.to});
      res.end();
    },
    onError(err) {
      debug('Routing Error');
      debug(err);
    },
  });

  router.run((Handler, state) => {
    var isNotFound = state.routes.some(function(route) {
      return route.isNotFound;
    });

    var status = isNotFound ? 404 : 200;

    return (Resolver.renderToString(<Handler />)
      .then(o => {
        var renderedHtmlString = tmpl({html: o.toString(), data: o.data});
        var meta = DocMeta.rewind().map((tag, index) =>
              React.renderToStaticMarkup(<meta data-doc-meta="true" key={index} {...tag} />));
        renderedHtmlString = renderedHtmlString.replace('†meta†', meta.join(' '));
        res.status(status).send(renderedHtmlString);
      }));
  });
});

debug(`app server starting on ${process.env.PORT}`);
var server = app.listen(process.env.PORT || 4444, function () {
  var host = server.address().address;
  var port = server.address().port;

  debug('%s listening at http://%s:%s', 'The Skookums are', host, port);
});
