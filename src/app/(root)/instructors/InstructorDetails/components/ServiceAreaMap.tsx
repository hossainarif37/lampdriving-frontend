import { MapContainer, TileLayer, Polygon, ZoomControl, useMap } from 'react-leaflet';
import { ChevronDown, ChevronUp, Maximize, Maximize2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Separate component to handle map invalidation
function MapResizer() {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 100);

        return () => clearTimeout(timer);
    }, [map]);

    return null;
}

const SYDNEY_CENTER: [number, number] = [-33.886783, 151.193336];
const SERVICE_AREA = [
    [-33.847927, 151.209682],
    [-33.891014, 151.277575],
    [-33.920372, 151.192818],
    [-33.886783, 151.153336],
    [-33.872761, 151.194359],
    [-33.847927, 151.209682],
];


import { FC } from 'react';

interface IServiceAreasProps {
    serviceAreas: string[];
}
const ServiceAreaMap: FC<IServiceAreasProps> = ({ serviceAreas }) => {
    const [mapType, setMapType] = useState<'map' | 'satellite'>('map');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const mapContainerId = 'map-container';
    const [showList, setShowList] = useState(false)

    const toggleFullscreen = useCallback(() => {
        const mapContainer = document.getElementById(mapContainerId);
        if (!document.fullscreenElement && mapContainer) {
            mapContainer.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <>
            <div className=" top-4 left-4 right-4 z-[1000] flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-[12px] font-semibold">Cliff services {serviceAreas.length} suburbs</h2>
                <Button
                    size="sm"
                    // variant="ghost"
                    onClick={() => setShowList(!showList)}
                    className="flex items-center gap-2 text-[10px] capitalize bg-white border text-primary hover:bg-neutral-50"
                >
                    View full list
                    {showList ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>

            {showList && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex flex-wrap gap-2">
                        {serviceAreas.map((area) => (
                            <div
                                key={area}
                                className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                {area}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="w-full h-[400px] rounded-lg overflow-hidden" id={mapContainerId}>
                <div className="relative h-full">
                    <div className="absolute top-4 left-4 z-[1000] bg-white rounded-md shadow">
                        <button
                            className={`px-4 py-2 ${mapType === 'map' ? 'bg-white text-primary font-bold border-r rounded-md' : ''}`}
                            onClick={() => setMapType('map')}
                        >
                            Map
                        </button>
                        <button
                            className={`px-4 py-2 ${mapType === 'satellite' ? 'bg-white text-primary font-bold border-l rounded-md' : ''}`}
                            onClick={() => setMapType('satellite')}
                        >
                            Satellite
                        </button>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-md shadow hover:bg-gray-100 transition-colors"
                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                        {isFullscreen ? <Maximize2 size={20} /> : <Maximize size={20} />}
                    </button>

                    <MapContainer
                        center={SYDNEY_CENTER}
                        zoom={11}
                        className="h-full w-full"
                        zoomControl={false}
                    >
                        <MapResizer />
                        <ZoomControl position="bottomright" />
                        {mapType === 'map' ? (
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                        ) : (
                            <>
                                <TileLayer
                                    url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                    attribution="&copy; Google Maps"
                                />
                                <TileLayer
                                    url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
                                    attribution="&copy; Google Maps"
                                    className="opacity-70"
                                />
                            </>
                        )}
                        <Polygon
                            positions={SERVICE_AREA as [number, number][]}
                            pathOptions={{
                                color: 'transparent',
                                fillColor: '#FFD700',
                                fillOpacity: 0.3,
                            }}
                        />
                    </MapContainer>
                </div>
            </div>
        </>
    );
};

export default ServiceAreaMap;