import Navbar from "../Layout/Navbar";
import bg from "../../assets/images/background.jpg";   // 👈 exact path

export default function HeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className=" text-white text-2xl font-bold">
      <Navbar/>
      </div>
    </div>
  );
}
