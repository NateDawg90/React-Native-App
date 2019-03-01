import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (name, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch('https://us-central1-awesome-places-232903.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => {
      dispatch(uiStopLoading());
      alert('Something went wrong storing the image; please try again :/')
      console.log(err)
    })
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(parsedRes => {
      const placeData = {
        name: name,
        location: location,
        image: parsedRes.imageUrl
      }
      return fetch('https://awesome-places-232903.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
    })
    .catch(err => {
      dispatch(uiStopLoading());
      alert('Something went wrong creating the place; please try again :/')
      console.log(err)
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
    })
  }
};

export const getPlaces = () => {
  return dispatch => {
    fetch('https://awesome-places-232903.firebaseio.com/places.json')
    .catch(err => {
        alert('Something went wrong. Try again :/');
        console.log(err);
      })
    .then(res => res.json())
    .then(parsedRes => {
      const places = [];
      for (let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key: key,
        })
      }
      console.log(places[0])
      dispatch(setPlaces(places));
    })
  }
}

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  }
}

export const deletePlace = key => {
  return dispatch => {
    dispatch(removePlace(key));
    fetch('https://awesome-places-232903.firebaseio.com/places/' + key + '.json' , {
      method: 'DELETE'
    })
    .catch(err => {
        alert('Something went wrong. Try again :/');
        console.log(err);
      })
    .then(res => res.json())
    .then(parsedRes => {
      console.log('deleted')
    })
  }

};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  }
}
