export const showToast = (toast: any, message: string, type: string, placement?: string) => {
    toast.show(message, {
        type: type,
        placement: placement || "top",
        duration: 4000,
        animationType: "zoom-in",
    });
}