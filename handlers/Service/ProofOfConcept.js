/** @flow */
import React from 'react';
import Hero from 'Hero';
import ServiceIntro from 'ServiceIntro';
import ServiceSection from 'ServiceSection';
import ServiceSectionOfPercentages from 'ServiceSectionOfPercentages';
import ServiceUnorderedListSection from 'ServiceUnorderedListSection';
import Typography from 'Typography';

class ProofOfConcept extends React.Component {
  render(): ReactElement {
    var service = 'proof-of-concept';
    var color = 'yellow';

    return (
      <div className="Service">
        <Hero color="yellow" image="/public/images/sputnick-engineer.png" title="Proof of Concept" />
        <ServiceIntro color={color} service={service}>All you need is an idea, and sometimes not even that. If you have an inkling that your business could run better, be more efficient, generate more profits, or make a competitive statement with modern technology, we can handle the rest. Through interviews, joint ideation, storyboards and estimation, we give you an informed, fresh perspective to help you prioritized concepts for further investment.</ServiceIntro>
        <ServiceSectionOfPercentages
          color={color}
          items={[
            {percentage: 93, description: 'of enterprise leaders see long-term success dependent on innovation.'},
            {percentage: 80, description: 'of enterprise leaders say their innovation strategy is competitively failing.'},

          ]} />

        <ServiceUnorderedListSection
          title="We Help You"
          items={[
            {title: 'Mitigate Investment Risk', description: 'When a product strategy is based on discrete technical assumptions, it is smart to validate components ahead of larger investments. Through rapid prototyping, we explore technology hurdles, identify dependencies and show you what is possible before engineering a full solution.'},
            {title: 'Inform Production Direction', description: 'Technical unknowns affect a product’s usability. The path to delivering great value and the desired business results is dependent on the right technology decisions. We test the fundamental theories upfront so that you can maximize your roadmap.'},
            {title: 'Achieve Buy-in', description: 'There is nothing quite as effective as showing a working demo of key innovations to win over cross-functional stakeholders. While slides and documentation may further your position, a working example is the ultimate testament. We equip you with the tools to advance your initiative within your organization and accelerate its priority.'},
          ]} />
      </div>
    );
  };
}

export default ProofOfConcept;

