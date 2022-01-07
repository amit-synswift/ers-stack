import React, {useState,useEffect} from 'react';
import ImageHotspots from 'react-image-hotspots'
import ImageMarker, { Marker } from 'react-image-marker';

const AddPoints = () =>{
    const [markers,setMarkers] = useState([]);
    const [hotspots,setHotspots] = useState([]);

    const addMarkers = (marker) => {
        setMarkers([...markers, marker])
        setHotspots([...hotspots,{
            y:marker.top,
            x:marker.left,
            content: <span>HotSpot sadlasd</span>
        }])
    }
        return (
            <div>
                <div className="imageMarker">
                    <ImageMarker
                        src="https://raw.githubusercontent.com/filipecorrea/react-image-hotspots/master/src/landscape.jpg"
                        markers={markers}
                        onAddMarker={(marker) => addMarkers(marker)}
                    />
                </div>

                <ImageHotspots
                    src='https://raw.githubusercontent.com/filipecorrea/react-image-hotspots/master/src/landscape.jpg'
                    alt='Sample image'
                    hotspots={
                        hotspots
                    }
                />
            </div>

        );
}

export default AddPoints;
