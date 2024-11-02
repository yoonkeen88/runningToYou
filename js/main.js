document.addEventListener('DOMContentLoaded', function() {
    new fullpage('#fullpage', {
        licenseKey: 'YOUR_KEY_HERE', // 무료 버전은 이 줄을 삭제하세요
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: true,
        anchors: ['intro', 'email-input', 'project-details', 'company-info'],
        menu: '.menu nav',
        css3: true,
        scrollingSpeed: 700,
        fitToSection: true,
        paddingTop: '70px' // 상단 메뉴의 높이만큼 여백 추가
    });

    document.getElementById("applyButton").onclick = function() {
        // 이메일 입력 섹션으로 스크롤
        fullpage_api.moveTo('email-input');
    };

    document.getElementById("submitEmail").onclick = function() {
        const email = document.getElementById("emailInput").value;
        if (validateEmail(email)) {
            const encryptedEmail = encryptEmail(email); // 이메일 암호화 함수 호출
            const jsonData = JSON.stringify({ email: encryptedEmail });

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
