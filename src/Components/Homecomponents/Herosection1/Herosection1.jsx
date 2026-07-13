import CanadaVideo from '../../../assets/home/CanadaVideo.mp4'
import MobCanadaVideo from '../../../assets/home/MobCanadaVideo.mp4'

export default function Herosection1() {
  return (
    <div className="relative flex w-full h-[100dvh] md:h-auto md:aspect-video mt-[-92px] md:mt-[-128px] overflow-hidden bg-black">
      
      {/* Desktop Video */}
      <video
        src={CanadaVideo}
        autoPlay
        muted
        loop
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Mobile Video: Changed BACK to object-cover to eliminate black bars */}
      <video
        src={MobCanadaVideo}
        autoPlay
        muted
        loop
        playsInline
        className="block md:hidden absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col">
         {/* Your content goes here */}
      </div>
    </div>
  )
}