import React, { Component } from 'react';
import EventService from "../../../service/event.service"

import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';


class Maps extends Component {

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


    // componentDidMount = () => {

    //     const eventID = this.props._id

    //     this.eventService
    //         .getOneEvent(eventID)
    //         .then(res => {
    //             console.log(res.data)
    //             this.setState({ event: res.data })
    //         })
    //         .catch(err => console.log(err))
    // }


    render() {


        return (
            <>


                <GoogleMap
                    defaultZoom={15}
                    defaultCenter={{ lat: parseFloat(this.state.event.latitude), lng: parseFloat(this.state.event.longitude) }}
                />

                <Marker
                    position={{ lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude) }}
                    name={this.props.name}
                />


            </>
        )
    }
}

export default withScriptjs(withGoogleMap(Maps))