const MenuIcon = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10H16"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M0 4H16"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M0 16H16"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
