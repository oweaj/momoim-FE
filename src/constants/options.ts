export const COMMON_REGIONS = [
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

export const REGIONS = [{ value: "ALL", label: "전체" }, ...COMMON_REGIONS] as const;

export const LOCATIONS = [
  { value: "ALL", label: "모든 지역" },
  { value: "ONLINE", label: "온라인" },
  ...COMMON_REGIONS,
] as const;

export const COMMON_CATEGORIES = [
  { value: "CULTURE", label: "문화/예술" },
  { value: "FOOD", label: "푸드" },
  { value: "SPORTS", label: "스포츠" },
  { value: "HOBBY", label: "취미" },
  { value: "TRAVEL", label: "여행" },
  { value: "STUDY", label: "스터디" },
  { value: "MEETING", label: "미팅" },
] as const;

export const CATEGORIES = [{ value: "ALL", label: "전체" }, ...COMMON_CATEGORIES] as const;

export const HOME_CATEGORIES = [
  { value: "ALL", label: "전체" },
  { value: "RECOMMEND", label: "추천" },
  ...COMMON_CATEGORIES,
] as const;

export const SUB_CATEGORIES = {
  CULTURE: [
    { value: "MOVIE", label: "영화" },
    { value: "CONCERT", label: "콘서트" },
    { value: "EXHIBITION", label: "전시" },
    { value: "PERFORMANCE", label: "공연" },
  ],
  FOOD: [
    { value: "RESTAURANT", label: "맛집투어" },
    { value: "COOKING", label: "요리" },
    { value: "BAKING", label: "베이킹" },
  ],
  SPORTS: [
    { value: "SOCCER", label: "축구" },
    { value: "BASKETBALL", label: "농구" },
    { value: "BASEBALL", label: "야구" },
    { value: "BIKE", label: "자전거" },
    { value: "GOLF", label: "골프" },
    { value: "RUNNING", label: "러닝" },
    { value: "FITNESS", label: "헬스" },
    { value: "DIET", label: "다이어트" },
    { value: "YOGA", label: "요가" },
    { value: "PILATES", label: "필라테스" },
    { value: "SWIMMING", label: "수영" },
  ],
  HOBBY: [
    { value: "PET", label: "반려동물" },
    { value: "BOOK", label: "독서" },
    { value: "MUSIC", label: "음악" },
    { value: "PHOTO", label: "사진" },
    { value: "GAME", label: "게임" },
    { value: "DANCE", label: "댄스" },
    { value: "CRAFTING", label: "공예" },
    { value: "MEDIA", label: "미디어" },
    { value: "SUB_CULTURE", label: "서브컬쳐" },
  ],
  TRAVEL: [
    { value: "HIKING", label: "등산" },
    { value: "FISHING", label: "낚시" },
    { value: "CAMPING", label: "캠핑" },
    { value: "DOMESTIC", label: "국내여행" },
    { value: "INTERNATIONAL", label: "해외여행" },
  ],
  STUDY: [
    { value: "LANGUAGE", label: "외국어" },
    { value: "FINANCE", label: "재테크" },
    { value: "SELF_DEVELOP", label: "자기계발" },
  ],
  MEETING: [
    { value: "LOVE", label: "연애" },
    { value: "COFFEE_CHAT", label: "커피챗" },
    { value: "INTERVIEW", label: "면접/인터뷰" },
  ],
};

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
  { value: "ZOOM", label: "ZOOM" },
  { value: "GOOGLEMEET", label: "구글밋" },
  { value: "ZEP", label: "ZEP" },
  { value: "ETC", label: "기타" },
] as const;

export const REVIEW_SORT_OPTIONS = [
  { value: "UPDATE_AT", label: "최신순" },
  { value: "SCORE", label: "평점순" },
] as const;
