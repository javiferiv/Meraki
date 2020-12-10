import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';


class allMaps extends Component {

    constructor(props) {
        super(props)
        this.state = {
            event: [
               this.props.name,
                this.props.longitude,
              this.props.latitude,
            ],
            eventList: "",
        }
    }


    // componentDidMount = () => {


    //     const eventoDes = { ...this.props[0] }
    //     const newLongitude = eventoDes.longitude
    //     const newLatitude = eventoDes.latitude
    //     console.log(newLongitude)
    //     console.log(newLatitude)
        


    // }




    render() {


        return (
            <>

                <GoogleMap
                    defaultZoom={12}
                    defaultCenter={{ lat: 40.428637831327386, lng: - 3.6969483107523127, }}
                />
                
                {
                    
          this.state.event.map(elm =>
                <Marker
                    position={{ lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude) }}

              />
              
          )}

            </>
        )
    }
}

export default withScriptjs(withGoogleMap(allMaps))


// {

//           this.state.events.map(elm =><MapMarker
//             googleMapURL={mapURL}
//             containerElement={<div style={{ height: "400px" }} />}
//             mapElement={<div style={{ height: "100%" }} />}
//             loadingElement={<p>Cargando</p>}
//             {...elm}
//         />
//     )
// } * /}




