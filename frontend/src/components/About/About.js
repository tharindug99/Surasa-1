import React from "react";
import AboutImage from "../../assets/images/Aboutbg.png";

function About() {
  return (

    <section
      className="md:h-screen bg-cover bg-center flex flex-col md:grid md:grid-cols-2 gap-4"
      style={{
        backgroundImage: `url(${AboutImage})`,
      }}
    >
      <div className="hidden md:block"></div>
      <div id="about" className="relative md:m-24 m-8  flex flex-col  justify-center  px-10">
        <div className="absolute inset-0 bg-[#291603] opacity-30 z-0 rounded-3xl"></div>
        <div className="relative z-10 flex flex-col md:gap-5 gap-3 pb-5">
          <h1 className="text-white text-[64px] font-Inter text-center ">
            About
          </h1>
          <p className="text-white md:text-[20px] text-[14px] font-Inter">
            Welcome to Surasa website, the innovative restaurant run by talented
            undergraduates from the Faculty of Agricultural Sciences at
            Sabaragamuwa University of Sri Lanka. <br></br> <br></br>Our mission
            is to provide students with delicious and nutritious meals while
            delivering exceptional value. Through our unique approach, we
            prioritize the importance of good nutrition and aim to promote
            healthy eating habits among our student community. Surasa is also
            the perfect venue for your special occasions! Whether it's a
            birthday party or a celebration, our dedicated team will ensure a
            memorable experience. In addition to our regular offerings, we
            specialize in crafting personalized menus to suit the unique needs
            of your event. <br></br> Our team of passionate chefs and attentive
            staff will go above and beyond to make your special occasion truly
            remarkable. On our website, you will find a wide range of
            mouthwatering dishes crafted from fresh, locally sourced
            ingredients. Join us on this culinary journey where great taste
            meets affordability.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
