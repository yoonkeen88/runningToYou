document.addEventListener('DOMContentLoaded', function() {
    new fullpage('#fullpage', {
        licenseKey: 'YOUR_KEY_HERE', // 무료 버전은 이 줄을 삭제하세요
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: true,
        anchors: ['intro', 'project-details', 'company-info'],
        menu: '.menu nav',
        css3: true,
        scrollingSpeed: 700,
        fitToSection: true,
        paddingTop: '70px' // 상단 메뉴의 높이만큼 여백 추가
    });
});



document.getElementById("applyButton").onclick = function() {
    // 이메일 입력 섹션으로 스크롤
    fullpage_api.moveTo('email-input');
};

document.getElementById("submitEmail").onclick = function() {
    const email = document.getElementById("emailInput").value;
    if (email) {
        const encryptedEmail = encryptEmail(email);

        // JSON 데이터 준비
        const jsonData = JSON.stringify({ email: encryptedEmail });

        // 서버에 전송 (AJAX 예시)
        fetch("/submit-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            console.log("성공:", data);
            alert("이메일이 전송되었습니다.");
            // 성공 후 메인 화면으로 이동
            fullpage_api.moveTo('intro'); // 다시 첫 페이지로 돌아가기
        })
        .catch((error) => {
            console.error("오류 발생:", error);
        });
    } else {
        alert("이메일을 입력해주세요.");
    }
};
