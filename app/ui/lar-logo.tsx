import larLogo from "@/public/lar-logov2.png";
import Image from "next/image";

export default function LarLogo() {
  return (
    <div className={`p-1 flex flex-row items-center leading-none`}>
      <div className="w-[130px] h-[130px] relative">
        <Image
          src={larLogo}
          className=""
          alt="Logotipo"
          fill={true}
          // width={50}
          // height={50}
        />
        {/* <Image src={larLogo} alt="Logotipo" width={115} height={115} /> */}
      </div>
    </div>
  );
}
