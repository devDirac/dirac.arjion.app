import { combineReducers } from "redux";



const appReducer = (state: any = { app: { user: {}, employees: { data: [], detail: {} }, upload: [] } }, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
