"use client";

import { useState } from "react";
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
} from "./validation";

export default function SignUpPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // 입력 값 변경 시 처리 + 실시간 검증
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    // 실시간 유효성 검사
    let errorMsg = "";
    switch (id) {
      case "username":
        errorMsg = validateName(value);
        break;
      case "email":
        errorMsg = validateEmail(value);
        break;
      case "phone":
        errorMsg = validatePhone(value);
        break;
      case "password":
        errorMsg = validatePassword(value);
        // 비밀번호 변경 시 confirmPassword도 재검증
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(value, form.confirmPassword),
        }));
        break;
      case "confirmPassword":
        errorMsg = validateConfirmPassword(form.password, value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateName(form.username),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(
        form.password,
        form.confirmPassword
      ),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg);
    if (hasError) return;

    console.log("회원가입 성공 🎉", form);
  };

  // 모든 값 채움 여부
  const isFormFilled = Object.values(form).every((val) => val.trim() !== "");
  // 모든 에러 없음
  const isFormValid = Object.values(errors).every((msg) => !msg);
  // 버튼 활성화 조건
  const canSubmit = isFormFilled && isFormValid;

  return (
    <div className="bg-[#ffffff] md:bg-[#F9502E] min-h-screen p-[45px]">
      <div className="flex bg-[#FFFFFF] w-full max-w-[740px] mx-auto px-[40px] m-[40px] rounded-[20px] py-[48px]">
        <div className="max-w-[640px] w-full flex gap-[48px] justify-center flex-col mx-auto text-[#474643]">
          {/* 상단 로고 + 안내 */}
          <div className="flex flex-col justify-center text-center max-w-[640px] w-full gap-[8px]">
            <div className="mx-auto h-[100px]">
              <img
                src="/assets/logo.svg"
                alt="무빙 로고"
                width={200}
                height={80}
              />
            </div>
            <div className="flex flex-row gap-[8px] mx-auto text-[20px]">
              <p>기사님이신가요?</p>
              <a className="font-semibold underline text-[#F9502E]">
                기사님 전용 페이지
              </a>
            </div>
          </div>

          {/* 폼 영역 */}
          <div className="w-full flex flex-col gap-[24px]">
            <form className="flex flex-col gap-[56px]" onSubmit={handleSubmit} noValidate>
              <div className="w-full flex flex-col gap-[32px] mx-auto">
                {[
                  { id: "username", label: "이름", placeholder: "성함을 입력해 주세요", type: "text" },
                  { id: "email", label: "이메일", placeholder: "이메일을 입력해 주세요", type: "email" },
                  { id: "phone", label: "전화번호", placeholder: "전화번호를 입력해 주세요", type: "tel" },
                  { id: "password", label: "비밀번호", placeholder: "비밀번호를 입력해 주세요", type: "password" },
                  { id: "confirmPassword", label: "비밀번호 확인", placeholder: "비밀번호를 다시 한 번 입력해 주세요", type: "password" },
                ].map(({ id, label, placeholder, type }) => (
                  <div key={id} className="flex flex-col gap-[16px]">
                    <label className="text-[20px]">{label}</label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={form[id]}
                      onChange={handleChange}
                      className={`w-full border rounded-[16px] p-[14px] focus:outline-none focus:border-[#F9502E] ${
                        errors[id] ? "border-[#FF4F64]" : "border-[#E6E6E6]"
                      }`}
                    />
                    {errors[id] && (
                      <p className="text-[#FF4F64] text-[16px]">{errors[id]}</p>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`className="w-full cursor-pointer rounded-[16px] p-[14px] font-semibold " 
                  ${
                  canSubmit ? "bg-[#F9502E] cursor-pointer text-[#FFFFFF]" : "bg-[#D9D9D9] cursor-not-allowed text-[#FFFFFF]"
                }`}
              >
                시작하기
              </button>
            </form>

            <div className="flex flex-row gap-[8px] mx-auto text-[20px] w-[300px]">
              <p>이미 무빙 회원이신가요?</p>
              <a className="font-semibold underline text-[#F9502E]">로그인</a>
            </div>
          </div>

          <div className="flex flex-col gap-[32px] mx-auto text-center text-[20px]">
            <p>SNS 계정으로 간편 가입 하기</p>
            <div className="flex flex-row gap-[8px] mx-auto">
              <button >구글</button>
              <button >네이버</button>
              <button >카카오</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
