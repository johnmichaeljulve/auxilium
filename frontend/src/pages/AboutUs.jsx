import React from "react";
import { box } from "../assets";
import { Banner } from "../components";

const AboutUs = () => {
	return (
		<div className="">
			<Banner text="About Us" />
            <div className="flex flex-row justify-center items-center flex-1 bg-contain gap-40 mt-5">
			    <p className="w-[500px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi molestias repudiandae quia, fugiat officiis aut quas voluptatem perferendis mollitia. Placeat, facilis. Laborum amet esse eveniet tempore nulla assumenda dolorem beatae?
                </p>
                    <img src={box} alt="box" className="w-[500px]"/>
            </div>

		</div>
	);
};

export default AboutUs;
