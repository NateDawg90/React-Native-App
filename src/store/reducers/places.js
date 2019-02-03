import {ADD_PLACE, SELECT_PLACE, DESELECT_PLACE, DELETE_PLACE} from '../actions/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(), 
          name: action.placeName,
          image: require('../../assets/munich.jpg')
        })
      }
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: state.places.find(place => {
          return place.key === action.placeKey;
        })
      }
    case DESELECT_PLACE:
      return {
        ...state,
        selectedPlace: null
      }
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {return place.key !== state.selectedPlace.key;}),
        selectedPlace: null
      }
    default:
      return state;
  }
};

export default reducer;