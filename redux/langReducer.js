
export default function langReducer (state=[], action) { // we want our initial state to not return undefined as redux will call at start, so we pass empty array
    switch (action.type) {

        case 'LANGUAGE':
          return [{
                language: action.payload.language
        }];
        

        default:
          return state
        }
}