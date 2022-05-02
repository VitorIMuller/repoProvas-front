import Swal from "sweetalert2";


export function successModal(message) {

    Swal.fire({
        icon: "success",
        html: `<h1 style = 'color: black'>${message}</h1>`,
        timer: 2000,
        background: `#ffffff`,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'center',
    });
}