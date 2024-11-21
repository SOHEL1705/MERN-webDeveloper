
export const Home = () => {
  return (
    <>

<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content items-start flex-col lg:flex-row-reverse">
    <div className="text-center  lg:text-left">
      <h1 className="text-5xl font-bold">Sohel Web Solution</h1>
      <p className="pt-3 text-lg">Professional Web Development Services</p>
      <p className="pt-6" >We offer a range of web development solutions, including custom websites, e-commerce platforms, responsive design, and more. Partner with us to bring your online presence to life.</p>
      <div className=" pt-6 space-x-3  my-8">
          <a href="/contact">
          <button className="btn btn-ghost ml-4 mx-4  btn-active " >Contact now</button>
          </a>
    
          <a href="/services">
          <button className="btn btn-outline btn-wide">Learn more</button>
          </a>
        </div>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <figure >
  <img
        className="rounded-t-lg w-full object-cover"
        src="./hero.png"
        alt="demo"
      />
  </figure>
      {/* <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form> */}
    </div>
  </div>
</div>

    {/* <div className="  container grid grid-two-cols">
      <section className="left-container">
        <p>Professional Web Development Services</p>
      <h1>Sohel Web Solutions</h1>
        <p>We offer a range of web development solutions, including custom websites, e-commerce platforms, responsive design, and more. Partner with us to bring your online presence to life.</p>
        <div className=" space-x-3">
          <a href="/contact">
          <button className="btn ml-4 mx-4  btn-active " >Contact now</button>
          </a>
          <a href="/services">
          <button className="btn btn-wide">Learn more</button>
          </a>
        </div>
      </section>
      <section className="hero-right-container">
      <h1>right</h1>
      </section>
    </div> */}
    </>
  )
}
