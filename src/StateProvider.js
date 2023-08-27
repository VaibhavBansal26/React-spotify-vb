import React from 'react';
import {createContext,useContext,useReducer} from 'react';

//creation of Data layer
export const StateContext = createContext();

export const StateProvider = ({initialstate,reducer,children}) => (
    <StateContext.Provider value={useReducer(reducer,initialstate)}>
        {children}
    </StateContext.Provider>
)

//Get data out of datalayer
export const useStateValue = () => useContext(StateContext);