export default function SingUpPage() {
  return (

    <div className="bg-[#F9502E] h-[1488px] ">

<div className=" flex bg-[#FFFFFF] w-[720px] mx-auto py-[48px] justify-center flex-col  " >
<div className=" flex justify-center font-bold text-[#F9502E] text-[48px]  ">무빙</div>

<form className=" flex flex-col gap-[56px] w-[640px] px-[32px] justify-center mx-auto " >
        <div className=" flex flex-col gap-[16px] items-start ">
        <label>이름</label>
        <input id="username" type="text" placeholder=" 성함을 입력해 주세요" className="w-[640px]" />
        </div>

        <div className=" flex flex-col gap-[16px] items-start ">
       <label>이메일</label>
        <input id="email" type="email" placeholder=" 이메일을 입력해 주세요 " className="w-[640px]"/>
        </div>

        <div className=" flex flex-col gap-[16px] items-start ">
         <label>전화번호</label>
        <input id="phone" type="tel" placeholder=" 전화번호를 입력해 주세요 " className="w-[640px]" />
        </div>

        <div className=" flex flex-col gap-[16px] items-start ">
    <label>비밀번호</label>
    <input id="password" type="password" placeholder=" 비밀번호를 입력해 주세요 " className="w-[640px]" />
        </div>

        <div className=" flex flex-col gap-[16px] items-start ">
    <label>비밀번호 확인</label>
    <input id="confirmPassword" type="password" placeholder=" 비밀번호를 다시 한 번 입력해 주세요 " className="w-[640px]" />
        </div>

        <button type="submit" className="bg-[#cccccc]">회원가입</button> 
</form>
</div>

<div>아이콘이당</div>
    
    </div>


); 

}