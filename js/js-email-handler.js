// Email validation and submission
import { validateEmail, encryptEmail } from './utils.js';
import { showLoading, hideLoading } from './loading.js';

export function initEmailHandler() {
    document.getElementById("submitEmail").onclick = async function() {
        const email = document.getElementById("emailInput").value;
        if (!validateEmail(email)) {
            alert("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        const submitButton = document.getElementById("submitEmail");
        submitButton.disabled = true;
        showLoading();

        try {
            const encryptedEmail = encryptEmail(email);
            const response = await fetch("https://runningtoyou.com/api/emailsend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: encryptedEmail })
            });

            const data = await response.json();
            console.log("성공:", data);
            alert("이메일이 전송되었습니다. 이메일 부재시 다시 시도 바랍니다.");
            fullpage_api.moveTo('intro');
        } catch (error) {
            console.error("오류 발생:", error);
            alert("서버에 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            hideLoading();
            submitButton.disabled = false;
        }
    };
}
