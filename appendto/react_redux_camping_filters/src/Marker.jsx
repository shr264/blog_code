import React from 'react';

export class Marker extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.renderMarker()
    }
  }

  renderMarker() {
    let {
      map, google, title, properties, description
    } = this.props;

    // if the marker has already been drawn, set map on or null
    if (this.marker) {
      if (!this.props.mapOn) {
        this.marker.setMap(null);
      }
      else {
        this.marker.setMap(map)
      }
      return
    }

    let lat = this.props.position.first()
    let long = this.props.position.last()
    let position = new google.maps.LatLng(lat,long);

    // if marker does not have mapOn, set visibility to none via
    // setting the map to null
    const pref = {
        map: map,
        position: position,
        title:title
      };

    this.marker = new google.maps.Marker(pref);
    this.marker.addListener('click', (e) => {
      this.props.onMarkerClick(this.marker)
    })
  }

  render() {
    return null;
  }
}
