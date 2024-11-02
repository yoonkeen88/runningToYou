// 섹션 요소 선택
const sections = document.querySelectorAll("section");

let currentPage = 0;
let isAnimating = false;

function applyFrictionScroll(event) {
    if (isAnimating) return; // 애니메이션 중이라면 다른 이벤트 무시

    const delta = event.deltaY;
    const threshold = 100; // 스크롤 감도

    // 스크롤 방향에 따라 페이지 전환
    if (delta > threshold && currentPage === 0) {
        currentPage = 1;
        scrollToPage(currentPage);
    } else if (delta < -threshold && currentPage === 1) {
        currentPage = 0;
        scrollToPage(currentPage);
    }
}

function scrollToPage(pageIndex) {
    isAnimating = true;

    // 애플 같은 마찰력 있는 스크롤 애니메이션 적용
    gsap.to(window, {
        scrollTo: { y: pageIndex * innerHeight, autoKill: false },
        ease: "power4.out", // 부드러운 마찰감
        onComplete: () => {
            isAnimating = false;
        }
    });
}

// 스크롤 이벤트에 적용
window.addEventListener("wheel", applyFrictionScroll);
