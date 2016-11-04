import * as actions from './actions'
import reducer, { initialState } from './reducer'
import component from './component';
import { name } from './__init__'

export default {
  name,
  actions,
  reducer,
  initialState,
  component
};
