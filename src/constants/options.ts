export const REGIONS = [
  { value: "ALL", label: "전체" },
  { value: "SEOUL", label: "서울" },
  { value: "BUSAN", label: "부산" },
  { value: "DAEGU", label: "대구" },
  { value: "INCHEON", label: "인천" },
  { value: "GWANGJU", label: "광주" },
  { value: "DAEJEON", label: "대전" },
  { value: "ULSAN", label: "울산" },
  { value: "SEJONG", label: "세종" },
  { value: "GYEONGGI", label: "경기" },
  { value: "GANGWON", label: "강원" },
  { value: "CHUNGCHEONGBUK", label: "충북" },
  { value: "CHUNGCHEONGNAM", label: "충남" },
  { value: "JEONBUK", label: "전북" },
  { value: "JEOLLANAM", label: "전남" },
  { value: "GYEONGSANGBUK", label: "경북" },
  { value: "GYEONGNAM", label: "경남" },
  { value: "JEJU", label: "제주" },
] as const;

export const CATEGORIES = [
  { value: "ALL", label: "전체" },
  { value: "CULTURE", label: "문화/예술" },
  { value: "FOOD", label: "푸드" },
  { value: "SPORTS", label: "스포츠" },
  { value: "HOBBY", label: "취미" },
  { value: "TRAVEL", label: "여행" },
  { value: "STUDY", label: "스터디" },
  { value: "MEETING", label: "미팅" },
] as const;

export const GATHERING_SORT_OPTIONS = [
  { value: "UPDATE_AT", label: "최신순" },
  { value: "PARTICIPANT_COUNT", label: "인원순" },
] as const;

export const GATHERING_TYPE = [
  { value: "ALL", label: "전체" },
  { value: "OFFLINE", label: "오프라인" },
  { value: "ONLINE", label: "온라인" },
] as const;

export const ONLINE_PLATFORM = [
  { value: "DISCORD", label: "디스코드" },
  { value: "ZOOM", label: "줌" },
  { value: "GOOGLEMEET", label: "구글밋" },
  { value: "ZEP", label: "ZEP" },
  { value: "ETC", label: "기타" },
] as const;

export const REVIEW_SORT_OPTIONS = [
  { value: "UPDATE_AT", label: "최신순" },
  { value: "SCORE", label: "평점순" },
] as const;
