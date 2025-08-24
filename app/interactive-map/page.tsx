import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("../../components/InteractiveMap"), { ssr: false });

export default function InteractiveMapPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="absolute top-4 left-4">
        <a 
          href="/" 
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          ← Back to Dashboard
        </a>
      </div>
      
      <h1 className="text-4xl font-bold text-green-400">EarthPulse</h1>
      <p className="text-gray-300 mb-4">Interactive Map - Click anywhere to get location details</p>
      <InteractiveMap />
    </main>
  );
}
