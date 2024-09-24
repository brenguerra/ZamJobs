import React from 'react';
import { Tab } from 'semantic-ui-react';
import ClientHelp from '../components/help/ClientHelp';
import FAQs from '../components/help/FAQs';
import WorkerHelp from '../components/help/WorkerHelp';

const panes = [
  { menuItem: 'Clients', render: () =>
  <Tab.Pane>
    <ClientHelp />
  </Tab.Pane> },
  { menuItem: 'Workers', render: () =>
  <Tab.Pane>
    <WorkerHelp />
  </Tab.Pane> },
  { menuItem: 'FAQs', render: () =>
  <Tab.Pane>
    <FAQs />
  </Tab.Pane> },
]

function Help() {
  return (
    <>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </>
  )
}

export default Help