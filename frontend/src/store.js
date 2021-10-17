import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// user reducers
import {
  userLoginReducer,
  userDetailsReducer,
  dptUsersReducer,
  assignTaskReducer,
  getAllTasksReducer,
  editTaskReducer,
} from './redux/reducers/userReducers'

// event reducers
import {
  // event request
  createEventRequestReducer,
  getEventRequestStatusReducer,
  updateEventRequestStatusReducer,
  // event create
  createEventReducer,
  getEventStatusReducer,
  getEventByIdReducer,
} from './redux/reducers/eventFlowReducers'

// client reducer
import {
  getClientReducer,
  getAllClientsReducer,
} from './redux/reducers/clientReducers'

// requests reducer
import {
  extraBudgetReducer,
  extraStaffReducer,
  getExtraBudgetsReducer,
  getExtraStaffsReducer,
} from './redux/reducers/requestReducers'

const reducer = combineReducers({
  // login
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  // event rquest
  createEventRequest: createEventRequestReducer,
  getEventReqStatus: getEventRequestStatusReducer,
  updateEventRequestStatus: updateEventRequestStatusReducer,
  // client
  getClient: getClientReducer,
  getAllClients: getAllClientsReducer,
  // event creation
  createEvent: createEventReducer,
  getEveStatus: getEventStatusReducer,
  getEventById: getEventByIdReducer,
  // dpt users
  dptUsers: dptUsersReducer,
  // assign task
  assignTask: assignTaskReducer,
  getAllTasks: getAllTasksReducer,
  editTask: editTaskReducer,
  // requests
  extraBudget: extraBudgetReducer,
  extraStaff: extraStaffReducer,
  getExtraBudgets: getExtraBudgetsReducer,
  getExtraStaffs: getExtraStaffsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const eventRequestInfoFromStorage = localStorage.getItem('eventRequestInfo')
  ? JSON.parse(localStorage.getItem('eventRequestInfo'))
  : null

const initialState = {
  // login
  userLogin: { userInfo: userInfoFromStorage },
  // event request
  createEventRequest: { eventRequestInfo: eventRequestInfoFromStorage },
  getEventReqStatus: { eventRequestInfoByStatus: [] },
  // client
  getClient: { clientInfo: {} },
  getAllClients: { allClients: [] },
  // event creation
  createEvent: { eventInfo: {} },
  getEveStatus: { eventInfoByStatus: [] },
  getEventById: { eventbyId: {} },
  dptUsers: { dpUsers: [] },
  // task division
  assignTask: { message: {} },
  getAllTasks: { tasks: [] },
  editTask: { message: {} },
  // requests
  extraBudget: { budget: {} },
  extraStaff: { staff: {} },
  getExtraBudgets: { budgets: [] },
  getExtraStaffs: { staffs: [] },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
