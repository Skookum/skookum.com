/** @flow */
import React from 'react';
import Hero from 'Hero';
import ServiceIntro from 'ServiceIntro';
import ServiceSection from 'ServiceSection';
import ServiceSectionOfPercentages from 'ServiceSectionOfPercentages';
import ServiceUnorderedListSection from 'ServiceUnorderedListSection';
import Typography from 'Typography';

class Engineering extends React.Component {
  render(): ReactElement {
    var service = 'engineering';
    var color = 'yellow';

    return (
      <div className="Service">
        <Hero color="yellow" image="/public/images/sputnick-engineer.png" title="Engineering" />
        <ServiceIntro color={color} service={service}>In order to maximize productivity and minimize risk during development, all custom technology projects begin with an Engineering phase. Engineering teams produce user stories, technical strategies and UX designs to inform subsequent Production phases. We interview, observe, hack, sketch and prototype to ensure we’re solving the problem in the most effective way.</ServiceIntro>
        <ServiceSectionOfPercentages
          color={color}
          items={[
            {percentage: 41, description: 'of custom software initiatives fail to deliver the expected business value.'},
            {percentage: 80, description: 'of budgets are consumed fixing self-inflicted problems.'},
          ]} />

        <ServiceUnorderedListSection
          title="We Help You"
          items={[
            {title: 'Accelerate Value Generation', description: 'Product development involves the prioritization of limitless options. Without a clear roadmap, scope creep and feature bloat become the enemy of progress. Of the hundreds of things you could do, we’ll pinpoint the subset of features that drive the most value, before coding begins.'},
            {title: 'Control Total Cost of Ownership', description: 'Digital products require maintenance, upgrades, and support. The more complex a product is, the more expensive it is to own. These often hidden costs can escalate quickly. We provide guidance for what you need and not a line of code more, leaving less to break and less to maintain.'},
            {title: 'Avoid Technical Lock-in', description: 'Your ability to adapt is paramount in today’s dynamic, digital climate. We have no proprietary platforms to sell. We find the right technology for the job, implement component-driven architectures, and utilize open source software. We plan for extensibility from the beginning so that you can pivot. Fast.'},
          ]}
          color={color} />


      </div>
    );
  };
}

export default Engineering;


