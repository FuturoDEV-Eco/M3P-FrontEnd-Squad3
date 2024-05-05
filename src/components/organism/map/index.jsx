import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"


export default function MapColetas() {
    return (
        <div style={{ height: "500px" }}>
        <MapContainer center={ [-27.5969, -48.5495]} zoom={10}>
            <TileLayer 
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
        </div>
    )
}