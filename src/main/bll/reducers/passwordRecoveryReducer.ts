import { BaseThunkType, InferActionsTypes } from "../store"

const initialState = {

}

const passwordRecoveryReducer = (state: PasswordRecoveryStateType = initialState, action: PasswordRecoveryActionsTypes): PasswordRecoveryStateType => {
    switch(action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,
                
        //     }


        default: return state
    }
}




export const passwordRecoveryActions = {
    someAction: () => (
        {type: 'someType'} as const
    ),
}


// export const someThunk = (): BaseThunkType<PasswordRecoveryActionsTypes> => async (dispatch) => {
//     await dispatch(...)
//     dispatch(...)
// }



export default passwordRecoveryReducer

type PasswordRecoveryStateType = typeof initialState
export type PasswordRecoveryActionsTypes = InferActionsTypes<typeof passwordRecoveryActions>