import React, { useState, useEffect } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';

const ImageMarkerContainer = () => {

    return (
        <ImageMarker
            src='https://raw.githubusercontent.com/filipecorrea/react-image-hotspots/master/src/landscape.jpg'
            markers={markers}
            onAddMarker={(marker) => addMarkers(marker)}
        />

    );
};

export default ImageMarkerContainer;
