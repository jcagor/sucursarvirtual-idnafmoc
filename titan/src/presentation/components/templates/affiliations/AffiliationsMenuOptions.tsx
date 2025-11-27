import { LinkCardInterface } from "lib";
import { Divider } from "presentation/components/atoms";
import { FiledInfoSection, LinkCard } from "presentation/components/molecules";
import { ZoneCard } from "presentation/components/organisms";

export const AffiliationsMenuOptions = () => {
  const menuItems: LinkCardInterface[] = [
    {
      href: "/my-affiliations/affiliations",
      name: "Gestión de titular y beneficiarios",
      urlImage: "/icons/extracts.png",
      width: 115,
      height: 110,
      imageClassname:
        "w-[4.548rem] h-[3.214rem] md:w-[4.548rem] md:h-[3.214rem] md:ml-6 mx-auto",
    },
    {
      href: "/my-affiliations/filed",
      name: "Mis Radicados",
      urlImage: "/icons/assignment-dates.png",
      width: 64,
      height: 64,
      imageClassname:
        "w-[4rem] h-[4rem] md:w-[4.5rem] md:h-[4.5rem] md:ml-6 mx-auto",
    },
  ];
  return (
    <div className=" w-full h-full p-4 gap-4">
      <FiledInfoSection
        mainTitle="Mis Afiliaciones"
        firstDescription="Aqui podras encontrar todo sobre tus afiliaciones y beneficiarios"
      />
      <Divider className="my-4 mb-8" />
      <div className="w-full pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
        {menuItems.map(
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
            prefetch,
          }) => {
            const CardComponent = externalLink ? ZoneCard : LinkCard;
            return (
              <CardComponent
                key={href}
                name={name}
                href={href}
                width={width}
                height={height}
                urlImage={urlImage}
                imageClassname={imageClassname}
                ellipseUrl={ellipseUrl}
                ellipseClassname={ellipseClassname}
                betaAccess={betaAccess}
                prefetch={prefetch}
              />
            );
          }
        )}
      </div>
    </div>
  );
};
