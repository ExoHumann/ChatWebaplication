import React, {useState} from 'react'
import {Nav, Tab} from 'react-bootstrap'

import Home from './Home'
import Contacts from './Contacts'
import Conversations from './Conversations'

const CONVERSATIONS_KEY = "conversations"
const CONTACTS_KEY = "contacts"
const HOME_KEY = "home"

export default function Sidebar () {
const [activeKey, setActiveKey] = useState(HOME_KEY)
const [modalOpen, setModalOpen] = useState(false)
const homeOpen = activeKey === HOME_KEY


return (
  
  <div style={{ width: '250px' }} className="d-flex flex-column">
  <Nav Nav variant="pills" className="justify-content-center flex-column">
  <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        
  <Nav.Item><Nav.Link eventKey={HOME_KEY}>Home</Nav.Link></Nav.Item>

  <Nav.Item><Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link></Nav.Item>

  <Nav.Item><Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link></Nav.Item>

  <Tab.Content>
  <Tab.Pane eventKey={HOME_KEY}> <Home /> </Tab.Pane>
  </Tab.Content>
  <Tab.Content>
    <Tab.Pane eventKey={CONTACTS_KEY}> <Contacts /> </Tab.Pane> 
  </Tab.Content>
  <Tab.Content>
    <Tab.Pane eventKey={CONVERSATIONS_KEY}> <Conversations /> </Tab.Pane>
  </Tab.Content>
  </Tab.Container>
  </Nav>
  
  </div>
);
}
