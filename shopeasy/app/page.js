import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Showroom from "@/components/Showroom";
import banner from "@/components/banner";
export default function Home() {
  return (
    <div className=" w-[100vw]">
      <Showroom/>
      <banner/>
      

    </div>
  );
}
