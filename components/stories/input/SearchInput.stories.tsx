import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "../../common/input/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Common/Input/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
어디서 사용하나
- 지역 검색, 후기 검색, 견적 요청 검색 등 **입력 후 검색 동작이 필요한 페이지**에서 사용합니다.
- 예: '이사업체 검색', '보낸 견적 내 검색', '리뷰 목록 검색' 등의 필드에 적합합니다.

어떻게 사용하나
- placeholder, onSearch, onChange 등의 props를 통해 검색 입력창을 제어합니다.
- Enter 키나 검색 아이콘 클릭 시 onSearch(value)가 호출됩니다.
- 초기화 아이콘을 통해 입력 내용을 한 번에 지울 수 있습니다.

사용 예시
- SearchInput placeholder="검색어를 입력하세요"
- SearchInput placeholder="지역을 입력하세요" onSearch={(v) => alert("검색 실행: " + v)}

특징
- TailwindCSS 기반으로 border, background 등 커스터마이징 가능
- 검색 및 초기화 아이콘 포함
- props로 스타일 클래스 추가 가능 (className)
- 입력값 변경, 검색 이벤트 모두 외부에서 제어 가능

접근성
- input 요소에 label 연결 또는 aria-label 제공 가능
- 키보드 Enter 입력 시 검색 기능 동작
- focus 시 명확한 outline으로 시각적 피드백 제공
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

/* ------------------------------ 기본 상태 ------------------------------ */
export const Default: Story = {
  render: () => <SearchInput placeholder="검색어를 입력하세요" />,
};

/* ------------------------------ 검색 기능 ------------------------------ */
export const WithSearchAction: Story = {
  render: () => (
    <SearchInput
      placeholder="지역을 입력하세요"
      onSearch={(value) => alert(`검색 실행: ${value}`)}
    />
  ),
};

/* ------------------------------ 커스텀 스타일 ------------------------------ */
export const CustomStyle: Story = {
  render: () => (
    <SearchInput
      placeholder="커스텀 스타일 검색창"
      className="border border-gray-300 bg-gray-100"
    />
  ),
};
