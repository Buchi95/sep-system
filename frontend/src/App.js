import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// components
import Header from './components/Header'
import Footer from './components/Footer'

// screens
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import EventRequestScreen from './screens/EventRequestScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/event/request/create' component={EventRequestScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
