import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-800 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-black text-[#00b5cc] slime-text mb-4">
            404
          </h1>
          <h2 className="text-3xl font-black uppercase mb-2">
            Aw Geez, Page Not Found
          </h2>
          <p className="text-lg font-bold text-neutral-400">
            This page doesn't exist in any dimension, Morty
          </p>
        </div>

        <Link href="/">
          <Button className="h-14 px-8 border-3 border-black bg-[#84d65a] hover:bg-[#70c446] text-black font-black text-base neo-shadow neo-active">
            <ArrowLeft className="h-5 w-5 mr-2" />
            GET ME OUT OF HERE
          </Button>
        </Link>
      </div>
    </div>
  );
}
