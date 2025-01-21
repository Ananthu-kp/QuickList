import Swal from "sweetalert2";

export const confirmDelete = async (message = "This task will be permanently deleted!") => {
  return Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });
};

export const confirmDeleteAll = async () => {
  return Swal.fire({
    title: "Delete all completed tasks?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete all!",
  });
};
