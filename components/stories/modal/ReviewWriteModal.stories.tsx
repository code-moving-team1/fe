import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ReviewWriteModal from "../../common/modal/ReviewWriteModal";
import { Buttons } from "../../common/button";

const meta: Meta<typeof ReviewWriteModal> = {
  title: "Common/Modal/ReviewWriteModal",
  component: ReviewWriteModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**어디서 사용하나**  
- 일반 유저의 **이사 리뷰 작성 페이지 → 작성 가능한 리뷰 탭**에서 사용됩니다.  
  사용자가 이사 완료 후 기사님에 대한 리뷰를 작성할 때 열리는 모달입니다.  
- 평점(별점), 후기 내용을 입력하고 제출할 수 있습니다.

**어떻게 사용하나**  
- \`trigger\` prop으로 모달을 열 트리거(예: 버튼)를 지정합니다.  
- \`moverName\`, \`moveTypes\`, \`fromAddress\`, \`toAddress\`, \`moveDateText\` 등의 정보를 전달합니다.  
- \`rating\`, \`reviewText\` 상태를 외부에서 관리하며, \`onChangeRating\`, \`onChangeReviewText\`로 제어합니다.  
- \`onSubmit\` 이벤트에서 서버 전송 또는 로컬 처리 로직을 연결합니다.

**사용 예시**
\`\`\`tsx
const [rating, setRating] = useState(0);
const [reviewText, setReviewText] = useState("");

<ReviewWriteModal
  trigger={<Buttons>리뷰 작성</Buttons>}
  moverName="이삿짐 센터"
  moveTypes={["small"]}
  fromAddress="서울 강남구"
  toAddress="부산 해운대구"
  moveDateText="2025-11-05"
  rating={rating}
  onChangeRating={setRating}
  reviewText={reviewText}
  onChangeReviewText={setReviewText}
  onSubmit={(value) => alert(\`리뷰 등록 완료! 내용: \${value}\`)}
/>
\`\`\`

**특징**
- 기사님 프로필, 경로, 날짜 등 **리뷰 맥락 정보 표시**  
- 별점(⭐)과 텍스트 입력의 직관적인 리뷰 작성 UI  
- TailwindCSS 기반으로 색상, 버튼 스타일, 입력창 등 커스터마이징 가능  
- \`submitting\` 상태를 이용해 로딩/비활성화 표시 가능  
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ReviewWriteModal>;

/* ------------------------------ 기본 예시 ------------------------------ */
export const Default: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (value: string) => {
      setSubmitting(true);
      await new Promise((res) => setTimeout(res, 1000));
      alert(`리뷰 등록 완료!\n평점: ${rating}\n내용: ${value}`);
      setSubmitting(false);
    };

    return (
      <ReviewWriteModal
        trigger={
          <Buttons className="bg-orange-500 text-white hover:bg-orange-600">
            리뷰 쓰기 모달 열기
          </Buttons>
        }
        moverName="이삿짐 센터"
        moverAvatarSrc="/images/sample-avatar.png"
        moveTypes={["small"]}
        fromAddress="서울특별시 강남구"
        toAddress="부산광역시 해운대구"
        moveDateText="2025-11-05"
        rating={rating}
        onChangeRating={setRating}
        reviewText={reviewText}
        onChangeReviewText={setReviewText}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    );
  },
};
