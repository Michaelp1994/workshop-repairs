import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

interface GoogleMapProps {
  location: {
    lat: number;
    lng: number;
  };
}

export default function GoogleMap({ location }: GoogleMapProps) {
  const apiKey = process.env["NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"];

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set");
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        className="h-[250px] w-full"
        defaultCenter={location}
        defaultZoom={3}
        disableDefaultUI={true}
        gestureHandling={"greedy"}
      >
        <Marker position={location} />
      </Map>
    </APIProvider>
  );
}
