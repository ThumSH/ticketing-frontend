import { Button } from '@/components/ui/button';

export default function PromoBanner() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-green-600">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 gap-8">
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-black">
              GET THE APP
            </h2>
            <p className="text-black/80 font-medium text-lg max-w-md">
              Exclusive deals, early bird access, and ticket transfers. 
              Experience the full power of BeatPass on mobile.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="h-14 px-8 bg-black text-white hover:bg-gray-900 rounded-xl text-lg font-bold">
              Download for iOS
            </Button>
            <Button className="h-14 px-8 bg-white/20 text-black hover:bg-white/30 border-2 border-black/10 rounded-xl text-lg font-bold backdrop-blur-sm">
              Get Android App
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}