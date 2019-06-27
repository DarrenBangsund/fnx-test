const defaultState = {
    images: []
}

function imgur(state = defaultState, action) {
    console.log(action);
    switch (action.type) {
        case 'FETCH_IMAGES':
            const images = state.images.concat(action.payload);
            const newState = {...state, images};

            return newState;
        default: 
            return state
    }
}

export default imgur;

//SELECTORS

export function getImagesFromState(state) {
    return state.imgur.images;
}