
"use client";
import { FC } from 'react';
import { MapContainer, TileLayer, Polygon, ZoomControl, useMap } from 'react-leaflet';
import { ChevronDown, ChevronUp, Maximize, Maximize2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import suburbsData from '@/constant/sydneySuburbs.json';

// Manual suburb polygon coordinates
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

interface IServiceAreasProps {
    serviceAreas: string[];
}

const ServiceAreaMap: FC<IServiceAreasProps> = ({ serviceAreas }) => {
    const [mapType, setMapType] = useState<'map' | 'satellite'>('map');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const mapContainerId = 'map-container';
    const [showList, setShowList] = useState(false);

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


    function isValidCoordinate(coord: any): coord is { lat: number; lng: number } {
        return typeof coord.lat === 'number' && typeof coord.lng === 'number';
    }

    const mappedCoordinates = serviceAreas.map((area) => {
        const suburb = suburbsData.find(sub => sub.label === area);
        if (suburb && suburb.coordinates) {
            const validCoordinates = suburb.coordinates.filter(isValidCoordinate);

            return {
                name: area,
                coordinates: validCoordinates.map(coord => [coord.lat, coord.lng])
            };
        } else if (!suburb) {
            console.warn(`Suburb "${area}" not found in JSON data.`);
        }

        return null;
    }).filter(Boolean);

    const calculateBounds = () => {
        if (mappedCoordinates.length === 0) return null;

        let minLat = Infinity;
        let maxLat = -Infinity;
        let minLng = Infinity;
        let maxLng = -Infinity;

        mappedCoordinates.forEach(suburb => {
            if (suburb && suburb.coordinates) { // Check if suburb and coordinates exist
                (suburb.coordinates as [number, number][]).forEach(([lat, lng]) => {
                    minLat = Math.min(minLat, lat);
                    maxLat = Math.max(maxLat, lat);
                    minLng = Math.min(minLng, lng);
                    maxLng = Math.max(maxLng, lng);
                });
            }
        });

        return [
            [minLat - 0.02, minLng - 0.02],
            [maxLat + 0.02, maxLng + 0.02]
        ];
    };

    const bounds = calculateBounds();

    return (
        <>
            <div className="top-4 left-4 right-4 z-[1000] flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-[12px] font-semibold">Cliff services {serviceAreas?.length} suburbs</h2>
                <Button
                    size="sm"
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
                        {serviceAreas?.map((area) => (
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
                        bounds={bounds as [[number, number], [number, number]] | undefined}
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
                        {mappedCoordinates.map((suburb, index) =>
                            suburb && suburb.coordinates && (
                                <Polygon
                                    key={index}
                                    positions={suburb.coordinates as [number, number][]}
                                    pathOptions={{
                                        color: '#FFD700',
                                        weight: 2,
                                        fillColor: '#FFD700',
                                        fillOpacity: 0.3,
                                    }}
                                />
                            )
                        )}
                    </MapContainer>
                </div>
            </div>
        </>
    );
};

export default ServiceAreaMap;




// "use client";

// import { FC, useState, useCallback, useEffect } from "react";
// import {
//     MapContainer,
//     TileLayer,
//     Polygon,
//     ZoomControl,
//     useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, ChevronUp, Maximize, Maximize2 } from "lucide-react";
// import { sydneySuburbs } from "@/constant/sydneySuburbs";

// // Separate component to handle map invalidation
// function MapResizer() {
//     const map = useMap();

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             map.invalidateSize();
//         }, 100);

//         return () => clearTimeout(timer);
//     }, [map]);

//     return null;
// }

// // Example Sydney suburbs center
// const SYDNEY_CENTER: [number, number] = [-33.886783, 151.193336];

// interface IServiceAreasProps {
//     serviceAreas: string[];
// }

// const ServiceAreaMap: FC<IServiceAreasProps> = ({ serviceAreas }) => {
//     const [mapType, setMapType] = useState<"map" | "satellite">("map");
//     const [isFullscreen, setIsFullscreen] = useState(false);
//     const mapContainerId = "map-container";
//     const [showList, setShowList] = useState(false);

//     const toggleFullscreen = useCallback(() => {
//         const mapContainer = document.getElementById(mapContainerId);
//         if (!document.fullscreenElement && mapContainer) {
//             mapContainer.requestFullscreen();
//             setIsFullscreen(true);
//         } else {
//             document.exitFullscreen();
//             setIsFullscreen(false);
//         }
//     }, []);

//     useEffect(() => {
//         const handleFullscreenChange = () => {
//             if (!document.fullscreenElement) {
//                 setIsFullscreen(false);
//             }
//         };

//         document.addEventListener("fullscreenchange", handleFullscreenChange);
//         return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
//     }, []);

//     // Map serviceAreas to their respective polygon coordinates
//     const mappedPolygons = serviceAreas
//         .map((area) => {
//             const suburb = sydneySuburbs.find((sub) => sub.value === area);
//             if (!suburb) {
//                 console.warn(`Suburb not found: ${area}`);
//             }
//             return suburb
//                 ? {
//                     name: suburb.label,
//                     polygonCoordinates: suburb.polygonCoordinates,
//                 }
//                 : null;
//         })
//         .filter(Boolean);

//     return (
//         <>
//             {/* Header and Toggle Button */}
//             <div className="top-4 left-4 right-4 z-[1000] flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
//                 <h2 className="text-[12px] font-semibold">
//                     Cliff services {serviceAreas.length} suburbs
//                 </h2>
//                 <Button
//                     size="sm"
//                     onClick={() => setShowList(!showList)}
//                     className="flex items-center gap-2 text-[10px] capitalize bg-white border text-primary hover:bg-neutral-50"
//                 >
//                     View full list
//                     {showList ? (
//                         <ChevronUp className="h-4 w-4" />
//                     ) : (
//                         <ChevronDown className="h-4 w-4" />
//                     )}
//                 </Button>
//             </div>

//             {/* Service Area List */}
//             {showList && (
//                 <div className="bg-white rounded-lg shadow-sm p-4">
//                     <div className="flex flex-wrap gap-2">
//                         {serviceAreas.map((area) => (
//                             <div
//                                 key={area}
//                                 className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200 transition-colors"
//                             >
//                                 {area}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Map Container */}
//             <div className="w-full h-[400px] rounded-lg overflow-hidden" id={mapContainerId}>
//                 <div className="relative h-full">
//                     {/* Map Type Toggle */}
//                     <div className="absolute top-4 left-4 z-[1000] bg-white rounded-md shadow">
//                         <button
//                             className={`px-4 py-2 ${mapType === "map"
//                                 ? "bg-white text-primary font-bold border-r rounded-md"
//                                 : ""
//                                 }`}
//                             onClick={() => setMapType("map")}
//                         >
//                             Map
//                         </button>
//                         <button
//                             className={`px-4 py-2 ${mapType === "satellite"
//                                 ? "bg-white text-primary font-bold border-l rounded-md"
//                                 : ""
//                                 }`}
//                             onClick={() => setMapType("satellite")}
//                         >
//                             Satellite
//                         </button>
//                     </div>

//                     {/* Fullscreen Button */}
//                     <button
//                         onClick={toggleFullscreen}
//                         className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-md shadow hover:bg-gray-100 transition-colors"
//                         aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
//                     >
//                         {isFullscreen ? <Maximize2 size={20} /> : <Maximize size={20} />}
//                     </button>

//                     {/* Map Component */}
//                     <MapContainer
//                         center={SYDNEY_CENTER}
//                         zoom={12}
//                         className="h-full w-full"
//                         zoomControl={false}
//                     >
//                         <MapResizer />
//                         <ZoomControl position="bottomright" />
//                         {mapType === "map" ? (
//                             <TileLayer
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             />
//                         ) : (
//                             <>
//                                 <TileLayer
//                                     url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
//                                     attribution="&copy; Google Maps"
//                                 />
//                                 <TileLayer
//                                     url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
//                                     attribution="&copy; Google Maps"
//                                     className="opacity-70"
//                                 />
//                             </>
//                         )}
//                         {/* Polygons */}
//                         {mappedPolygons.map((suburb, i) =>
//                             suburb?.polygonCoordinates.map((polygon, index) => (
//                                 <Polygon
//                                     key={`${suburb.name}-${index}`}
//                                     positions={polygon as [number, number][]}
//                                     pathOptions={{
//                                         color: "#FFD700",
//                                         weight: 2,
//                                         fillColor: "#FFD700",
//                                         fillOpacity: 0.3,
//                                     }}
//                                 >
//                                     {/* Comment this to debug */}
//                                     {/* <Tooltip>{suburb.name}</Tooltip> */}
//                                 </Polygon>
//                             ))
//                         )}
//                     </MapContainer>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ServiceAreaMap;




