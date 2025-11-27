import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import { ModalTitle } from "./text/ModalTitle";
import { Button, LoadingSimpleAnimation, useAppSelector } from "presentation";
import useValidateTotp from "presentation/hooks/useValidateTotp";
import { useSession } from "next-auth/react";
import { MESSAGE_ERROR_VALIDATE_TOTP } from "lib";

interface Props {
  onSecondaryClick: () => void;
  onClose: () => void
}

const Modal2FA: FC<Props> = ({
  onSecondaryClick = () => {},
  onClose = () => {}
}) => {
  const [visible, setVisible] = useState(true);
  const [steps, setSteps] = useState(1);
  const [otp, setOtp] = useState('');
  const {
    fetchVerifyTotp, 
    newVerifyTotp
  } = useValidateTotp();
  const { data: session } = useSession();

  const verifyTotp = useAppSelector(
    (state) => state.validateTotp.verify
  );
  const loading = useAppSelector(
    (state) => state.validateTotp.loading
  );
  const messageError = useAppSelector(
    (state) => state.validateTotp.messageError
  );

  const validationTotp = () => {
    if (session?.access_token){
      fetchVerifyTotp(
        otp,
        session.access_token
      );
    }
  }

  const reValidationTotp = () => {
    newVerifyTotp();
    setOtp('');
  }

  const handleSecondaryClick = () => {
    onSecondaryClick();
    setVisible(false);
  };

  useEffect(() => {
    if(verifyTotp === null){
      setSteps(1); // Estado inicial para mostrar el modal o volver a intentar ingresar el codigo
    }
    else if (verifyTotp && verifyTotp !== null) {
      setSteps(2); // Se valida el estado si ya devolvio una respuesta y es true
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    } 
    else if(!verifyTotp && verifyTotp !== null) {
      setSteps(3); // Se valida el estado si ya devolvio una respuesta y es false
    }
  }, [verifyTotp, loading]);

  return(
    <>
      {visible && (
        <div className={`w-screen h-screen absolute top-0 left-0 z-[calc(90000)] flex 
          justify-center items-center bg-principal-800`}>
          <AnimatePresence>
            <motion.div
              key={"sucursalmodal"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className={`relative h-[70vh] w-[75%] md:w-[60%] rounded-[calc(20px)] shadow-lg flex flex-col items-center 
                bg-principal-150 subpixel-antialiased pl-6 pr-6 pb-6`}
              onClick={(e) => e.stopPropagation()}
            >
              {!verifyTotp && (
                <Image
                  src="/icons/close-icon-modal.svg"
                  alt="Close icon"
                  width={25}
                  height={25}
                  className={`absolute top-4 right-4 cursor-pointer`}
                  onClick={handleSecondaryClick}
                  priority
                />
              )}
              {loading && (
                <div className="h-full w-full flex justify-center items-center">
                  <LoadingSimpleAnimation/>
                </div>
              )}
              {(steps === 1 && !loading) && (
                <> 
                  <div className="absolute">
                    <Image
                      src={"/icons/verify-2fa.webp"}
                      alt="Modal 2FA Image"
                      width={124}
                      height={124}
                      className={`abosulte transform -translate-y-1/2 antialiased crisp-edges`}
                      draggable={false}
                      quality={100}
                      priority
                      unoptimized={true}
                    />
                  </div>          
                  <ModalTitle text="Verificación en dos pasos" className="mt-20"/>
                  <p className="text-principal-180 text-center">
                    Este paso extra nos indica que eres tú quién está intentando 
                    gestionar los servicios de Comfandi.
                  </p>
                  <p className="text-principal-180 font-semibold text-center mb-10">
                    Escribe la clave Dinámica de la App mi Comfandi
                  </p>
                  <div className="flex flex-col justify-between items-center h-full">
                    <div>
                      <p className="text-principal-350 text-center">
                        Digita tu Clave Dinámica
                      </p>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType="tel"
                        inputStyle={`w-[12%] md:w-[8%] h-[calc(48px)] outline-principal-180 border-1 border-[calc(1px)] 
                          text-center bg-principal-150 placeholder-principal-450 py-3 font-semibold rounded-[calc(5px)] 
                          mt-4 font-outfit text-[calc(15px)] text-principal-180`}
                        renderInput={(props)=>(
                          <input
                            {...props}
                          />
                        )}
                        shouldAutoFocus
                        containerStyle={"flex justify-center gap-x-3"}
                      />
                    </div>
                    {otp.length === 6
                      ? (
                        <Button
                          label="Verificar"
                          primary={true}
                          className="font-semibold"
                          onClick = {validationTotp}
                        />
                      )
                      : (
                        <Button
                          label="Verificar"
                          primary={false}
                          className="font-semibold"
                        />
                      )
                    }
                  </div>
                </>
              )}
              {(steps === 2 && !loading) && (
                <div className="h-full w-full flex flex-col justify-center items-center gap-2">
                  <Image
                    src={"/icons/success-2fa.webp"}
                    alt="Modal 2FA Image"
                    width={250}
                    height={250}
                    className={`antialiased crisp-edges`}
                    draggable={false}
                    quality={100}
                    priority
                    unoptimized={true}
                  />
                  <ModalTitle text="Tu verificación ha sido exitosa" className=""/>
                </div>
              )}
              {(steps === 3 && !loading) && (
                <div className="h-full w-full flex flex-col justify-around items-center">
                  <div className="w-full flex flex-col justify-center items-center gap-2">
                    <Image
                      src={"/icons/fail-2fa.webp"}
                      alt="Modal 2FA Image"
                      width={250}
                      height={250}
                      className={`antialiased crisp-edges`}
                      draggable={false}
                      quality={100}
                      priority
                      unoptimized={true}
                    />
                    <ModalTitle text="Lo sentimos, verificación fallida" className=""/>
                    {messageError !== MESSAGE_ERROR_VALIDATE_TOTP.alreadyUsed
                      ? <p className="text-center">
                          La clave dinámica ingresada es incorrecta.<br/>
                          Ingresa a la app e inténtalo nuevamente.
                        </p>
                      : <p className="text-center">
                          El código ingresado ya fue utilizado.<br/>
                          Por favor, espera a que la aplicación genere un nuevo código para volver a intentarlo.
                        </p>
                    }
                  </div>
                  <Button
                    label="Volver a verificar mi cuenta"
                    primary={true}
                    className="font-semibold"
                    onClick = {reValidationTotp}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default Modal2FA;