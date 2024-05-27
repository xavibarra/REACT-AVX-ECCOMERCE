import about from "../assets/img/aboutUs.jpg";
// TODO STYLE
const AboutUs = () => {
  return (
    <section className="about-us-section">
      <div className="tetx-container">
        <h2 className="text-title">About us</h2>
        <p className="text">
          Welcome to Components Portions! Founded by tech enthusiasts, we are
          dedicated to providing the highest quality computer components to help
          you build, upgrade, and optimize your systems. Our extensive selection
          includes top-tier CPUs, GPUs, motherboards, memory, storage solutions,
          and more, catering to both hobbyists and professionals.
        </p>
        <p className="text">
          At Components Portions, we believe in the power of technology to
          transform lives. Our mission is to offer premium products at
          competitive prices, combined with exceptional customer service. Our
          knowledgeable team is here to guide you through every step of your
          purchase, ensuring you find the perfect components to meet your
          specific needs.
        </p>
        <p className="text">
          Thank you for choosing Components Portions. We are committed to making
          your shopping experience seamless and enjoyable, with fast shipping
          and reliable support. Join us on our journey to enhance the future of
          computing, one component at a time!
        </p>
      </div>
      <div className="image-container">
        <img className="image" src={about} alt="About-us image" />
      </div>
    </section>
  );
};

export default AboutUs;
