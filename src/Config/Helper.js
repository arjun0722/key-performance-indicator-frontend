import Swal from "sweetalert2";
export const show_error = (message) => {
  Swal.fire("Tasks Reports?", `${message}`, "question");
};
