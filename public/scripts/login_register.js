async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}

async function createUser() {
    loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
    console.log("login or create")
    const email = document.querySelector('#email')?.value
    const password = document.querySelector('#password')?.value

    if (email === "" || password === "") {
        return
    }

    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    const body = await response.json();

    if (response?.status === 200) {
        localStorage.setItem('email', email);
        // window.location.href = '
        window.location.href = "../../index.html"
    } else {
        // TODO: HANDLE LOGIN OR REGISTER ERROR
        console.log(body.msg)
        const errorMessage = document.querySelector('#error-message')
        errorMessage.innerHTML = `<h1 class="text-white mt-8 ">${body.msg}</h1>`
    }
}