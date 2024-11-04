// Loading overlay functionality
export function showLoading() {
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

export function hideLoading() {
    const loadingDiv = document.getElementById("loading");
    if (loadingDiv) {
        loadingDiv.remove();
    }
}
