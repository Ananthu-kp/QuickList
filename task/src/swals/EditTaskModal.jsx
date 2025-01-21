import Swal from "sweetalert2";
import toast from "react-hot-toast";

const EditTaskModal = async (task) => {
    const result = await Swal.fire({
        title: "Edit Task",
        input: "text",
        inputValue: task.text,
        showCancelButton: true,
        confirmButtonText: "Save",
    });

    if (result.isConfirmed) {
        const trimmedValue = result.value.trim(); 
        if (!trimmedValue) {
            toast.error("Task cannot be empty!"); 
            return null;
        }
        return trimmedValue;
    }
    return null; 
};

export default EditTaskModal;