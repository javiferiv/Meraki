import React, { Component } from 'react';
import EventService from "../../../service/event.service"

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

        this.eventService = new EventService()

    }


    render() {


        return (
            <>

                <GoogleMap
                    defaultZoom={12}
                    defaultCenter={{ lat: 40.428637831327386, lng: - 3.6969483107523127, }}
                />

            </>
        )
    }
}

export default withScriptjs(withGoogleMap(allMaps))




