/* The track:design tickets on GitHub and today's slot, one list for the Project page, the daily update and the Figma
   board (the plugin reads the same entries). Checked against GitHub and the code on main.
   bucket: done (merged today), today (in the slot), call (needs a team call), close (done, ready to close), after (after the submission). */
window.GOLDITO_TICKETS = {
  "checked": "2026-10-24",
  "tickets": [
    {
      "n": 329,
      "bucket": "done",
      "title": [
        "Nav: Chat gets its own tab",
        "내비게이션: 채팅 탭"
      ],
      "status": [
        "Merged",
        "머지됨"
      ],
      "owner": [
        "Minsik built it (#340)",
        "민식님이 만듦 (#340)"
      ],
      "done": [
        "Five tabs: Home, Bookings, Chat, Feed, Snap. Diary moved inside Feed, chats left Bookings, and Chat uses the square bubble with a paw. Snap stays a tab; the top-left version is saved.",
        "탭 다섯: 홈, 예약, 채팅, 피드, 스냅. 다이어리는 피드 안으로, 채팅은 예약에서 빠지고, 채팅은 발바닥 네모 말풍선. 스냅은 탭 그대로; 왼쪽 위 버전은 저장."
      ],
      "next": [
        "Done (#340, Oct 23).",
        "완료 (#340, 10/23)."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/pull/340",
          "PR #340"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/issues/329",
          "#329"
        ],
        [
          "nav-trial.html",
          "Nav trial"
        ]
      ]
    },
    {
      "n": 182,
      "bucket": "done",
      "title": [
        "Avoid AI-typical emoji in the Bookings tab",
        "예약 탭에서 AI 느낌 이모지 빼기"
      ],
      "status": [
        "Merged",
        "머지됨"
      ],
      "owner": [
        "Mook; merged by Minsik",
        "무크; 민식님 머지"
      ],
      "done": [
        "No AI-typical emoji left in the Bookings tab: calm empty-state emoji, the warning line icon on Heads-up, Meet & Greet set without the check mark.",
        "예약 탭에 AI 느낌 이모지 없음: 차분한 빈 화면 이모지, Heads-up에 경고 선 아이콘, Meet & Greet 확정에 체크 표시 없음."
      ],
      "next": [
        "Done (#336, Oct 23).",
        "완료 (#336, 10/23)."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/pull/336",
          "PR #336"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/issues/182",
          "#182"
        ]
      ]
    },
    {
      "n": 114,
      "bucket": "done",
      "title": [
        "Goldito sticker set",
        "Goldito 스티커 세트"
      ],
      "status": [
        "Merged",
        "머지됨"
      ],
      "owner": [
        "Mook; merged by Minsik",
        "무크; 민식님 머지"
      ],
      "done": [
        "The nine designed pixel stickers replace the placeholders, same file names. Checked in the diary's sticker tray; 26 sticker, Snap and diary tests pass.",
        "디자인한 픽셀 스티커 9개가 같은 파일 이름으로 자리표시를 대체. 다이어리 스티커 칸에서 확인; 스티커, 스냅, 다이어리 테스트 26개 통과."
      ],
      "next": [
        "Done (#337, Oct 23). The stickers are in the app.",
        "완료 (#337, 10/23). 스티커가 앱에 있어요."
      ],
      "img": "assets/notes-1023/c-stickers.jpg",
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/pull/337",
          "PR #337"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/issues/114",
          "#114"
        ],
        [
          "sketches.html#stickers",
          "Sketch"
        ]
      ]
    },
    {
      "n": 181,
      "bucket": "today",
      "title": [
        "Shorter booking cards, past stays below",
        "짧은 예약 카드, 지난 스테이는 아래"
      ],
      "status": [
        "PR open",
        "PR 열림"
      ],
      "owner": [
        "Minsik reviews",
        "민식님 리뷰"
      ],
      "done": [
        "Active bookings already use the new ticket card and Past is folded (#343). The past-stay card now reads \"Oct 5 to 8 at Chloe's place\" and \"You drive over · Chloe brings them home\": the place once, no car emoji. 66 booking tests pass.",
        "진행 중인 예약은 새 티켓 카드, 지난 예약은 접힘 (#343). 지난 스테이 카드는 이제 \"Oct 5 to 8 at Chloe's place\", \"You drive over · Chloe brings them home\": 장소 한 번, 자동차 이모지 없음. 예약 테스트 66개 통과."
      ],
      "next": [
        "Minsik reviews and merges #353 (Closes #181).",
        "민식님이 #353 리뷰하고 머지 (Closes #181)."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/pull/353",
          "PR #353"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/issues/181",
          "#181"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/issues/231",
          "#231"
        ]
      ],
      "img": "assets/notes-1023/c-cards.jpg"
    },
    {
      "n": 293,
      "bucket": "today",
      "title": [
        "AI-typical emoji outside the Bookings tab",
        "예약 탭 밖의 AI 느낌 이모지"
      ],
      "status": [
        "PR open",
        "PR 열림"
      ],
      "owner": [
        "Minsik reviews",
        "민식님 리뷰"
      ],
      "done": [
        "45 spots: words instead of emoji (\"Suggested\", buttons are words) and Lucide icons for statuses, Heads-up, Life Record and care lines (check, clock, x, warning, meal, pill, paw, tip). Full test suite passes.",
        "45곳: 이모지 대신 글자 (\"Suggested\", 버튼은 글자), 상태, 주의, Life Record, 케어 줄은 Lucide 아이콘 (체크, 시계, x, 경고, 식사, 약, 발, 팁). 전체 테스트 통과."
      ],
      "next": [
        "Minsik reviews and merges #352 (Refs #293).",
        "민식님이 #352 리뷰하고 머지 (Refs #293)."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/pull/352",
          "PR #352"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/issues/293",
          "#293"
        ]
      ]
    },
    {
      "n": 112,
      "bucket": "close",
      "title": [
        "Scenario screens in Figma",
        "Figma의 시나리오 화면"
      ],
      "status": [
        "Done",
        "완료"
      ],
      "owner": [
        "Mook",
        "무크"
      ],
      "done": [
        "The plugin builds every Expressive screen of the stay, stages 1 to 5, from the Expressive components, and flags what changed on each run.",
        "플러그인이 스테이 1~5단계의 Expressive 화면을 모두 컴포넌트로 만들고 실행마다 바뀐 것을 표시."
      ],
      "next": [
        "Close with a link to the Screens page.",
        "Screens 페이지 링크와 함께 닫기."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/112",
          "#112"
        ]
      ]
    },
    {
      "n": 113,
      "bucket": "close",
      "title": [
        "Sample photo set",
        "샘플 사진 세트"
      ],
      "status": [
        "Done",
        "완료"
      ],
      "owner": [
        "Mook and Seulgi",
        "무크, 슬기님"
      ],
      "done": [
        "Meals, walks, naps, handoff shots, fictional treat labels and mood photos are on main; #333 added cats and put every sample in every picker.",
        "식사, 산책, 낮잠, 인계 사진, 가상 간식 라벨, 기분 사진이 main에; #333이 고양이를 더하고 모든 선택기에 넣음."
      ],
      "next": [
        "Close. The breed photos for pet chips are new scope, a small issue of their own.",
        "닫기. 펫 칩용 품종 사진은 새 범위로 따로 작은 이슈."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/113",
          "#113"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/pull/333",
          "#333"
        ]
      ]
    },
    {
      "n": 115,
      "bucket": "close",
      "title": [
        "Large-text onboarding and the at-a-glance card",
        "큰 글씨 온보딩과 한눈에 보기 카드"
      ],
      "status": [
        "Done",
        "완료"
      ],
      "owner": [
        "Minsik (build polish)",
        "민식님 (마무리)"
      ],
      "done": [
        "The design shipped: one question per screen, 64 px options, the five-axis at-a-glance card, warnings first for the sitter (#255 and follow-ups).",
        "디자인이 반영됨: 화면당 질문 하나, 64px 선택지, 다섯 축 카드, 시터에게 주의사항 먼저 (#255와 후속)."
      ],
      "next": [
        "Close. #332 and #334 are build polish under their own owners.",
        "닫기. #332, #334는 각자 담당의 마무리 작업."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/115",
          "#115"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/pull/255",
          "#255"
        ]
      ]
    },
    {
      "n": 119,
      "bucket": "close",
      "title": [
        "Coat-colour skins and pixel pets",
        "털 색 스킨과 픽셀 펫"
      ],
      "status": [
        "Done in code",
        "코드에 반영"
      ],
      "owner": [
        "Minsik built it",
        "민식님이 만듦"
      ],
      "done": [
        "#261 and #275: pixel pet rooms on both Homes, 8 coat palettes, breed heads, colours from the pet's photo, moods and poses.",
        "#261, #275: 양쪽 홈에 픽셀 펫 방, 털 팔레트 8개, 품종 머리, 사진에서 뽑은 색, 기분과 자세."
      ],
      "next": [
        "Close. A visual rework stays on hold until after the submission.",
        "닫기. 그림 손질은 제출 후까지 보류."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/119",
          "#119"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/pull/261",
          "#261"
        ]
      ]
    },
    {
      "n": 179,
      "bucket": "close",
      "title": [
        "One calendar in sitter search",
        "시터 검색의 캘린더 하나"
      ],
      "status": [
        "Done another way",
        "다른 방식으로 완료"
      ],
      "owner": [
        "JeonBeomGu-S (assigned)",
        "JeonBeomGu-S (담당)"
      ],
      "done": [
        "#200 and #279: a one-line search bar with one range calendar and quick picks, results right under it. Exact times stay, to match the sitter's slots.",
        "#200, #279: 한 줄 검색 바, 범위 캘린더 하나와 빠른 선택, 결과가 바로 아래. 시터 시간대와 맞추려고 정확한 시간은 유지."
      ],
      "next": [
        "Close with a note: the bar replaces the form, so there is nothing left to fold.",
        "메모와 함께 닫기: 바가 폼을 대신해 접을 것이 없음."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/179",
          "#179"
        ],
        [
          "https://github.com/minsikpaul92/Goldito/pull/200",
          "#200"
        ]
      ]
    },
    {
      "n": 111,
      "bucket": "call",
      "title": [
        "Judge side panel beside the phone",
        "폰 옆 심사위원 패널"
      ],
      "status": [
        "Design done",
        "디자인 완료"
      ],
      "owner": [
        "Minsik decides",
        "민식님 결정"
      ],
      "done": [
        "Frames, the phone frame and backdrop, and split view are on main. The side panel is designed on the judge panel page; it isn't built.",
        "프레임, 폰 프레임과 배경, 분할 화면은 main에. 옆 패널은 심사위원 패널 페이지에 디자인됨; 아직 안 만듦."
      ],
      "next": [
        "Minsik: does the panel ship next to split view? Yes: half a day for a helper. No: close #111.",
        "민식님: 분할 화면 옆에 패널을 넣을까요? 예: 도우미 반나절. 아니오: #111 닫기."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/111",
          "#111"
        ],
        [
          "judge-panel.html",
          "Judge panel"
        ]
      ]
    },
    {
      "n": 116,
      "bucket": "call",
      "title": [
        "Demo video",
        "데모 영상"
      ],
      "status": [
        "Needs an owner",
        "담당 필요"
      ],
      "owner": [
        "Minsik records, Mook edits",
        "민식님 녹화, 무크 편집"
      ],
      "done": [
        "Shot list and story cards (about 2:55) and the run sheet are ready. The submission checklist that owned recording (#307) was closed.",
        "샷 리스트와 이야기 카드 (약 2:55), 진행표 준비됨. 녹화를 맡던 제출 체크리스트 (#307)가 닫힘."
      ],
      "next": [
        "Lock today who records and when (Oct 26 or 27). Mook edits Oct 27 to 28 and leaves Oct 29.",
        "오늘 누가 언제 녹화할지 정하기 (10/26 또는 10/27). 무크는 10/27~28 편집, 10/29 떠남."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/116",
          "#116"
        ],
        [
          "video.html",
          "Shot list"
        ]
      ]
    },
    {
      "n": 330,
      "bucket": "call",
      "title": [
        "Booking: one question per screen",
        "예약: 화면당 질문 하나"
      ],
      "status": [
        "Team call",
        "팀 결정"
      ],
      "owner": [
        "Minsik and Seulgi, by Oct 24",
        "민식님, 슬기님, 10/24까지"
      ],
      "done": [
        "Playable six-step flow; the parts merged in #279; Figma ticket.",
        "체험 가능한 6단계 흐름; 부품은 #279로 머지; 피그마 티켓."
      ],
      "next": [
        "Yes: a helper builds it Oct 25 to 26. No: after the submission.",
        "예: 도우미가 10/25~26에 만듦. 아니오: 제출 후."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/330",
          "#330"
        ],
        [
          "booking-flow.html",
          "Booking flow"
        ]
      ]
    },
    {
      "n": 118,
      "bucket": "after",
      "title": [
        "Report card themes",
        "리포트 카드 테마"
      ],
      "status": [
        "After the submission",
        "제출 후"
      ],
      "owner": [
        "Mook",
        "무크"
      ],
      "done": [
        "Sketched; the diary book shipped without themes. The #114 stickers are what judges will see.",
        "스케치만; 다이어리 책은 테마 없이 반영. 심사위원은 #114 스티커를 보게 됨."
      ],
      "next": [
        "Close as after the submission, or keep it open with a note.",
        "제출 후로 닫거나, 메모와 함께 열어 두기."
      ],
      "links": [
        [
          "https://github.com/minsikpaul92/Goldito/issues/118",
          "#118"
        ],
        [
          "sketches.html#themes",
          "Sketch"
        ]
      ]
    }
  ]
};
