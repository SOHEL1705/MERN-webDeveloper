/* eslint-disable react/prop-types */

const ServiceCard = ({ service, description, provider, price }) => (
  <>
  
  <div className="card bg-base-100 w-50 shadow-xl">
  <figure>
  <img
        className="rounded-t-lg w-full object-cover"
        src="https://loremflickr.com/200/200?random=1"
        alt="demo"
      />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{service}</h2>
    <p>{description}</p>
    <p>Provider : <span>{provider}</span> </p>
    <div className="card-actions justify-end">
     <div>Price : <span>{price}</span></div>
    </div>
  </div>
</div>

  </>
);
export default ServiceCard;
