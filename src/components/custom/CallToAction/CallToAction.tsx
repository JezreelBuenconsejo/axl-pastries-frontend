import React from "react";
import Phone from "~/public/assets/images/cta/phone.png";

type CallToActionProps = {};
const CallToAction: React.FC<CallToActionProps> = (props) => {
  return (
    <section className="flex my-24 mx-auto max-w-[1440px] w-full px-5 lg:px-20">
      <div className="flex flex-col md:flex-row relative justify-between px-11 py-14 w-full rounded-2xl bg-gradient-to-r from-[#ECD9FF] via-[#BCF7FF] to-[#ECD9FF]">
        <div className="flex flex-col gap-6 md:max-w-[271px] xl:max-w-none mx-auto md:mx-0 text-center md:text-start">
          <h3 className="font-bold text-2xl lg:text-3xl leading-7">
            Order by phone number
          </h3>
          <a
            href="tel:9751152891"
            className="font-medium text-base leading-5 hover:text-main-purple"
          >
            (+63)975 115 2891
          </a>
        </div>
        <img
          alt="Phone"
          src={Phone.src}
          className="md:absolute max-w-[363px] h-auto w-full md:bottom-1/2 mx-auto md:translate-y-[55%] md:left-1/2 md:-translate-x-1/2"
        />
        <button className="h-fit my-auto rounded-xl px-10 py-3.5 text-white font-semibold text-xl leading-normal bg-main-purple hover:bg-main-lightblue hover:text-black hover:border hover:border-black transition-all duration-300">
          Order Now!
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
