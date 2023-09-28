import Swal from "sweetalert2";
export const show_error = (message) => {
  Swal.fire(
    'Tasks Reports?',
    `${message}`,
    'question'
  )
};
export const show_error1 = (message) => {
  Swal.fire(
    '',
    `${message}`,
    'question'
  )
};

export const show_kpi_submit = (message) => {
  Swal.fire({
    title: "Success",
    text:  `${message}`,
    icon: "success",
    // confirmButtonText: "OK",
  })
};