// SignupModal

/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRef, useState } from "react";
import styled from "styled-components";
import useOnClickOutside from "../../hooks/useOnclickOutside";
import "./signupModal.css";

const SignUpModal = ({ setModalOpen }) => {
  const ref = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  const handleSignUp = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 회원가입 성공
        console.log("Signed up with:", userCredential.user);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("Error message:", error.message);

        // Firebase 에러 메시지 추출
        const errorMessage = error.message;
        // 'INVALID_EMAIL' 메시지 처리
        if (errorMessage.includes("auth/invalid-email")) {
          setSignUpError("유효하지 않은 이메일입니다.");
        } else if (errorMessage.includes("auth/email-already-in-use")) {
          // 'EMAIL_EXISTS' 메시지 처리
          setSignUpError("이미 존재하는 이메일입니다.");
        } else {
          // 기타 에러 메시지 처리
          setSignUpError(errorMessage);
        }
      });
  };

  return (
    <div className="signup__presentation" role="presentation">
      <div className="signup__wrapper-modal">
        <div className="signup__modal" ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className="signup__modal-close"
          >
            X
          </span>
          <FormContainer onSubmit={handleSignUp}>
            <Logo src="/images/apple-gray-logo.svg" alt="로고" />
            <HeadingText>Sign up</HeadingText>
            <Description>
              You will sign up for Apple TV and Apple Music.
            </Description>
            <Input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {signUpError && <ErrorMessage>{signUpError}</ErrorMessage>}
            <Button onClick={handleSignUp}>Sign Up</Button>
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.img`
  width: 40px;
`;

const HeadingText = styled.h1`
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
`;

const Description = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export default SignUpModal;
