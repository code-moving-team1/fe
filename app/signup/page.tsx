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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
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

  return (
    <div className="bg-[#ffffff] md:bg-[#F9502E] h-[1488px] p-[45px]">
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
            <form className="flex flex-col gap-[56px]" onSubmit={handleSubmit} noValidate >
              <div className="w-full flex flex-col gap-[32px] mx-auto">
                {/* 이름 */}
                <div className="flex flex-col gap-[16px]">
                  <label className="text-[20px]">이름</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="성함을 입력해 주세요"
                    value={form.username}
                    onChange={handleChange}
                     className={` w-full border border-[#E6E6E6] rounded-[16px] p-[14px] 
                      ${ errors.username
                        ? "border-[#FF4F64] focus:outline-none focus:border-[#F9502E]"
                        : "border-[#E6E6E6] focus:outline-none focus:border-[#F9502E]" } `}
                  />
                  {errors.username && (
                    <p className="text-[#FF4F64] text-[16px]">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* 이메일 */}
                <div className="flex flex-col gap-[16px]">
                  <label className="text-[20px]">이메일</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해 주세요"
                    value={form.email}
                    onChange={handleChange}
                     className={` w-full border border-[#E6E6E6] rounded-[16px] p-[14px] 
                      ${ errors.email
                        ? "border-[#FF4F64] focus:outline-none focus:border-[#F9502E]"
                        : "border-[#E6E6E6] focus:outline-none focus:border-[#F9502E]" } `}
                  />
                  {errors.email && (
                    <p className="text-[#FF4F64] text-[16px]">{errors.email}</p>
                  )}
                </div>

                {/* 전화번호 */}
                <div className="flex flex-col gap-[16px]">
                  <label className="text-[20px]">전화번호</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="전화번호를 입력해 주세요"
                    value={form.phone}
                    onChange={handleChange}
                    className={` w-full border border-[#E6E6E6] rounded-[16px] p-[14px] 
                      ${ errors.phone
                        ? "border-[#FF4F64] focus:outline-none focus:border-[#F9502E]"
                        : "border-[#E6E6E6] focus:outline-none focus:border-[#F9502E]" } `}
                  />
                  {errors.phone && (
                    <p className="text-[#FF4F64] text-[16px]">{errors.phone}</p>
                  )}
                </div>

                {/* 비밀번호 */}
                <div className="flex flex-col gap-[16px]">
                  <label className="text-[20px]">비밀번호</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={form.password}
                    onChange={handleChange}
                    className={` w-full border border-[#E6E6E6] rounded-[16px] p-[14px] 
                      ${ errors.password
                        ? "border-[#FF4F64] focus:outline-none focus:border-[#F9502E]"
                        : "border-[#E6E6E6] focus:outline-none focus:border-[#F9502E]" } `}
                  />
                  {errors.password && (
                    <p className="text-[#FF4F64] text-[16px]">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* 비밀번호 확인 */}
                <div className="flex flex-col gap-[16px]">
                  <label className="text-[20px]">비밀번호 확인</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="비밀번호를 다시 한 번 입력해 주세요"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className= {` w-full border border-[#E6E6E6] rounded-[16px] p-[14px] 
                      ${ errors.confirmPassword
                        ? "border-[#FF4F64] focus:outline-none focus:border-[#F9502E]"
                        : "border-[#E6E6E6] focus:outline-none focus:border-[#F9502E]" } `}
                  />
                  {errors.confirmPassword && (
                    <p className="text-[#FF4F64] text-[16px]">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D9D9D9] cursor-pointer rounded-[5px] p-[14px] font-semibold text-[#FFFFFF]"
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
              <div>구글</div>
              <div>네이버</div>
              <div>카카오</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
