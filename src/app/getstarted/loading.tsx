import { Truck } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted">
      <div className="flex flex-col items-center space-y-4">
        {/* GalleryVerticalEnd icon */}
        <Truck className="h-8 w-8 animate-bounce text-gray-700" />

        {/* Loader and text side by side */}
        <div className="flex items-center space-x-2">
          <span className="text-lg text-gray-700">Getting Ready</span>
        </div>
      </div>
    </div>
  );
}
