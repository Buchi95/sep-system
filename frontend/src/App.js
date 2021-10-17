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
import EventRequest from './screens/eventrequest/EventRequest'
import EventRequests from './screens/eventrequest/EventRequests'
import RequestDetail from './screens/eventrequest/RequestDetail'
// event creation screen and event planning screens
import EventSpecification from './screens/eventPlanning/EventSpecification'
import Events from './screens/eventPlanning/Events'
import EventDetail from './screens/eventPlanning/EventDetail'
import SubTasks from './screens/eventPlanning/SubTasks'
import CreateSubTeamTasks from './screens/eventPlanning/CreateSubTeamTasks'
import MyTasks from './screens/eventPlanning/MyTasks'
import EditTask from './screens/eventPlanning/EditTask'
import ReviewSubTask from './screens/eventPlanning/ReviewSubTask'
// requests screen
import FinancialRequest from './screens/resources/FinancialRequest'
import RecruitmentRequestScreen from './screens/resources/RecruitmentRequest'
import ViewFinancialRequests from './screens/resources/ViewFinancialRequests'
import ViewStaffRequests from './screens/resources/ViewStaffRequests'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/event/request/create' component={EventRequest} exact />
          <Route path='/event/requests/:id' component={EventRequests} exact />
          <Route
            path='/event/request/detail/:id'
            component={RequestDetail}
            exact
          />
          <Route
            path='/event/specification'
            component={EventSpecification}
            exact
          />
          <Route path='/events' component={Events} exact />
          <Route path='/events/detail' component={EventDetail} exact />
          <Route path='/events/subtasks' component={SubTasks} exact />
          <Route
            path='/events/subtasks/create'
            component={CreateSubTeamTasks}
            exact
          />
          <Route
            path='/events/subtasks/review'
            component={ReviewSubTask}
            exact
          />
          <Route path='/tasks' component={MyTasks} exact />
          <Route path='/tasks/edit' component={EditTask} exact />
          <Route path='/financial/request' component={FinancialRequest} exact />
          <Route
            path='/recruitment/request'
            component={RecruitmentRequestScreen}
            exact
          />
          <Route
            path='/requests/budget'
            component={ViewFinancialRequests}
            exact
          />
          <Route path='/requests/staff' component={ViewStaffRequests} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
