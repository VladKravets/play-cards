import { BaseThunkType, InferActionsTypes } from "../store"

const initialState = {

}

const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsTypes): RegistrationStateType => {
    switch(action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,
                
        //     }


        default: return state
    }
}




export const registrationActions = {
    someAction: () => (
        {type: 'someType'} as const
    ),
}


// export const someThunk = (): BaseThunkType<RegistrationActionsTypes> => async (dispatch) => {
//     await dispatch(...)
//     dispatch(...)
// }



export default registrationReducer

type RegistrationStateType = typeof initialState
export type RegistrationActionsTypes = InferActionsTypes<typeof registrationActions>