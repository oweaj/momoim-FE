import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import Link from "next/link";
import Marker from "@/assets/images/makrer.png";
import MapSkeleton from "./MapSkeleton";

export default function KaKaoMap({ address }: { address: string | undefined }) {
  const [error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAP_KEY!,
    libraries: ["services"],
  });
  const [coordinates, setCoordinates] = useState({ lat: 33.5563, lng: 126.79581 });
  const [map, setMap] = useState<any>(null);
  const mapContainerRef = useRef(null);
  const onCreate = (newMap: any) => setMap(newMap);

  useEffect(() => {
    if (!address || error) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0]; // 주소 좌표값
        setCoordinates({
          lat: parseFloat(y),
          lng: parseFloat(x),
        });
      }
    });
  }, [address, error]);

  useEffect(() => {
    const handleMapResize = () => {
      if (map && mapContainerRef.current) {
        map.relayout();
        map.setCenter(new kakao.maps.LatLng(coordinates.lat, coordinates.lng));
      }
    };
    if (mapContainerRef.current) {
      const observer = new ResizeObserver(handleMapResize);
      observer.observe(mapContainerRef.current);

      return () => observer.disconnect();
    }
    return undefined;
  }, [map, coordinates]);

  const addressMapUrl = `https://map.kakao.com/link/map/${encodeURIComponent(address!)},${coordinates.lat},${coordinates.lng}`;

  return (
    <Link href={addressMapUrl} target="_blank" rel="noopener noreferrer">
      <div ref={mapContainerRef} className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">모임 장소</h3>
        {error ? (
          <MapSkeleton />
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-400">
            <Map
              id="map"
              center={coordinates}
              className="h-[300px] w-full"
              draggable={false}
              scrollwheel={false}
              level={3}
              onCreate={onCreate}
            >
              <MapMarker
                position={coordinates}
                image={{
                  src: Marker.src,
                  size: { width: 40, height: 40 },
                }}
              />
            </Map>
            <div className="p-5">
              <p>{address}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
