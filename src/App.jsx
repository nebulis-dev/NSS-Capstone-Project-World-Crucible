import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Hub } from './pages/Hub'
import { StartPage } from './pages/StartPage'
import { Register } from './components/Register'
import { Login } from './components/Login'
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
import { AuthProvider } from './assets/currentUser'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/*Start Pages*/}
          <Route path='/' element={<StartPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/hub" element={<Hub/>}/>

          {/*Character Creation Pages*/}
          <Route path="/worldProfile/:worldId/groupProfile/:groupId/characterCreation" element={<CharacterCreation/>}/>
          <Route path="/worldProfile/:worldId/characterCreation" element={<CharacterCreation/>}/>
          <Route path="/characterCreation" element={<CharacterCreation/>}/>

          {/*Character Profile Page*/}
          <Route path="/characterProfile/:characterId" element={<CharacterProfile/>}/>

          {/*Character Edit Pages*/}
          <Route path="/characterEditor/:characterId" element={<CharacterEditor/>}/>
        
          {/*Character Collection Pages*/}
          <Route path="/worldProfile/:worldId/groupProfile/:groupId/characterCollection" element={<CharacterCollection/>}/>
          <Route path="/worldProfile/:worldId/characterCollection" element={<CharacterCollection/>}/>
          <Route path="characterCollection" element={<CharacterCollection/>}/>

          {/*Group Pages */}
          <Route path="/worldProfile/:worldId/groupCreation" element={<GroupCreation/>}/>
          <Route path="/worldProfile/:worldId/groupProfile/:groupId" element={<GroupProfile/>}/>
          <Route path="/worldProfile/:worldId/groupProfile/:groupId/groupEditor" element={<GroupEditor/>}/>
          <Route path="/worldProfile/:worldId/groupCollection" element={<GroupCollection/>}/>

          {/*World Pages*/}
          <Route path="/worldCreation" element={<WorldCreation/>}/>
          <Route path="/worldProfile/:worldId" element={<WorldProfile/>}/>
          <Route path="/worldProfile/:worldId/worldEditor" element={<WorldEditor/>}/>
          <Route path="/worldCollection" element={<WorldCollection/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )

}

export default App
