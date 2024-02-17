import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import Users from './components/Users'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
import HomePage from './components/Homepage' // Import the HomePage component
import Usersinclub from './components/Usersinclub'
import CreateClub from './components/CreateClub'


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Route to the HomePage component */}
        <Route path="/clubs/:id" element={<Usersinclub />} /> {/* Route for displaying users in a club */}
        <Route path='/users' element={<Users />}></Route>
        <Route path='/createuser' element={<CreateUser />}></Route>
        <Route path='/createclub' element={<CreateClub />}></Route>
        <Route path='/edit/:id' element={<UpdateUser />}></Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App;
