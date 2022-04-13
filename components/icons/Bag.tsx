const Bag = ({
  fill = "#fff",
  stroke = "#fff",
  ...props
}: {
  fill: string;
  stroke: string;
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6666 5.00008H12.4999V3.33341C12.4999 2.41675 11.7499 1.66675 10.8333 1.66675H9.16658C8.24992 1.66675 7.49992 2.41675 7.49992 3.33341V5.00008H3.33325V18.3334H16.6666V5.00008ZM15.8333 17.5001H4.16659V5.83342H15.8333V17.5001ZM8.33325 3.33341C8.33325 2.87383 8.707 2.50008 9.16658 2.50008H10.8333C11.2928 2.50008 11.6666 2.87383 11.6666 3.33341V5.00008H8.33325V3.33341Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="0.3"
      />
      <rect x="7.5" y="3.33594" width="0.833333" height="3.33333" fill={fill} />
      <rect
        x="11.668"
        y="3.33594"
        width="0.833333"
        height="3.33333"
        fill={fill}
      />
    </svg>
  );
};

export default Bag;
