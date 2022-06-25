import { BaseThunkType, InferActionsTypes } from "../store"

const initialState = {

}

const cardsReducer = (state: CardsStateType = initialState, action: CardsActionsTypes): CardsStateType => {
    switch(action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,
                
        //     }


        default: return state
    }
}




export const cardsActions = {
    someAction: () => (
        {type: 'someType'} as const
    ),
}


// export const someThunk = (): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
//     await dispatch(...)
//     dispatch(...)
// }



export default cardsReducer

type CardsStateType = typeof initialState
export type CardsActionsTypes = InferActionsTypes<typeof cardsActions>