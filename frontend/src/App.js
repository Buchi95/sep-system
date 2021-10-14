import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// components
import Header from './components/Header'
import Footer from './components/Footer'

// screens auth
import LoginScreen from './screens/LoginScreen'
// home screen
import HomeScreen from './screens/HomeScreen'
// profile screen
import ProfileScreen from './screens/ProfileScreen'
// event request screens
import EventRequestScreen from './screens/eventrequest/EventRequestScreen'
import EventRequestReviewScreen from './screens/eventrequest/EventRequestReviewScreen'
import EventRequestDetailScreen from './screens/eventrequest/EventRequestDetailScreen'
// event screens
import EventSpecificationScreen from './screens/event/EventSpecificationScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/event/request/create' component={EventRequestScreen} />
          <Route
            path='/event/request/review/:id'
            component={EventRequestReviewScreen}
          />
          <Route
            path='/event/request/detail/:id'
            component={EventRequestDetailScreen}
          />
          <Route
            path='/event/specification'
            component={EventSpecificationScreen}
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
