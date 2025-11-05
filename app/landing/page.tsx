export default function Home() {
  return (
    <div className="mx-auto max-w-[1920px]">
      {/* --------- Landing Banner --------- */}

      <div className="grid h-[315px] place-items-center md:h-[405px] lg:h-[405px]">
        <img
          src="/assets/landing-banner.svg"
          alt="배경 이미지"
          className="overlay-text col-start-1 row-start-1 h-full object-cover"
        />
        <div className="col-start-1 row-start-1 flex w-[265px] shrink-0 flex-col items-center justify-center gap-2 text-center md:w-[431px] md:gap-4">
          <h1 className="mt-[50px] min-w-0 text-[20px] leading-8 font-bold text-[#FFFFFF] md:mt-[100px] md:text-[32px] md:leading-[46px]">
            이사 업체 어떻게 고르세요?
          </h1>
          <p className="mt-2 min-w-0 text-[16px] leading-[26px] text-[#D9D9D9] md:text-[18px]">
            무빙은 여러 견적을 한눈에 비교해
            <br />
            이사업체 선정 과정을 간편하게 바꿔드려요
          </p>
        </div>
      </div>

      {/* --------- Landing Card --------- */}
      <div className="mx-auto mt-[60px] flex max-w-[1400px] flex-col justify-center gap-10 md:mt-[150px] md:flex-row md:items-center md:gap-[170px] md:px-[5px]">
        <p className="ml-5 shrink-0 font-bold text-[#262524] sm:text-[20px] md:text-[32px]">
          번거로운 선정과정,
          <br />
          이사 유형부터 선택해요
        </p>
        <div className="mx-auto">
          <img
            src="/assets/landing-card.svg"
            className="hidden sm:block"
            alt="배경카드"
          ></img>
          <img
            src="/assets/landing-card-sm.png"
            className="block object-cover sm:hidden"
            alt="배경카드"
          ></img>
        </div>
      </div>

      {/* --------- Landing Hero --------- */}

      <div className="relative mx-auto mt-20 flex max-w-[1400px] md:mt-[120px] md:px-[30px]">
        <p className="absolute right-[10%] mt-[30px] h-[92px] w-[382px] text-right font-bold text-white sm:text-[20px] md:mt-[50px] md:text-[32px] lg:right-[15%] lg:mt-[10%] lg:text-left">
          원하는 이사 서비스를 요청하고
          <br />
          견적을 받아보세요
        </p>
        <div className=" ">
          <img src="/assets/landing-hero_sm.png" alt="landing-hero_sm"
          className="block md:hidden"/>
          <img
            src="/assets/landing-hero_md.png" alt="landing-hero_md"
            className="hidden md:block lg:hidden"
          />
          <img src="/assets/landing-hero.svg" alt="landing-hero"
          className="hidden lg:block"/>
        </div>
      </div>

      {/* --------- Landing Preview --------- */}
      <div className="relative flex max-w-[1920px]">
        <p className="absolute ml-[35px] shrink-0 font-bold text-[#262524] sm:mt-[60px] sm:text-[20px] md:mt-[100px] md:text-[32px] lg:mt-[5%] lg:ml-[15%]">
          여러 업체의 견적을
          <br />
          한눈에 비교하고 선택해요
        </p>
        <div className=" ">
          <img
            src="/assets/landing-preview_sm.png" alt="landing-preview_sm"
            className="block md:hidden"
          />
          <img
            src="/assets/landing-preview_md.png" alt="landing-preview_md"
            className="hidden md:block lg:hidden" 
          />
          <img src="/assets/landing-preview.svg" alt="landing-preview"
          className="hidden lg:block" 
          />
        </div>
      </div>

      {/* --------- Footer --------- */}
      <div className="flex items-center bg-linear-to-r from-[#F95D2E] to-[#F9502E] py-[87px]">
        <div className="mx-auto flex flex-col items-center md:gap-8">
          <div className="flex h-[100px] w-[100px]">
            <img
              src="/favicon.ico"
              alt="앱 아이콘"
              className="hidden md:block"
            />
            <img
              src="assets/app-Icon-sm.svg"
              alt="앱 아이콘"
              className="block md:hidden"
            />
          </div>
          <div className="hidden text-center text-[20px] font-bold text-white md:block md:text-[28px]">
            복잡한 이사 준비, 무빙 하나면 끝!
          </div>
          <div className="block text-center text-[20px] font-bold text-white md:hidden md:text-[28px]">
            복잡한 이사 준비, <br></br>무빙 하나면 끝!
          </div>
        </div>
      </div>
    </div>
  );
}
