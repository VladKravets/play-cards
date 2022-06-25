import { BaseThunkType, InferActionsTypes } from "../store"

const initialState = {

}

const appReducer = (state: AppStateType = initialState, action: AppActionsTypes): AppStateType => {
    switch(action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,
                
        //     }


        default: return state
    }
}




export const appActions = {
    someAction: () => (
        {type: 'someType'} as const
    ),
}


// export const someThunk = (): BaseThunkType<AppActionsTypes> => async (dispatch) => {
//     await dispatch(...)
//     dispatch(...)
// }



export default appReducer

type AppStateType = typeof initialState
export type AppActionsTypes = InferActionsTypes<typeof appActions>