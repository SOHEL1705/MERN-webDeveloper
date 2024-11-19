import ServiceCard from "../components/servicesCard/ServiceCard";
import { useAuth } from "../store/Auth";
export const Service = () => {
  //import services data from store

  const { servicesData } = useAuth();

  return (
    <div className="container grid md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 grid-cols-2 gap-4 mx-auto px-4">
      {servicesData.map((service, index) => (
        <ServiceCard
          key={index}
          service={service.service}
          description={service.description}
          price={service.price}
          provider={service.provider}
        />
      ))}
    </div>
  );
};
