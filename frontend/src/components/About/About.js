import React from "react";
import AboutImage from "../../assets/images/Aboutbg.png";

function About() {
  return (
      <section
          className="h-screen bg-cover bg-center md:flex grid py-[20px]"
          style={{
            backgroundImage: `url(${AboutImage})`,
          }}
      >
        <div className=" hidden md:block flex-1"></div>


        <div className="bg-[#29160369] flex-1">2</div>
      </section>

  );
}

export default About;
