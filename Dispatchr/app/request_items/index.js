import * as actions from './actions';
import { reducer, initialState } from './reducer';
import saga from './saga';
import component from './component';
import { name } from './__init__';

export {
  name,
  actions,
  reducer,
  saga,
  initialState,
  component
};
