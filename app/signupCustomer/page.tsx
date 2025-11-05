"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState,} from "react";
import {validateName, validateEmail, validatePhone, validatePassword, validateConfirmPassword,} from "./validation";
import SnsLoginButton from "@/components/common/button/SnsLoginButton";
import { handleSnsLogin, type SnsProvider } from "@/lib/api/snsAuth";

type Form = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

type FormKey = "name" | "email" | "phone" | "password" | "confirmPassword"

export default function SignupUserPage() {
const router = useRouter(); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState<Form>({ 
    name: "", 
    email: "", 
    phone: "", 
    password: "", 
    confirmPassword: "" });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // 입력 값 변경 시 처리 + 실시간 검증
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    // 실시간 유효성 검사
    let errorMsg = "";
    switch (id) {
      case "name":
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(form.name),
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

  const handleSignup = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
    }) 

    const data = await res.json();
   if (!res.ok) {
      setErrorMessage(data?.message || "회원가입에 실패했습니다.");
      } else {
      router.push("/login/customer");
      }
      } catch (err) {
      setErrorMessage("서버와 연결할 수 없습니다.");
      } finally {
      setLoading(false);
      }

};

  //버튼 활성화 조건: 모든 필드 채워짐 + 에러 없음
  const isFormFilled = Object.values(form).every((val) => val.trim() !== "") 
  const isFormValid = Object.values(errors).every((msg) => !msg); 
  const canSubmit = isFormFilled && isFormValid;

   const handleSnsLoginClick = (provider: SnsProvider) => {
      handleSnsLogin(provider, "customer");
    };

  return (
    <div className="min-h-screen bg-[#ffffff] p-[45px] md:bg-[#F9502E]">
      <div className="m-10 mx-auto flex w-full max-w-[740px] rounded-[20px] bg-[#FFFFFF] px-10 py-12">
        <div className="mx-auto flex w-full max-w-[640px] flex-col justify-center gap-12 text-[#474643]">
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
            <div className="mx-auto flex flex-row gap-2 text-[20px]">
              <p>기사님이신가요?</p>
              <Link href="/signupMover" className="font-semibold text-[#F9502E] underline">
                기사님 전용 페이지
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col gap-6">
            <form
              className="flex flex-col gap-14"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mx-auto flex w-full flex-col gap-8">
                {[
                  {
                    id: "name",
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
                  <div key={id} className="flex flex-col gap-4">
                    <label className="text-[20px]">{label}</label>
                    <input
                      id={id}
                    type={
                      id === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : id === "confirmPassword"
                        ? showConfirmPassword
                          ? "text"
                          : "password"
                        : type
                    }
                      placeholder={placeholder}
                      value={form[id as FormKey]}
                      onChange={handleChange}
                      className={`w-full rounded-2xl border p-3.5 focus:border-[#F9502E] focus:outline-none 
                        ${errors[id as FormKey] ? "border-[#FF4F64]" : "border-[#E6E6E6]"
                      }`}
                    />
                    {(id === "password" || id === "confirmPassword") && (
                    <button
                      type="button"
                      aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                      onClick={() =>
                        id === "password"
                          ? setShowPassword(!showPassword)
                          : setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-[58px] right-4 -translate-y-1/2 cursor-pointer"
                    >
                      <Image
                        src={
                          (id === "password" ? showPassword : showConfirmPassword)
                            ? "/icons/ic_visibility.svg"
                            : "/icons/ic_visibility-off.svg"
                        }
                        alt="비밀번호 보기"
                        width={20}
                        height={20}
                      />
                    </button>
                  )}
                    {errors[id as FormKey] && (
                      <p className="text-[16px] text-[#FF4F64]">
                        {errors[id as FormKey]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
                {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
              <button onClick={handleSignup} disabled={!canSubmit || loading} 
                type="submit" 
                className={`className="w-full " cursor-pointer rounded-2xl p-3.5 font-semibold ${
                  canSubmit
                    ? "cursor-pointer bg-[#F9502E] text-[#FFFFFF]"
                    : "cursor-not-allowed bg-[#D9D9D9] text-[#FFFFFF]"
                }`}
              >
                {loading ? "로딩 중..." : "시작하기"}
              </button>
            </form>

            <div className="mx-auto flex w-[300px] flex-row gap-2 text-[20px]">
              <p>이미 무빙 회원이신가요?</p>
              <Link href="/login/customer" className="font-semibold text-[#F9502E] underline">
                로그인
              </Link>
            </div>
          </div>

<div className="mx-auto flex flex-col gap-8 text-center text-[20px]">
          <p>SNS 계정으로 간편 가입 하기</p>
          <div className="mx-auto flex flex-row gap-2">
            <SnsLoginButton provider="google"
            onClick={() => handleSnsLoginClick("google")}/>
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
    </div>
  );
}
