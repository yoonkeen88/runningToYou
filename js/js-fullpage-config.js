// Fullpage.js configuration
export function initFullpage() {
    new fullpage('#fullpage', {
        anchors: ['intro', 'email-input', 'project-details', 'helper-intro', 'helper-support', 'company-info'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['홈', '이메일 신청', '프로젝트 목차', '프로젝트 소개', '지원 내용', '회사 정보'],
        showActiveTooltip: true,
        scrollingSpeed: 600,
        fitToSection: true,
        scrollBar: false,
        touchSensitivity: 5,
        normalScrollElementTouchThreshold: 3,
        scrollOverflow: true,
        scrollOverflowOptions: {
            scrollbars: false,
        },
        
        onLeave: function(origin, destination, direction) {
            if (fullpage_api.getActiveSection().isMoving) {
                return false;
            }
            return true;
        },
        
        responsiveWidth: 768,
        afterResponsive: function(isResponsive) {
            if (isResponsive) {
                fullpage_api.setAutoScrolling(true);
                fullpage_api.setFitToSection(true);
            }
        }
    });

    // Initialize apply button
    document.getElementById("applyButton").onclick = function() {
        fullpage_api.moveTo('email-input');
    };
}
