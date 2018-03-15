import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeLocation } from '../store'
import axios from 'axios'

class GoogleMap extends React.Component {

  componentDidMount() {

    const { onChangeQuery, userId, initialPosition, date } = this.props

    let map = new window.google.maps.Map(this.map, {
      zoom: 16,
      center: initialPosition
    });

    //set a reference to map to be used in other methods
    this.map = map

    let infoWindow = new window.google.maps.InfoWindow;

    //Get current position with HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here.');
        infoWindow.open(map);
        map.setCenter(pos);

        const query = { location: 'Your current location', userId, date }
        onChangeQuery(pos, query)
      }, function () {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }

    //searchBox
    const input = this.search
    const options = { types: ['geocode'] }
    this.searchBox = new window.google.maps.places.SearchBox(input, options);
    let searchBox = this.searchBox
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
      let places = searchBox.getPlaces();

      let newLocation = { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng(), name: places[0].name }
      let query = { location: places[0].name, userId, date }
      onChangeQuery(newLocation, query)

      if (places.length === 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function (marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new window.google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          console.log('Returned place contains no geometry');
          return;
        }
        var icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new window.google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      })
      map.fitBounds(bounds);
    });

  }

  handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }

  render() {
    return (
      <div>
        <div ref={(map) => { this.map = map }} className="map-container" />
        <input ref={(search) => { this.search = search }} className="search" />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    userId: state.user.id,
    date: state.date
  }
}

const mapDispatch = (dispatch) => {
  return {
    onChangeQuery(position, query) {
      dispatch(changeLocation(position))
      if (query) {
        axios.post(`api/queries`, query)
          .catch(console.error)
      }
    }
  }
}

/**
 * PROP TYPES
 */
GoogleMap.propTypes = {
  initialPosition: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(GoogleMap)
