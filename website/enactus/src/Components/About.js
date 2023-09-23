import React from "react";
import Image from "../images/about-us.png";

export const About = () => {
  return (
    <div className="container">
      <div className="about-wrapper">
        <div className="about-image">
          <img src={Image} alt="Image" />
        </div>
        <div className="about-content">
          <h1>About Us</h1>
          <p>
            Enactus is an international non-profit organization that brings
            together student, academic and business leaders who are committed to
            using the power of entrepreneurial action to improve the quality of
            life and standard of living for people in need. Guided by academic
            advisors and business experts, the student leaders of Enactus create
            and implement community empowerment projects around the globe. The
            experience not only transforms lives, it helps students develop the
            kind of talent and perspective that are essential to leadership in
            an ever-more complicated and challenging world.
          </p>
        </div>
      </div>
    </div>
  );
};
