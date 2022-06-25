import { BaseThunkType, InferActionsTypes } from "../store"

const initialState = {

}

const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsTypes): ProfileStateType => {
    switch(action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,
                
        //     }


        default: return state
    }
}




export const profileActions = {
    someAction: () => (
        {type: 'someType'} as const
    ),
}


// export const someThunk = (): BaseThunkType<ProfileActionsTypes> => async (dispatch) => {
//     await dispatch(...)
//     dispatch(...)
// }



export default profileReducer

type ProfileStateType = typeof initialState
export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>