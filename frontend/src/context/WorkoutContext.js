import React, { useReducer } from 'react'
import { createContext } from 'react'

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT': 
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.filter(workout => workout._id !== action.payload)
              };
        default: 
            return state
    }        
}

export const WorkoutsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null,
    })

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )

}