import {useState, useEffect} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function DashboardSideNav() {
  const [activeItem, setActiveItem] = useState('')

  const handleItemClick = (e) => {
    setActiveItem(e.target.name)
  }
  useEffect(()=> {

  }, [activeItem])
  return (    <Menu vertical>
    <Menu.Item>
      <Menu.Header>Shortcuts</Menu.Header>
      <Menu.Menu>
        <Link to= '/jobs'>
        <Menu.Item
          as='span'
          name='Jobs'
          active={activeItem === 'Jobs'}
          onClick={ handleItemClick}
        />
        </Link>
        <Link to= '/user/jobs'>
          <Menu.Item
            as='span'
            name='My Jobs'
            active={activeItem === ' jobs'}
            onClick={ handleItemClick}
          />
        </Link>
        <Link to= '/jobs/post'>
          <Menu.Item
            as='span'
            name='Post Job'
            active={activeItem === 'Post Job'}
            onClick={ handleItemClick}
          />
        </Link>
      </Menu.Menu>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header>Support</Menu.Header>

      <Menu.Menu>
      <Link to= '/help'>
        <Menu.Item
          as='span'
          name='Help'
          active={activeItem === 'help'}
          onClick={ handleItemClick}
        />
        </Link>
      </Menu.Menu>
    </Menu.Item>
  </Menu>
  )
}

export default DashboardSideNav