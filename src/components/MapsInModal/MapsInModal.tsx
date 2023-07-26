import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
  Popup,
  Marker,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapsInModal.scss";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const redOptions = { color: "red" };

interface MapProps {
  lat: string;
  long: string;
  route: string;
}
const MapsInModal: React.FC<MapProps> = ({ lat, long, route }) => {
  const position: [number, number] = [parseFloat(lat), parseFloat(long)];
  const parsedRoutes = JSON.parse(route);
  const endPoint = parsedRoutes[parsedRoutes.length - 1];
  return (
    <div className="map">
      <h2 className="modal__title">Area Map</h2>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
      >
        <LayersControl>
          <LayersControl.BaseLayer name="Google Satelite" checked={true}>
            <LayerGroup>
              <TileLayer
                attribution='<a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">GoogleMaps</a> contributors'
                url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
              />
              <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <Marker position={position}>
            <Popup>Trailhead start</Popup>
          </Marker>
          <Marker position={endPoint}>
            <Popup>Ski area: final destination</Popup>
          </Marker>
          <Polyline pathOptions={redOptions} positions={parsedRoutes} />
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapsInModal;
