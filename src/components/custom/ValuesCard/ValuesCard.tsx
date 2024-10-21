import React from "react";

type ValuesCardProps = {
  title: string;
  description?: string | string[];
  img?: React.ReactNode;
};
const ValuesCard: React.FC<ValuesCardProps> = (props) => {
  return (
    <div className="flex flex-col items-center gap-4 max-w-[368px] w-full">
      {props.img}
      <h3 className="text-2xl font-bold leading-7 text-center">
        {props.title}
      </h3>
      <div className="text-center mb-4 text-[#878787] text-base leading-5 font-medium">
        {Array.isArray(props.description) ? (
          <ul>
            {React.Children.toArray(
              props.description.map((item) => <li>• {item}</li>),
            )}
          </ul>
        ) : (
          <p>{props.description}</p>
        )}
      </div>
    </div>
  );
};

export default ValuesCard;
