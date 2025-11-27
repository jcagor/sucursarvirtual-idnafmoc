import { jobVacancyMenuItems } from "lib";
import { Greatment, SectionSeparator } from "presentation/components/atoms";
import { LinkDescriptionCard } from "presentation/components/molecules";
import { HeaderNotificationCard } from "presentation/components/molecules/common/notification";

export const JobVacanciesTemplate = () =>{

    return(
        <div className="block mr-[64px]">
          <HeaderNotificationCard 
            startText="¡Publica tus vacantes y encuentra el talento ideal con Comfandi!"
            middleBoldText=""
            endText=""
          />

          <Greatment text={`Bienvenid@ 👋`} className="mb-2 md:mb-7 md:-mt-3" />
          

          <SectionSeparator />

          <div className="w-full p-5 "></div>

          {/* Menú de acciones */}
          <div className="w-full pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
            {jobVacancyMenuItems.map(
              ({
                href,
                name,
                width,
                height,
                urlImage,
                imageClassname,
                ellipseUrl,
                ellipseClassname,
                externalLink,
                betaAccess,
                description,
                canAccess,
              }, idx) => {
                return (
                    <LinkDescriptionCard
                      key={"mjc-" + idx++}
                      name={name}
                      href={href}
                      urlImage={urlImage}
                      externalLink={externalLink}
                      width={width}
                      height={height}
                      imageClassname={imageClassname}
                      betaAccess={betaAccess}
                      description={description}
                      canAccess={canAccess}
                    />
                  );
              }
            )}
          </div>          
        </div>
    );
}