



const initialState:any = {}


export const reducerExample=(state:InitialStateType=initialState,action:any):InitialStateType=>{
    switch (action.type) {
        case  '' :
            return
        default:
            return state
    }
}

//actions
export const actionCreator = () => ({type: ''} as const)

//thunks


//types
type InitialStateType = typeof initialState
