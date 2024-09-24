import React from 'react'
import { Icon, Menu, Sidebar} from 'semantic-ui-react'

const AppSidebar = () => {
  return (
    <>
       <Sidebar
          as={Menu}
          icon='labeled'
          vertical
          visible={true}
          width='thin'
        >
          <Menu.Item as='a'>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='gamepad' />
            Games
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='camera' />
            Channels
          </Menu.Item>
      </Sidebar>
    </>
  )
}

export default AppSidebar