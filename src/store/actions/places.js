import { ADD_PLACE, DELETE_PLACE} from './actionTypes';

export const addPlace = (name, location) => {
  return {
    type: ADD_PLACE,
    placeName: name,
    location: location
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};

