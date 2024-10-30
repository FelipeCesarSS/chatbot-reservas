import React, { useEffect, useState } from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    const [locations, setLocations] = useState([]);
    const center = [-9.66625, -35.7351];

    useEffect(() => {
        const fetchTouristSpots = async () => {
            try {
                const query = `
                    [out:json];
                    node(around:10000, -9.66625, -35.7351)["tourism"];
                    node(around:10000, -9.66625, -35.7351)["amenity"="restaurant"];
                    node(around:10000, -9.66625, -35.7351)["leisure"="beach_resort"];
                    node(around:10000, -9.66625, -35.7351)["historic"="museum"];
                    out;
                `;
                const response = await axios.get(`https://overpass-api.de/api/interpreter?data=${query}`);
                setLocations(response.data.elements);
            }catch(error){
                console.error(`Error ao locais:`, error);
            }
        };
        fetchTouristSpots();
    },[]);

    const renderMarkers = () => {
        locations.map((location) => {
            <Marker key={location.id} position={[location.lat, location.lon]}>
                <Popup>
                    <strong>{location.tags.name || 'Local'}</strong><br/>
                    Tipo: {location.tags.tourism || location.tags.amenity || location.tags.historic}
                </Popup>
            </Marker>
        });

        return (
            <MapContainer center={center} zoom={13} style={{height: '100vh', width: '100%'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {renderMarkers}
            </MapContainer>
        );
    };
};