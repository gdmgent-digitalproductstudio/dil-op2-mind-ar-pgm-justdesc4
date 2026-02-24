const scene = document.querySelector("a-scene");
const roarButton = document.getElementById("roarButton");
const toggleMaskButton = document.getElementById("toggleMaskButton");
const tigerSound = document.getElementById("tigerSound");
let maskVisible = true;

roarButton.style.display = "none";
toggleMaskButton.style.display = "none";

scene.addEventListener("targetFound", () => {
    roarButton.style.display = "block";
    toggleMaskButton.style.display = "block";
});

scene.addEventListener("targetLost", () => {
    roarButton.style.display = "none";
    toggleMaskButton.style.display = "none";
});

roarButton.addEventListener("click", () => {
    tigerSound.currentTime = 0;
    tigerSound.play();
});

// mask btn
toggleMaskButton.addEventListener("click", () => {
    const faceTarget = document.getElementById("faceTarget");
    const maskModel = faceTarget.querySelector("a-gltf-model");

    if (maskVisible) {
        maskModel.setAttribute("visible", "false");
        toggleMaskButton.textContent = "Show Mask";
    } else {
        maskModel.setAttribute("visible", "true");
        toggleMaskButton.textContent = "Hide Mask";
    }

    maskVisible = !maskVisible;
});
