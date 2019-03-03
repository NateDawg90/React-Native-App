import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (name, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found!')
      })
      .then(token => {
        authToken = token;
        return fetch('https://us-central1-awesome-places-232903.cloudfunctions.net/storeImage', {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            "Authorization": "Bearer " + authToken
          }
        })
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: name,
          location: location,
          image: parsedRes.imageUrl
        }
        return fetch('https://awesome-places-232903.firebaseio.com/places.json?auth=' + authToken, {
          method: 'POST',
          body: JSON.stringify(placeData)
        })
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
      })
      .catch(err => {
        dispatch(uiStopLoading());
        alert('Something went wrong creating the place; please try again :/')
        console.log(err)
      })

  }
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch('https://awesome-places-232903.firebaseio.com/places.json?auth=' + token)
      })
      .catch(() => {
        alert('No valid token found!')
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
        console.log('places: ', places)
        dispatch(setPlaces(places));
      })
      .catch(err => {
          alert('Something went wrong. Try again :/');
          console.log(err);
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
  return (dispatch, getState) => {
    dispatch(authGetToken())
    .catch(() => {
      alert('No valid token found!')
    })
      .then(token => {
        dispatch(removePlace(key)); 
        return fetch(
          'https://awesome-places-232903.firebaseio.com/places/' + 
            key + 
            '.json?auth=' + 
            token, 
          {
            method: 'DELETE'
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('deleted')
      })
      .catch(err => {
          alert('Something went wrong. Try again :/');
          console.log(err);
      })

  }

};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  }
}
