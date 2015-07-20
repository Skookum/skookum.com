/** @flow */

require('./styles.css');

import React, {Component, PropTypes} from 'react';
import {Resolver} from 'react-resolver';
import MajorSectionElement from 'MajorSectionElement';
import Button from 'Button';
import api from 'api';

var renderCareer: ReactElement = pos => (
  <li className="CareersContent-item">
    <div className="CareersContent-item-segment">
      <div className="CareersContent-meta">{pos.departments[0].name} in {pos.location.name}</div>
      <div className="CareersContent-job-title">{pos.title}</div>
      <p className="CareersContent-description">
        {pos.content.split('&lt;/p&gt;')[0].slice(9).replace(/\&nbsp;/g, '’')}
      </p>
      <Button className="EventsContent-button" href={pos.absolute_url}>Apply Now</Button>
    </div>
  </li>
);

class CareersContent extends Component {
  render(): ?ReactElement {
    var {careers} = this.props;
    if (careers.length === 0) {
      return (
        <div className="CareersContent">
          <MajorSectionElement
            title="In order to create real value you must put people at the center of everything"
            content="We never do the same thing twice. We build business critical applications. We tackle problems we don’t always know how to solve. Every day, every project is a new challenge to conquer. You will have the opportunity to push yourself and grow from offices in beautiful Charlotte, NC and Denver, CO. We believe in work/life balance and offer a ton of competitive perks." />
            <ul className="CareersContent-list">
              <li className="CareersContent-item">
                <div className="CareersContent-item-segment">
                  <div className="CareersContent-job-title">There are no positions available at this time.</div>
                </div>
              </li>
            </ul>
        </div>
      );
    }

    return (
      <div className="CareersContent">{careers.map(renderCareer)}</div>
    );
  }
}

CareersContent.propTypes = {
  careers: PropTypes.arrayOf(
    // from the Greenhouse XML feed
    PropTypes.shape({
      id: PropTypes.number,
      content: PropTypes.string,
      location: PropTypes.shape({name: PropTypes.name}),
      /* eslint-disable */
      updated_at: PropTypes.string, // yyyy-mm-yyThh:mm:ssZ
      absolute_url: PropTypes.string,
      /* eslint-enable */
      departments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
    })
  ),
};

CareersContent.displayName = 'CareersContent';

export default Resolver.createContainer(CareersContent, {
  resolve: {
    careers() {
      return api(`careers`);
    },
  },
});
