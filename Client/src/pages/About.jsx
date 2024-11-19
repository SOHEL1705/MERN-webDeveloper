import { Hexa } from "../components/hexagon/Hexa"
import { useAuth } from "../store/Auth"

export const About = () => {
  const { userInfoData } = useAuth();
  return (
    <div className="container  grid grid-two-cols">
    <div className="hexa-container">
      <Hexa />
    </div>

    <div className="about-container">
    <div className="about-heading">
      Welcome <span className="about-span">{userInfoData.username || "to Sloppy"}</span>
    </div>
  </div>
    </div>
  
  )
}
