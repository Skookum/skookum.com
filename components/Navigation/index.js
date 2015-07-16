/** @flow */

require('./styles.css');

import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import Logo from 'Logo';

var PRIMARY = [
  ['home', 'Home'],
  ['services', 'Services'],
  ['case-studies', 'Case Studies'],
  //['culture', 'Culture'],
  ['careers', 'Careers'],
  ['contact', 'Contact'],
];

var SECONDARY = [
  ['blog', 'Blog'],
  ['open-source', 'Open Source'],
  ['events', 'Events'],
];

var renderNavigation = (list, props) => (
  <ul className="Navigation-list">
    {list.map(n => (
      <li className="Navigation-item" key={n[0]}>
        <Link className="Navigation-link" to={n[0]} onClick={props.onClick}>{n[1]}</Link>
      </li>
    ))}
  </ul>
);

class Navigation extends Component {
  render(): ?ReactElement {
    var {visible} = this.props;
    var className = `Navigation ${visible ? 'is-visible' : 'is-not-visible'}`;

    return (
      <div className={className}>
        <Link to="home" onClick={this.props.onClick}>
          <Logo style={{position: 'absolute', top: '0.5em', left: '0.5em', width: 32, margin: '0.25em'}} color="#fff" />
        </Link>
        <div className="Navigation-header">About Skookum</div>
        {renderNavigation(PRIMARY, this.props)}
        <div className="Navigation-divider" />
        <div className="Navigation-header">Community</div>
        {renderNavigation(SECONDARY, this.props)}
        <hr className="Navigation-hr" />
        <div className="Navigation-socials">
          <a className="Navigation-sublink" href="https://www.twitter.com/skookum">Twitter</a>
          <a className="Navigation-sublink" href="https://www.linkedin.com">LinkedIn</a>
          <a className="Navigation-sublink" href="https://www.github.com/skookum">GitHub</a>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Navigation;
