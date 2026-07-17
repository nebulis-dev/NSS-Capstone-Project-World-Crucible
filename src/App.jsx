import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Hub } from './pages/Hub'
import { CharacterCollection } from './pages/character/characterCollection'
import { CharacterCreation } from './pages/character/characterCreation'
import { CharacterProfile } from './pages/character/characterProfile'
import { CharacterEditor } from './pages/character/characterEdit'
import { GroupCollection } from './pages/group/groupCollection'
import { GroupCreation } from './pages/group/groupCreation'
import { GroupProfile } from './pages/group/groupProfile'
import { GroupEditor } from './pages/group/groupEdit'
import { WorldCollection } from './pages/world/worldCollection'
import { WorldCreation } from './pages/world/worldCreation'
import { WorldProfile } from './pages/world/worldProfile'
import { WorldEditor } from './pages/world/worldEdit'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hub/>}/>
        <Route path="/characterCreation" element={<CharacterCreation/>}/>
        <Route path="/characterCollection" element={<CharacterCollection/>}/>
        <Route path="/characterProfile" element={<CharacterProfile/>}/>
        <Route path="/characterEditor" element={<CharacterEditor/>}/>
        <Route path="/groupCollection" element={<GroupCollection/>}/>
        <Route path="/groupCreation" element={<GroupCreation/>}/>
        <Route path="/groupProfile" element={<GroupProfile/>}/>
        <Route path="/groupEditor" element={<GroupEditor/>}/>
        <Route path="/worldCollection" element={<WorldCollection/>}/>
        <Route path="/worldCreation" element={<WorldCreation/>}/>
        <Route path="/worldProfile" element={<WorldProfile/>}/>
        <Route path="/worldEditor" element={<WorldEditor/>}/>
      </Routes>
    </Router>
  )

}

export default App
