import { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  all: unset;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  padding: 4px 4px;
  font-size: 18px;
  font-weight: 200;
  border-radius: 50%;
  cursor: pointer;
  background-color: #c94040;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  z-index: 99;
`;

const TopButton = () => {
  const [viewButton, setViewButton] = useState(false);

  useEffect(() => {
    const toggleViewButton = () => {
      setViewButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleViewButton);
    return () => window.removeEventListener("scroll", toggleViewButton);
  }, []);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return viewButton && <Button onClick={handleScrollToTop}>Top</Button>;
};

export default TopButton;
