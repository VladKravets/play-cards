import { BaseThunkType, InferActionsTypes } from "../store"

const initialState = {

}

const newPasswordReducer = (state: NewPasswordStateType = initialState, action: NewPasswordActionsTypes): NewPasswordStateType => {
    switch(action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,
                
        //     }


        default: return state
    }
}




export const newPasswordActions = {
    someAction: () => (
        {type: 'someType'} as const
    ),
}


// export const someThunk = (): BaseThunkType<NewPasswordActionsTypes> => async (dispatch) => {
//     await dispatch(...)
//     dispatch(...)
// }



export default newPasswordReducer

type NewPasswordStateType = typeof initialState
export type NewPasswordActionsTypes = InferActionsTypes<typeof newPasswordActions>