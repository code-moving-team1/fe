"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Buttons } from "@/components/common/button";
import SignupTextInput from "@/components/common/input/SignupTextInput";
import SnsLoginButton from "@/components/common/button/SnsLoginButton";
import { handleSnsLogin, type SnsProvider } from "@/lib/api/snsAuth";
import {
  validateLoginForm,
  isFormValid,
  type LoginForm,
  type ValidationErrors,
} from "@/utils/validation";
import { useLogin } from "@/hooks/useLogin";

export default function CustomerLoginPage() {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { mutate: login, isPending, Modal } = useLogin("customer");

  // 폼이 유효한지 확인하는 함수
  const isFormValidForSubmit = (): boolean => {
    const currentErrors = validateLoginForm(form);
    return isFormValid(currentErrors);
  };

  // SNS 로그인 핸들러
  const handleSnsLoginClick = (provider: SnsProvider) => {
    handleSnsLogin(provider, "customer");
  };

  // 입력 값 변경 시 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedForm = { ...form, [id]: value };
    setForm(updatedForm);

    // 실시간 유효성 검사
    const newErrors = validateLoginForm(updatedForm);
    setErrors(newErrors);
  };

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors = validateLoginForm(form);
    setErrors(newErrors);
    return isFormValid(newErrors);
  };

  // 폼 제출
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    login({ email: form.email, password: form.password });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] p-4 sm:bg-[#F9502E] sm:p-[45px]">
      <div className="mx-auto mt-10 flex w-full max-w-[740px] rounded-[20px] bg-[#FFFFFF] p-0 sm:px-10 sm:py-12">
        <div className="mx-auto flex w-full max-w-[640px] flex-col justify-center gap-4 text-[#474643] sm:gap-12">
          <div className="flex w-full max-w-[640px] flex-col justify-center gap-2 text-center">
            <div className="mx-auto sm:h-[100px]">
              <img
                src="/assets/logo.svg"
                alt="무빙 로고"
                width={200}
                height={80}
              />
            </div>
            <div className="mx-auto flex flex-col gap-1 text-center text-[18px] sm:flex-row sm:gap-2 sm:text-[20px]">
              <p className="font-bold">기사님이신가요?</p>
              <a
                href="/login/mover"
                className="font-semibold text-[#F9502E] underline decoration-solid underline-offset-auto"
              >
                기사님 전용 페이지
              </a>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6">
            <form
              className="flex flex-col gap-10 sm:gap-14"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mx-auto flex w-full flex-col gap-4 sm:gap-8">
                <div className="flex flex-col gap-4">
                  <SignupTextInput
                    id="email"
                    label="이메일"
                    placeholder="이메일을 입력해 주세요"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={
                      errors.email && form.email.trim() !== ""
                        ? "border-[#FF4F64]"
                        : ""
                    }
                  />
                  {errors.email && form.email.trim() !== "" && (
                    <p className="text-[16px] text-[#FF4F64]">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <SignupTextInput
                    id="password"
                    label="비밀번호"
                    placeholder="비밀번호를 입력해 주세요"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className={
                      errors.password && form.password.trim() !== ""
                        ? "border-[#FF4F64]"
                        : ""
                    }
                    showPasswordToggle={true}
                  />
                  {errors.password && form.password.trim() !== "" && (
                    <p className="text-[16px] text-[#FF4F64]">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <Buttons
                disabled={isPending || !isFormValidForSubmit()}
                className="h-fit p-4 text-[18px] leading-[26px] font-normal"
              >
                {isPending ? "처리중..." : "시작하기"}
              </Buttons>
            </form>

            <div className="mx-auto flex flex-col text-center text-[18px] leading-8 font-normal text-[#474643] sm:flex-row sm:gap-2 sm:text-[20px]">
              <p className="font-bold">아직 무빙 회원이 아니신가요?</p>
              <a
                className="font-semibold text-[#F9502E] underline"
                href="/signupCustomer"
              >
                이메일로 회원가입하기
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 sm:gap-8">
            <div className="text-center text-[20px] leading-8 font-normal text-[#474643]">
              SNS 계정으로 간편 가입하기
            </div>
            <div className="flex flex-row gap-8">
              <SnsLoginButton
                provider="google"
                onClick={() => handleSnsLoginClick("google")}
              />
              <SnsLoginButton
                provider="kakao"
                onClick={() => handleSnsLoginClick("kakao")}
              />
              <SnsLoginButton
                provider="naver"
                onClick={() => handleSnsLoginClick("naver")}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  );
}
