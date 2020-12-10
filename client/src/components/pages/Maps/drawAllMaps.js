import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';


class allMaps extends Component {

    constructor(props) {
        super(props)
        this.state = {
            event: {
                name: this.props.name,
                longitude: this.props.longitude,
                latitude: this.props.latitude,
            }
        }

    }

    render() {

        return (
            <>

                <GoogleMap
                    defaultZoom={15}
                    defaultCenter={{ lat: parseFloat(this.state.event.latitude), lng: parseFloat(this.state.event.longitude) }}
                />

                <Marker
                    position={{ lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude) }}
                />

            </>
        )
    }
}

export default withScriptjs(withGoogleMap(allMaps))