import React from "react";
import { Link } from "react-router-dom";
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export const Hero = () => {
  return (
    <div>
      <div className="landing__container">
        <div className="landing__header__container">
          <div className="landing__header">
            <h3 className="landing__header__discount">SNOWYMART</h3>
            <h1 className="landing__header__main">
              A Platform for local vendors and artisans to sell their products
            </h1>
            <Link to="products">
              <button className="shop-now group flex items-center justify-center gap-2 transition-all duration-200 ">
                SHOP NOW
                <ArrowLongRightIcon className="h-6 w-6 text-black group-hover:text-white transition-all duration-200 group-hover:translate-x-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
