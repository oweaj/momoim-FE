import Link from "next/link";

export default function AuthButtons() {
  return (
    <>
      <li>
        <Link href="/login" className="font-semibold text-gray-900 hover:text-main-selected">
          로그인
        </Link>
      </li>
      <li>
        <Link href="/signup" className="font-semibold text-main hover:text-main-selected">
          회원가입
        </Link>
      </li>
    </>
  );
}
