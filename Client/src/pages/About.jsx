import { Hexa } from "../components/hexagon/Hexa"
import { useAuth } from "../store/Auth"

// export const About = () => {
  //   return (
    //     <div className="container  grid grid-two-cols">
    //     <div className="hexa-container">
    //       <Hexa />
    //     </div>
    
//     <div className="about-container">
//     <div className="about-heading">
     
//     </div>
//   </div>
//     </div>
  
//   )
// }


export const About  = () => {
  const { userInfoData } = useAuth();
  return (
    <div className="font-sans p-5 leading-6 grid grid-col-2 grid-flow-col gap-4"  >
   
     <div className="px-4">
     <h1 className="font-bold text-3xl text-error hover:text-red-600">About Us</h1>
      <p>
      Welcome <span className="about-span">{userInfoData.username || "to Sloppy"}</span>
        Welcome to <strong className="text-error">Our Website Solutions</strong>! We are dedicated to creating innovative, 
        user-friendly, and visually appealing websites that meet your business needs. Our team is 
        passionate about delivering high-quality web development services and providing effective 
        solutions for all your website challenges.
      </p>
      <h2>What We Do</h2>
      <ul>
        <li>Custom Website Development</li>
        <li>Website Redesign and Modernization</li>
        <li>Responsive and Mobile-First Design</li>
        <li>E-commerce Solutions</li>
        <li>Web Maintenance and Support</li>
      </ul>
      <h2>Our Mission</h2>
      <p>
        Our mission is to empower businesses with powerful web solutions that drive growth and 
        create lasting digital impressions. Whether you&apos;re starting from scratch or improving 
        an existing website, we have the tools and expertise to help you succeed.
      </p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Experienced developers and designers</li>
        <li>Tailored solutions to meet your needs</li>
        <li>Focus on performance and user experience</li>
        <li>Commitment to delivering on time</li>
      </ul>
      <p>
        Let’s work together to bring your vision to life! If you have any questions or want to 
        get started, feel free to <a href="/contact">contact us</a>.
      </p>
     </div>
     <div className="hexa-container">
 <Hexa />
     </div>

    </div>
  );
};


