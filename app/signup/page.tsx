export default function SingUpPage() {
  return (

    <div className="bg-[#F9502E] h-[1488px] p-[45px] ">

<div className=" flex bg-[#FFFFFF] w-full max-w-[740px] mx-auto px-[40px] m-[40px] rounded-[20px] py-[48px] " >

<div className=" w-full flex gap-[48px] justify-center flex-col mx-auto text-[#474643]" >
<div className="flex flex-col justify-center text-center max-w-[640px] w-full gap-[8px]" >
    <div className="mx-auto h-[100px] ">
    <img src="/assets/logo.svg" alt="무빙 로고" width={200} height={80} ></img>
    </div>
    <div className=" flex flex-row gap-[8px] mx-auto text-[20px] w-[300px]">
    <p>기사님이신가요?</p> <a className="font-semibold underline text-[#F9502E]">기사님 전용 페이지</a>
    </div>
</div> 
        <div className="w-full max-w-[640px] gap-[24px] mx-auto">
  <form className="flex flex-col gap-[56px] mx-auto ">
    <div className=" w-full flex flex-col gap-[32px] mx-auto">
<div className="flex flex-col gap-[16px]">
      <label className="text-[20px]">이름</label>
      <input
        id="username"
        type="text"
        placeholder="성함을 입력해 주세요"
        className="w-full border border-[#E6E6E6] rounded-[16px] p-[14px] text-[16px] focus:outline-none focus:border-[#F9502E]"
      />
    </div>

    <div className="flex flex-col gap-[16px]">
      <label className="text-[20px]">이메일</label>
      <input
        id="email" type="email" placeholder="이메일을 입력해 주세요"
        className="w-full border border-[#E6E6E6] rounded-[16px] p-[14px] focus:outline-none focus:border-[#F9502E]"
      />
    </div>

    <div className="flex flex-col gap-[16px]">
      <label className="text-[20px]">전화번호</label>
        <input id="phone" type="tel" placeholder=" 전화번호를 입력해 주세요 " 
        className="w-full border border-[#E6E6E6] rounded-[16px] p-[14px] focus:outline-none focus:border-[#F9502E]"
      />
    </div>

    <div className="flex flex-col gap-[16px]">
      <label className="text-[20px]">비밀번호</label>
        <input id="password" type="password" placeholder=" 비밀번호를 입력해 주세요 "
        className="w-full border border-[#E6E6E6] rounded-[16px] p-[14px] focus:outline-none focus:border-[#F9502E]"
      />
    </div>

    <div className="flex flex-col gap-[16px]">
    <label className="text-[20px]">비밀번호 확인</label>
        <input id="confirmPassword" type="password" placeholder=" 비밀번호를 다시 한 번 입력해 주세요 "
        className="w-full border border-[#E6E6E6] rounded-[16px] p-[14px] focus:outline-none focus:border-[#F9502E]"
      />
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
         <p>이미 무빙 회원이신가요?</p><a className="font-semibold underline text-[#F9502E]">로그인</a> </div>
 
</div>

<div  className="flex flex-col gap-[32px] mx-auto text-center text-[20px]">
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