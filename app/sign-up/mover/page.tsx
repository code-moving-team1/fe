"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Buttons } from "@/components/common/button";
import SignupTextInput from "@/components/common/input/SignupTextInput";
import SnsLoginButton from "@/components/common/button/SnsLoginButton";
import { moverSignup } from "@/lib/auth";
import { handleSnsLogin, type SnsProvider } from "@/lib/api/snsAuth";
import {
  validateSignupForm,
  isFormValid,
  type SignupForm,
  type ValidationErrors,
} from "@/utils/validation";
import { useLogin } from "@/hooks/useLogin";
import { useAlertModal } from "@/components/common/modal/AlertModal";
import Link from "next/link";

export default function MoverSignUpPage() {
  const router = useRouter();
  const { alert, Modal } = useAlertModal();
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: login } = useLogin("mover");

  // 폼이 유효한지 확인하는 함수
  const isFormValidForSubmit = (): boolean => {
    const currentErrors = validateSignupForm(form);
    return isFormValid(currentErrors);
  };

  // SNS 로그인 핸들러
  const handleSnsLoginClick = (provider: SnsProvider) => {
    handleSnsLogin(provider, "mover");
  };

  // 입력 값 변경 시 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedForm = { ...form, [id]: value };
    setForm(updatedForm);

    // 실시간 유효성 검사
    const newErrors = validateSignupForm(updatedForm);
    setErrors(newErrors);
  };

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors = validateSignupForm(form);
    setErrors(newErrors);
    return isFormValid(newErrors);
  };

  // 폼 제출
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 회원가입 후 자동 로그인
      await moverSignup({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      login({ email: form.email, password: form.password });
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      if (error.config.url === "/auth/customer/signup") {
        alert({
          title: "가입 실패",
          message: `${error.response.data.error.message}`,
        });
      } else if (error.config.url === "/auth/customer/signin") {
        alert({
          title: "로그인 실패",
          message: `${error.response.data.error.message}`,
        });
        router.push("/login/customer");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] p-4 sm:bg-[#F9502E] sm:p-[45px]">
      <div className="mx-auto mt-10 flex w-full max-w-[740px] rounded-[20px] bg-[#FFFFFF] p-0 sm:px-10 sm:py-12">
        <div className="mx-auto flex w-full max-w-[640px] flex-col justify-center gap-4 text-[#474643] sm:gap-12">
          {/* 상단 로고 + 안내 */}
          <div className="flex w-full max-w-[640px] flex-col justify-center gap-2 text-center">
            <div className="mx-auto h-[100px]">
              <img
                src="/assets/logo.svg"
                alt="무빙 로고"
                width={200}
                height={80}
              />
            </div>
            <div className="mx-auto flex flex-col gap-1 text-center text-[18px] sm:flex-row sm:gap-2 sm:text-[20px]">
              <p className="font-bold">일반 유저라면?</p>
              <a
                href="/sign-up/customer"
                className="font-semibold text-[#F9502E] underline decoration-solid underline-offset-auto"
              >
                일반 유저 전용 페이지
              </a>
            </div>
          </div>

          {/* 폼 영역 */}
          <div className="flex w-full flex-col gap-2 sm:gap-6">
            <form
              className="flex flex-col gap-8 sm:gap-14"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mx-auto flex w-full flex-col gap-2 sm:gap-8">
                <div className="flex flex-col gap-4">
                  <SignupTextInput
                    id="name"
                    label="이름"
                    placeholder="성함을 입력해 주세요"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={
                      errors.name && form.name.trim() !== ""
                        ? "border-[#FF4F64]"
                        : ""
                    }
                  />
                  {errors.name && form.name.trim() !== "" && (
                    <p className="text-[16px] text-[#FF4F64]">{errors.name}</p>
                  )}
                </div>

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
                    id="phone"
                    label="전화번호"
                    placeholder="전화번호를 입력해 주세요"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={
                      errors.phone && form.phone.trim() !== ""
                        ? "border-[#FF4F64]"
                        : ""
                    }
                  />
                  {errors.phone && form.phone.trim() !== "" && (
                    <p className="text-[16px] text-[#FF4F64]">{errors.phone}</p>
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

                <div className="flex flex-col gap-4">
                  <SignupTextInput
                    id="confirmPassword"
                    label="비밀번호 확인"
                    placeholder="비밀번호를 다시 한 번 입력해 주세요"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={
                      errors.confirmPassword &&
                      form.confirmPassword.trim() !== ""
                        ? "border-[#FF4F64]"
                        : ""
                    }
                    showPasswordToggle={true}
                  />
                  {errors.confirmPassword &&
                    form.confirmPassword.trim() !== "" && (
                      <p className="text-[16px] text-[#FF4F64]">
                        {errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>

              <Buttons
                disabled={isLoading || !isFormValidForSubmit()}
                className="h-fit p-4 text-[18px] leading-[26px] font-normal"
              >
                {isLoading ? "처리중..." : "시작하기"}
              </Buttons>
            </form>

            <div className="mx-auto flex flex-row gap-2 text-center text-[18px] leading-8 font-normal text-[#474643] sm:text-[20px]">
              <p className="font-bold">이미 무빙 회원이신가요?</p>
              <a
                className="font-semibold text-[#F9502E] underline"
                href="/login/mover"
              >
                로그인
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
          <Link href="/signupMover">
          <div className="flex flex-row gap-8 justify-center items-center">
            <button aria-label="이동" type="button"  title="Hidden Sign Up"
            className="w-20 h-2 bg-gray-200 rounded-2xl hover:bg-gray-400 cursor-pointer"
            ></button>
          </div>
          </Link>
            
        </div>
      </div>
      <Modal />
    </div>
  );
}
