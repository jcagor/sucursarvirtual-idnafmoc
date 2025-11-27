import Swal from "sweetalert2";

interface showActionAlertProps {
  title: string;
  content: string;
  titleButton?: string;
  action: () => void;
}

export const showActionAlert = async ({
  title,
  content,
  titleButton = "Aceptar",
  action,
}: showActionAlertProps) => {
  Swal.fire({
    title: title,
    imageUrl: "icons/red-and-white-megaphone.png",
    imageWidth: 100,
    imageHeight: 120,
    width: 650,
    heightAuto: true,
    html: content,
    confirmButtonText: titleButton,
    allowOutsideClick: false,

    customClass: {
      actions: " w-[80%]",
      image: "relative ",
      popup: " px-[2%] py-[%] font-poppins",
      title: "text-md",
      confirmButton:
        "w-[80%] bg-principal-700 text-white text-lg py-2 px-10 rounded-full",
    },
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `,
    },
    hideClass: {
      popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
    },
  }).then(() => {
    action();
  });
};

export const showLoadingAlert = async (title: string, content: string) => {
  const swalInstance = Swal.fire({
    title: title,
    imageUrl: "/icons/icon_card.svg",
    imageWidth: 200,
    imageHeight: 200,
    text: content,
    didOpen: () => {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      actions: "w-[80%]",
      image: "",
      popup: "px-[2%] py-[2%] font-poppins",
      title: "text-md ",
      confirmButton:
        "w-[80%] bg-principal-700 text-white text-lg py-2 px-10 rounded-full",
    },
  });

  return swalInstance; // Solo devolver la instancia de la alerta
};
