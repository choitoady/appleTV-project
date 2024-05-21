import { useEffect } from "react";

export default function useOnclickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // ref.current가 없거나, ref.current가 event.target(마우스 다운이 일어나고 있는 곳) 을 포함하고 있다면 handler를 호출하지 않음
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      //return은 조건이 충족될 때 함수의 실행을 중단하고 함수를 종료
      handler(); //ref.current가 event.target을 포함하지 않을 때 handler 호출
    }; //리스너 등록
    document.addEventListener("mousedown", listener); //listener 함수가 정의된 후에 document.addEventListener를 호출해야 한다는 것
    return () => {
      document.removeEventListener("mousedown", listener); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [ref, handler]);
}
