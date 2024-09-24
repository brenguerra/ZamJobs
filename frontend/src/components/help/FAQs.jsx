import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(-1)
  return (
    <>
    <Accordion styled fluid>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={()=>setActiveIndex(0)}
        >
          <Icon name='dropdown' />
          What is a Zamjobs?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            Zamjobs is a community driven freelance market for local residents looking for workers or workers looking for a job their area.
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={()=>setActiveIndex(1)}
        >
          <Icon name='dropdown' />
          How do I earn on Zamjobs
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            You can earn by applying to jobs, there is no limit to how many jobs you can apply to.
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={()=>setActiveIndex(2)}
        >
          <Icon name='dropdown' />
          How can i earn on zamjobs??
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            It really depends on how many clients you can get, your schedule or the clients budget.
          </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={()=>setActiveIndex(3)}
        >
          <Icon name='dropdown' />
          Is Zamjobs free?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <p>
           Zamjobs is free for workers and local residents for now.
          </p>
        </Accordion.Content>
      </Accordion>

    </>
  )
}

export default FAQs