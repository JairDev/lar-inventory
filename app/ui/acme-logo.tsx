import larLogo from "@/public/lar-logov2.png";
import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div className={`p-1 flex flex-row items-center leading-none`}>
      <div className="">
        <Image src={larLogo} alt="Logotipo" width={150} height={150} />
      </div>
    </div>
  );
}
