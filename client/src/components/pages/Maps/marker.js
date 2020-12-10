
import { Marker } from 'react-google-maps';


const MarkerReact = elm => {

    const latitude = parseFloat(elm.latitude)
    const longitude = parseFloat(elm.longitude)
   

    return (
        

        <Marker
            position={{ lat: latitude, lng: longitude }}
    
        />

    )
}


export default MarkerReact

