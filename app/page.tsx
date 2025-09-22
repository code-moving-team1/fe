import CardHeaderMover from "@/components/common/card/CardMover";
import CompletedMoverCard from "@/components/common/card/CompletedMoveCard";
import CustomerEstimateCard from "@/components/common/card/CustomerEstimateCard";
import EstimateHistoryCard from "@/components/common/card/EstimateHistoryCard";
import ReceivedRequestCard from "@/components/common/card/ReceivedRequestCard";
import RejectedRequestCard from "@/components/common/card/RejectedRequestCard";
import WaitingRequestCard from "@/components/common/card/WaitingRequestCard";
export default function Home() {
  return (
    <div>
      <ReceivedRequestCard
        customerName="이름"
        from="북극"
        to="남극"
        movingDate="2025년 11월 07일 (금)"
        requestTime="1시간 전"
        moveType="소형이사"
        requestType="지정 견적 요청"
        className="ml-8 mt-5"
      />
      <CardHeaderMover
        driverName="김기사"
        description="돈 많이주면 어디든 갑니다"
        rating={5.0}
        reviewCount={178}
        careerYears={7}
        confirmedCount={334}
        className="ml-8 mt-6"
      />

      <CustomerEstimateCard
        customerName="김김김"
        from="인천"
        to="부천"
        movingDate="2025년 09월 22일 (월)"
        moveType="소형이사"
        requestType="지정 견적 요청"
        price={180000}
        className="mt-4 ml-8"
      />

      <CompletedMoverCard
        customerName="감감감"
        from="서울시 중구"
        to="경기도 수원시"
        movingDate="2025년 09월 22일 (월)"
        moveType="소형이사"
        requestType="지정 견적 요청"
        price={180000}
        className="mt-4 ml-8"
      />

      <RejectedRequestCard
        customerName="아아아아"
        from="부산"
        to="인천"
        movingDate="2025년 09월 22일 (월)"
        moveType="소형이사"
        requestType="지정 견적 요청"
        price={180000}
        className="mt-4 ml-8"
      />

      <WaitingRequestCard
        driverName="김코드"
        description="경력 7년으로 안전하게 운송합니다."
        avatarUrl="/assets/profile.svg"
        rating={5.0}
        reviewCount={178}
        careerYears={7}
        confirmedCount={334}
        price={180000}
        likeCount={136}
        moveType="소형이사"
        requestType="지정 견적 요청"
        className="mt-4 ml-8"
      />

      <EstimateHistoryCard
        message="고객님의 물품을 안전하게 운송해 드립니다."
        driverName="김코드"
        avatarUrl="/assets/profile.svg"
        rating={5.0}
        reviewCount={178}
        careerYears={7}
        confirmedCount={334}
        liked={136}
        price={180000}
        className="mt-4 ml-8"
        status="confirmed"
      />
    </div>
  );
}
