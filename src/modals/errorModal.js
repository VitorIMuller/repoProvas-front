import Swal from "sweetalert2";


export function errorModal(message) {

    Swal.fire({
        html: `<h1 style = 'color: #ffffff' }'>${message}</h1>`,
        timer: 2000,
        background: `'#ffffff'`,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'center',
    });
}