// app/signup/validation.jsx

// 이름: 최소 1글자 이상 입력 
// 이메일: @ 포함 여부 간단 체크 
// 전화번호: 숫자만, 10~11자리
// 지역에 맞는 형식인지 확인
// 비밀번호: 8자 이상, 숫자+영문자+특수문자 포함
// 비밀번호 확인: 일치 여부



export function validateName(name) {
  if (!name.trim()) return "이름을 입력해 주세요.";
  return "";
}

export function validateEmail(email) {
  if (!email.trim()) return "이메일을 입력해 주세요.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return " 올바른 이메일 형식이 아닙니다";
  return "";
}


export function validatePhone(phone) {
  if (!phone.trim()) return "전화번호를 입력해 주세요.";

  // 하이픈 제거
  const cleaned = phone.replace(/-/g, "");

  // 휴대폰 번호 (010, 011, 016~019 등)
  const mobileRegex = /^01[0|1|6|7|8|9][0-9]{7,8}$/;

  // 지역번호 (02, 031, 032, 041, 051 등)
  const areaRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4])[0-9]{6,7}$/;

  if (!mobileRegex.test(cleaned) && !areaRegex.test(cleaned)) {
    return "지역에 맞는 전화번호 형식이 아닙니다.";
  }

  return "";
}


export function validatePassword(password) {
  if (!password.trim()) return "비밀번호를 입력해 주세요.";
  if (password.length < 8) return "비밀번호는 최소 8자 이상이어야 합니다.";
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  if (!regex.test(password)) return "비밀번호는 영문자와 숫자를 포함해야 합니다.";
  return "";
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword.trim()) return "비밀번호를 다시 입력해 주세요.";
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
  return "";
}
