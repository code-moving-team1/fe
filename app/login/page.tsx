// app/login/page.tsx
"use client";

import CarLoader from "@/components/common/loader/CarLoader";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단: CarLoader */}
      <div className="flex justify-center pt-10">
        {/* max width를 주면 가운데 정렬 느낌이 안정적 */}
        <div className="w-full max-w-3xl px-4">
          <CarLoader height={400} duration={3.0} cars={4} stagger={0.35} />
        </div>
      </div>

      {/* 하단: 로그인 카드 2개 */}
      <div className="mt-10 flex justify-center px-4">
        <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* 고객 로그인 */}
          <Link
            href="/login/customer"
            className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-12 shadow-md transition hover:shadow-lg"
          >
            <span className="text-2xl font-bold text-blue-600">
              고객 로그인
            </span>
            <p className="mt-2 text-sm text-gray-500">
              견적 요청하고 기사님을 찾아보세요
            </p>
          </Link>

          {/* 기사 로그인 */}
          <Link
            href="/login/mover"
            className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-12 shadow-md transition hover:shadow-lg"
          >
            <span className="text-2xl font-bold text-green-600">
              기사 로그인
            </span>
            <p className="mt-2 text-sm text-gray-500">
              고객 요청을 확인하고 견적을 보내보세요
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

// // app/login/page.tsx
// "use client";

// import CarLoader from "@/components/common/loader/CarLoader";
// import Link from "next/link";

// export default function LoginPage() {
//   return (
//     <div>
//       <div className="flex h-screen items-center justify-center bg-gray-50">
//         <CarLoader height={120} duration={1.1} cars={4} stagger={0.35} />
//         <div className="grid w-full max-w-3xl grid-cols-2 gap-8">
//           {/* 고객 로그인 */}
//           <Link
//             href="/login/customer"
//             className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-12 shadow-md transition hover:shadow-lg"
//           >
//             <span className="text-2xl font-bold text-blue-600">
//               고객 로그인
//             </span>
//             <p className="mt-2 text-sm text-gray-500">
//               견적 요청하고 기사님을 찾아보세요
//             </p>
//           </Link>

//           {/* 기사 로그인 */}
//           <Link
//             href="/login/mover"
//             className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-12 shadow-md transition hover:shadow-lg"
//           >
//             <span className="text-2xl font-bold text-green-600">
//               기사 로그인
//             </span>
//             <p className="mt-2 text-sm text-gray-500">
//               고객 요청을 확인하고 견적을 보내보세요
//             </p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
