
import { Marker } from 'react-google-maps';


const MarkerReact = ({latitude, longitude})=> {

    const latitudeData = parseFloat(latitude)
    const longitudeData = parseFloat(longitude)
   

    return (
        

        <Marker
            position={{ lat: latitudeData, lng: longitudeData }}
    
        />

    )
}


export default MarkerReact

