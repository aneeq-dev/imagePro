

export default function reducer (state=[], action) { // we want our initial state to not return undefined as redux will call at start, so we pass empty array
    switch (action.type) {

        case 'USER_LOCATION':
          return [{
                latitude: action.payload.location.latitude,
                longitude: action.payload.location.longitude
        }];
        

        default:
          return state
        }
}

