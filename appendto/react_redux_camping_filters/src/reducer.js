import {Map} from 'immutable';

function getFilterIndex(state, itemId) {
  return state.get('filters').findIndex(
    (item) => item.get('id') === itemId
  );
}

function getMarkerIndex(state, itemId) {
  return state.get('markers').findIndex(
    (item) => item.get('title') === itemId
  );
}

function setState(state, newState) {
  return state.merge(newState);
}

function markerClick(state, marker) {
  // get marker info
  // update text in details window
  console.log('markerClick in reducer')
  return state
}

function getFilters(state, filterIndex) {
  return state.get('filters')
    .get(filterIndex)
    .update('inuse', inuse => inuse === false ? true : false);
}

function updateMarker(state, markerIndex, mapOnVal) {
  return state.get('markers')
    .get(markerIndex)
    .update('mapOn', mapOn => mapOnVal);
}

function changeFilter(state, filter) {
  let filterIndex = getFilterIndex(state,filter)
  const updatedFilter = getFilters(state, filterIndex)
  let updatedFilters = state.get('filters')
  updatedFilters = updatedFilters.set(filterIndex, updatedFilter)

  let active_filters = updatedFilters.filter(
    item => item.get('inuse') === true
  )

  let markers = state.get('markers')
  let updatedMarkers = markers
  markers.forEach(marker => {
    let markerIndex = getMarkerIndex(state, marker.get('title'))
    let mapOn = true
    active_filters.forEach(item => {
      if (marker.get('properties').get(item.get('id')) !== true) {
        mapOn = false
      }
    })
    const updatedMarker = updateMarker(state, markerIndex, mapOn)
    updatedMarkers = updatedMarkers.set(markerIndex, updatedMarker)
  })
  console.log(updatedMarkers)
  //return state.update('filters', filters => updatedFilters);
  return state.merge(Map({
    'filters': updatedFilters,
    'markers': updatedMarkers
  }))
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'CHANGE_FILTER':
        return changeFilter(state, action.filter);
    case 'MARKER_CLICK':
        return markerClick(state, action.marker)
    default:
      return state
  }
}
