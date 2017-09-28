import React from 'react';
import shouldPureComponentUpdate from 'react-addons-shallow-compare';
import GoogleMapReact from 'google-map-react';
import controllable from 'react-controllables';

import { StoreObserver } from 'base/StoreObserver.jsx';
import MyPositionsGuidesWithControllableHover from 'layout/user/confHoverGoogleMap.jsx';
import LocationActions from 'actions/Location.js';
import LocationStore from 'stores/user/Location.js';

import {K_CIRCLE_SIZE, K_STICK_SIZE} from 'layout/user/confGoogleMap.js';

class SimpleMap extends StoreObserver {

  constructor(props, context) {
    super(props, context, LocationStore);
    this.state = {
      center: { lat: null, lng: null },
      zoom: props.zoom,
      ownLocation: [],
      guideCoor: null,
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({ center: { lat: nextProps.center.lat, lng: nextProps.center.lng }, zoom: nextProps.zoom })
  }

  componentDidMount() {
    super.componentDidMount();
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ center: { lat: position.coords.latitude, lng: position.coords.longitude } });
        const coor = { x: position.coords.latitude, y: position.coords.longitude}
       LocationActions.sendLocation.defer(coor);
       LocationActions.nearGuide.defer();
   },(err) => {
       console.log('ERROR During getCurrentPosition (' + err.code + '): ' + err.message);
   }, { maximumAge: 3000, timeout: 7000, enableHighAccuracy: true });
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      newState.error = store.error;
    } else {
      newState.ownLocation = store.ownLocation;
      newState.guideCoor = store.guideCoor;
      newState.error = null;
    }
    this.updateState(newState);
  }

  _distanceToMouse(markerPos, mousePos, markerProps) {
    const x = markerPos.x;
    const y = markerPos.y - K_STICK_SIZE - K_CIRCLE_SIZE / 2;
    const distanceKoef = markerProps.text !== 'A' ? 1.5 : 1;

    return distanceKoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
  }

  render() {
    if (this.state.guideCoor) {
      var guideCoordsFinal = [];
      if (this.state.ownLocation) {
        for (var i = 0; i < this.state.guideCoor.length; i++) {
          guideCoordsFinal.push({
            'userId': this.state.guideCoor[i]._id,
            'lat': this.state.guideCoor[i].profile.geo[0],
            'lng': this.state.guideCoor[i].profile.geo[1],
            'text': this.state.guideCoor[i].profile.firstName.charAt(0),
            'own': false,
          })
        }
        guideCoordsFinal.push({
          'userId': this.state.ownLocation.id,
          'lat': this.state.ownLocation.geo[0] || this.state.center.lat,
          'lng': this.state.ownLocation.geo[1] || this.state.center.lng,
          'text': '0',
          'own': true,
        })
      }
      const guides = guideCoordsFinal.map((guide, index) => {

        return (
          <MyPositionsGuidesWithControllableHover
            userId={guideCoordsFinal[index].userId}
            lat={guideCoordsFinal[index].lat}
            lng={guideCoordsFinal[index].lng}
            own={guideCoordsFinal[index].own}
            key={index}
            text={guideCoordsFinal[index].text}
          />
        );
      })
      return (
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyBE5bc1-R4JKw8qENkfQQg9VBM8sZ2GMlY"}}
          center={this.state.center}
          zoom={this.state.zoom}
          hoverDistance={K_CIRCLE_SIZE / 2}
          distanceToMouse={this._distanceToMouse}
          onChange={this._onChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          >
          {guides}
        </GoogleMapReact>
      );
    } else {
      return (
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyBE5bc1-R4JKw8qENkfQQg9VBM8sZ2GMlY"}}
          center={this.state.center}
          zoom={this.state.zoom}
          hoverDistance={K_CIRCLE_SIZE / 2}
          distanceToMouse={this._distanceToMouse}
          onChange={this._onChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          >
          <MyPositionsGuidesWithControllableHover lat={43.79831666666667} lng={0.625095} text={'Z'}/>
        </GoogleMapReact>
      );
    }
  }
}

SimpleMap.defaultProps = {
  center: { lat: 59.95, lng: 30.33 },
  zoom: 9,
  guideCoor: [
    { id: 'A', lat: 43.79831666666667, lng: 0.625095 },
    { id: 'B', lat: 43.79833266666667, lng: 0.625075 },
    { id: 'C', lat: 43.79732266666667, lng: 0.635096 },
  ],
  ownLocation: [43.79839666666667, 0.626995],
};

SimpleMap.propTypes = {
  center: React.PropTypes.object,
  zoom: React.PropTypes.number,
  clickKey: React.PropTypes.string, // @controllable
  onCenterChange: React.PropTypes.func, // @controllable generated fn
  onZoomChange: React.PropTypes.func, // @controllable generated fn
  onHoverKeyChange: React.PropTypes.func, // @controllable generated fn
  guideCoor: React.PropTypes.array,
  ownLocation: React.PropTypes.array,
};

SimpleMap = controllable(SimpleMap, ['center', 'zoom', 'hoverKey', 'clickKey'])
export default SimpleMap;
SimpleMap.prototype.shouldComponentUpdate = shouldPureComponentUpdate;
