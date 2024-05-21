import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Nav = () => {
  const [show, setShow] = useState("false");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const listener = () => {
    if (window.scrollY > 50) {
      setShow("true");
    } else {
      setShow("false");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);
  //윈도우 객체에 "scroll" 이벤트가 발생할 때 호출될 listener 함수를 등록합니다.
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };
  return (
    <NavWrapper $show={show}>
      <Logo>
        <img
          alt="logo"
          src="images/apple-logo.png"
          onClick={() => (window.location.href = "./")}
        />
      </Logo>
      <Input
        type="text"
        className="nav__input"
        placeholder="영화를 검색해주세요."
        onChange={handleChange}
        value={searchValue}
      />
      <Login>login</Login>
    </NavWrapper>
  );
};

const Logo = styled.a`
  padding: 0;
  width: 70px;
  font-size: 0;
  display: inline-block;
  margin-bottom: 10px;

  img {
    display: block;
    width: 100%;
  }
`;
const NavWrapper = styled.nav`
  position: fixed; //nav고정
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) =>
    props.show === "true" ? "#000000" : "#000000"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  /* 요소의 너비의 50%만큼 왼쪽으로 이동시킵니다. */
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: 1px solid lightgray;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

export default Nav;
