document.addEventListener('DOMContentLoaded', function() {
    // Fullpage.js 설정
    new fullpage('#fullpage', {
        anchors: ['intro', 'email-input', 'project-details', 'helper-intro', 'helper-support', 'company-info'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['홈', '이메일 신청', '프로젝트 목차', '프로젝트 소개', '지원 내용', '회사 정보'],
        showActiveTooltip: true,
        scrollingSpeed: 600, // 스크롤 속도 증가
        fitToSection: true,
        scrollBar: false,
        touchSensitivity: 5, // 터치 감도 낮춤
        normalScrollElementTouchThreshold: 3,
        scrollOverflow: true,
        scrollOverflowOptions: {
            scrollbars: false,
        },
        
        // 연속 스크롤 방지
        onLeave: function(origin, destination, direction) {
            // 스크롤 중복 방지
            if (fullpage_api.getActiveSection().isMoving) {
                return false;
            }
            return true;
        },

        // 반응형 설정
        responsiveWidth: 768,
        afterResponsive: function(isResponsive) {
            if (isResponsive) {
                fullpage_api.setAutoScrolling(true);
                fullpage_api.setFitToSection(true);
            }
        }
    });

    // 신청하기 버튼 이벤트
    document.getElementById("applyButton").onclick = function() {
        fullpage_api.moveTo('email-input');
    };
    document.getElementById("applyButton").onclick = function() {
        // 이메일 입력 섹션으로 스크롤
        fullpage_api.moveTo('email-input');
    };

    document.getElementById("submitEmail").onclick = function() {
        const email = document.getElementById("emailInput").value;
        if (validateEmail(email)) {
            const encryptedEmail = encryptEmail(email); // 이메일 암호화 함수 호출
            const jsonData = JSON.stringify({ email: encryptedEmail });

            // 버튼 비활성화
            const submitButton = document.getElementById("submitEmail");
            submitButton.disabled = true;

            // 로딩 창 보여주기
            showLoading();

            fetch("https://runningtoyou.com/api/emailsend", { // API 주소 수정
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonData
            })
            .then(response => response.json())
            .then(data => {
                console.log("성공:", data);
                alert("이메일이 전송되었습니다. 이메일 부재시 다시 시도 바랍니다.");
                // 성공 후 메인 화면으로 이동
                fullpage_api.moveTo('intro'); // 다시 첫 페이지로 돌아가기
            })
            .catch((error) => {
                console.error("오류 발생:", error);
                alert("서버에 오류가 발생했습니다. 다시 시도해주세요.");
            })
            .finally(() => {
                // 로딩 창 숨기기
                hideLoading();
                // 버튼 다시 활성화
                submitButton.disabled = false;
            });
        } else {
            alert("유효한 이메일 주소를 입력해주세요.");
        }
    };
});

// 이메일 형식 검증 함수
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
}

function encryptEmail(email) {
    return btoa(email); // Base64 인코딩으로 해싱
}

// 로딩 창 보여주기
function showLoading() {
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.innerText = "잠시만 기다려주세요...";
    loadingDiv.style.position = "fixed";
    loadingDiv.style.top = "50%";
    loadingDiv.style.left = "50%";
    loadingDiv.style.transform = "translate(-50%, -50%)";
    loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    loadingDiv.style.color = "white";
    loadingDiv.style.padding = "20px";
    loadingDiv.style.borderRadius = "5px";
    loadingDiv.style.zIndex = "9999";
    document.body.appendChild(loadingDiv);
}

// 로딩 창 숨기기
function hideLoading() {
    const loadingDiv = document.getElementById("loading");
    if (loadingDiv) {
        loadingDiv.remove();
    }
}
