// "use client";

// import BaseModal from "@/components/common/modal/BaseModal";
// import DesignationEstimateModal from "@/components/common/modal/DesignationEstimateModal";
// import RejectRequestModal from "@/components/common/modal/RejectRequestModal";
// import SendEstimateModal from "@/components/common/modal/SendEstimateModal";
// import CardHeaderMover from "@/components/common/card/CardMover";
// import CompletedMoverCard from "@/components/common/card/CompletedMoveCard";
// import CustomerEstimateCard from "@/components/common/card/CustomerEstimateCard";
// import EstimateHistoryCard from "@/components/common/card/EstimateHistoryCard";
// import ReceivedRequestCard from "@/components/common/card/ReceivedRequestCard";
// import RejectedRequestCard from "@/components/common/card/RejectedRequestCard";
// import WaitingRequestCard from "@/components/common/card/WaitingRequestCard";
// import { useEstimateStore } from "@/store/estimateStore";

// export default function TestPage() {
//   const { date, departure, destination, moveType } = useEstimateStore();
//   return (
//     <div className="space-y-6 p-10">
//       <div className="mt-10 rounded-lg p-6">
//         <h1 className="text-xl font-bold">Zustand 테스트</h1>
//         <p>선택된 날짜: {date ?? "없음"}</p>
//         <p>출발지: {departure || "없음"}</p>
//         <p>도착지: {destination || "없음"}</p>
//         <p>이사 유형: {moveType || "없음"}</p>
//       </div>
//       <BaseModal
//         trigger={
//           <button className="rounded-lg bg-red-500 px-4 py-2 text-white">
//             Base Modal 열기
//           </button>
//         }
//         title="Base Modal"
//         description="d"
//         textAreaLabel="내용 입력"
//         confirmText="확인"
//       ></BaseModal>
//       <DesignationEstimateModal />

//       <RejectRequestModal
//         trigger={
//           <button className="rounded-lg bg-orange-500 px-4 py-2 text-white">
//             반려 요청 모달 열기
//           </button>
//         }
//         customerName="홍길동"
//         departure="서울"
//         destination="부산"
//         moveDate="2025-10-01"
//         chips={[
//           { label: "소형 이사", iconSrc: "/icons/ic_box.svg" },
//           { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
//         ]}
//       />

//       <SendEstimateModal
//         trigger={
//           <button className="rounded-lg bg-yellow-500 px-4 py-2 text-white">
//             견적 보내기 모달 열기
//           </button>
//         }
//         customerName="김김김"
//         departure="인천"
//         destination="대구"
//         moveDate="2025-10-05"
//         chips={[
//           { label: "소형 이사", iconSrc: "/icons/ic_box.svg" },
//           { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
//         ]}
//       />
//       <ReceivedRequestCard
//         customerName="이름"
//         from="북극"
//         to="남극"
//         movingDate="2025년 11월 07일 (금)"
//         requestTime="1시간 전"
//         chips={[
//           { label: "소형 이사", iconSrc: "/icons/ic_box.svg" },
//           { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
//         ]}
//         requestType="지정 견적 요청"
//         className="mt-5 ml-8"
//       />
//       <CardHeaderMover
//         driverName="김기사"
//         description="돈 많이주면 어디든 갑니다"
//         rating={5.0}
//         reviewCount={178}
//         careerYears={7}
//         confirmedCount={334}
//         className="mt-6 ml-8"
//       />

//       <CustomerEstimateCard
//         customerName="김김김"
//         from="인천"
//         to="부천"
//         movingDate="2025년 09월 22일 (월)"
//         chips={[
//           { label: "소형 이사", iconSrc: "/icons/ic_box.svg" },
//           { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
//         ]}
//         requestType="지정 견적 요청"
//         price={180000}
//         className="mt-4 ml-8"
//         moveType={""}
//       />

//       <CompletedMoverCard
//         customerName="감감감"
//         from="서울시 중구"
//         to="경기도 수원시"
//         movingDate="2025년 09월 22일 (월)"
//         moveType="소형이사"
//         requestType="지정 견적 요청"
//         price={180000}
//         className="mt-4 ml-8"
//       />

//       <RejectedRequestCard
//         customerName="아아아아"
//         from="부산"
//         to="인천"
//         movingDate="2025년 09월 22일 (월)"
//         moveType="소형이사"
//         requestType="지정 견적 요청"
//         price={180000}
//         className="mt-4 ml-8"
//       />

//       <WaitingRequestCard
//         driverName="김코드"
//         description="경력 7년으로 안전하게 운송합니다."
//         avatarUrl="/assets/profile.svg"
//         rating={5.0}
//         reviewCount={178}
//         careerYears={7}
//         confirmedCount={334}
//         price={180000}
//         likeCount={136}
//         moveType="소형이사"
//         requestType="지정 견적 요청"
//         className="mt-4 ml-8"
//       />

//       <EstimateHistoryCard
//         message="고객님의 물품을 안전하게 운송해 드립니다."
//         driverName="김코드"
//         avatarUrl="/assets/profile.svg"
//         rating={5.0}
//         reviewCount={178}
//         careerYears={7}
//         confirmedCount={334}
//         liked={136}
//         price={180000}
//         className="mt-4 ml-8"
//         status="confirmed"
//       />
//     </div>
//   );
// }
