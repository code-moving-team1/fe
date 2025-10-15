"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
} from "./validation";

type Form = {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

type FormKey = "username" | "email" | "phone" | "password" | "confirmPassword" 


export default function SignUpPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Form>({});
  
  
  // 입력 값 변경 시 처리 + 실시간 검증
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: FormEvent ) => {
    e.preventDefault();

    const newErrors = {
      username: validateName(form.username),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(
        form.password,
        form.confirmPassword,
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
    <div className="min-h-screen bg-[#ffffff] p-[45px] md:bg-[#F9502E]">
      <div className="m-[40px] mx-auto flex w-full max-w-[740px] rounded-[20px] bg-[#FFFFFF] px-[40px] py-[48px]">
        <div className="mx-auto flex w-full max-w-[640px] flex-col justify-center gap-[48px] text-[#474643]">
          {/* 상단 로고 + 안내 */}
          <div className="flex w-full max-w-[640px] flex-col justify-center gap-[8px] text-center">
            <div className="mx-auto h-[100px]">
              <img
                src="/assets/logo.svg"
                alt="무빙 로고"
                width={200}
                height={80}
              />
            </div>
            <div className="mx-auto flex flex-row gap-[8px] text-[20px]">
              <p>기사님이신가요?</p>
              <a className="font-semibold text-[#F9502E] underline">
                기사님 전용 페이지
              </a>
            </div>
          </div>

          {/* 폼 영역 */}
          <div className="flex w-full flex-col gap-[24px]">
            <form
              className="flex flex-col gap-[56px]"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mx-auto flex w-full flex-col gap-[32px]">
                {[
                  {
                    id: "username",
                    label: "이름",
                    placeholder: "성함을 입력해 주세요",
                    type: "text",
                  },
                  {
                    id: "email",
                    label: "이메일",
                    placeholder: "이메일을 입력해 주세요",
                    type: "email",
                  },
                  {
                    id: "phone",
                    label: "전화번호",
                    placeholder: "전화번호를 입력해 주세요",
                    type: "tel",
                  },
                  {
                    id: "password",
                    label: "비밀번호",
                    placeholder: "비밀번호를 입력해 주세요",
                    type: "password",
                  },
                  {
                    id: "confirmPassword",
                    label: "비밀번호 확인",
                    placeholder: "비밀번호를 다시 한 번 입력해 주세요",
                    type: "password",
                  },
                ].map(({ id, label, placeholder, type }) => (
                  <div key={id} className="flex flex-col gap-[16px]">
                    <label className="text-[20px]">{label}</label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={form[id as FormKey]}
                      onChange={handleChange}
                      className={`w-full rounded-[16px] border p-[14px] focus:border-[#F9502E] focus:outline-none ${
                        errors[id as FormKey] ? "border-[#FF4F64]" : "border-[#E6E6E6]"
                      }`}
                    />
                    {errors[id as FormKey] && (
                      <p className="text-[16px] text-[#FF4F64]">{errors[id as FormKey]}</p>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`className="w-full " cursor-pointer rounded-[16px] p-[14px] font-semibold ${
                  canSubmit
                    ? "cursor-pointer bg-[#F9502E] text-[#FFFFFF]"
                    : "cursor-not-allowed bg-[#D9D9D9] text-[#FFFFFF]"
                }`}
              >
                시작하기
              </button>
            </form>

            <div className="mx-auto flex w-[300px] flex-row gap-[8px] text-[20px]">
              <p>이미 무빙 회원이신가요?</p>
              <a className="font-semibold text-[#F9502E] underline">로그인</a>
            </div>
          </div>

          <div className="mx-auto flex flex-col gap-[32px] text-center text-[20px]">
            <p>SNS 계정으로 간편 가입 하기</p>
            <div className="mx-auto flex flex-row gap-[8px]">
              <button>구글</button>
              <button>네이버</button>
              <button>카카오</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
