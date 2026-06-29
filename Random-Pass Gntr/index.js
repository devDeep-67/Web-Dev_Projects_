const btn1 = document.querySelector(".btn");
const inpt1 = document.getElementById("input");
const copyIcondata = document.querySelector(".fa-copy");
const alertContainer = document.querySelector(".alert-container");

// Generate Password
btn1.addEventListener("click", () => {
    createPassword();
});

// Copy Password
copyIcondata.addEventListener("click", () => {
    if (inpt1.value) {
        copyPassword();

        alertContainer.innerText = `${inpt1.value} Copied!`;
        alertContainer.classList.remove("active");

        setTimeout(() => {
            alertContainer.classList.add("active");
        }, 2000);
    }
});

function createPassword() {
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+?:{}[]";

    const passLength = 9;
    let password = "";

    for (let i = 0; i < passLength; i++) {
        const randomNum = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomNum);
    }

    inpt1.value = password;
}

function copyPassword() {
    inpt1.select();
    inpt1.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(inpt1.value)
        .then(() => {
            console.log("Password copied!");
        })
        .catch((err) => {
            console.error("Failed to copy:", err);
        });
}