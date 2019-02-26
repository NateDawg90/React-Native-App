import { ADD_PLACE, DELETE_PLACE} from './actionTypes';

export const addPlace = (name, location, image) => {
  return dispatch => {
    const placeData = {
      placeName: name,
      location: location
    }
    console.log('storing image!')
    fetch('https://us-central1-awesome-places-232903.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes)
    })
    // fetch('https://awesome-places-1550101760032.firebaseio.com/places.json', {
    //   method: 'POST',
    //   body: JSON.stringify(placeData)
    // })
    // .catch(err => console.log(err))
    // .then(res => res.json())
    // .then(parsedRes => {
    //   console.log(parsedRes);
    // })
  }
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};

