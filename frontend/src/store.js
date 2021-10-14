import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// user reducers
import {
  userLoginReducer,
  userDetailsReducer,
} from './redux/reducers/userReducers'

// event reducers
import {
  createEventRequestReducer,
  getEventRequestStatusReducer,
  getAllEventsRequestsReducer,
  updateEventRequestStatusReducer,
} from './redux/reducers/eventFlowReducers'

// client reducer
import { getClientReducer } from './redux/reducers/clientReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  createEventRequest: createEventRequestReducer,
  getEventReqStatus: getEventRequestStatusReducer,
  getAllEventsRequests: getAllEventsRequestsReducer,
  updateEventRequestStatus: updateEventRequestStatusReducer,
  getClient: getClientReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const eventRequestInfoFromStorage = localStorage.getItem('eventRequestInfo')
  ? JSON.parse(localStorage.getItem('eventRequestInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  createEventRequest: { eventRequestInfo: eventRequestInfoFromStorage },
  getEventReqStatus: { eventRequestInfoByStatus: [] },
  getEventRequestStatus: { eventsRequestsInfo: [] },
  getClient: { clientInfo: {} },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
