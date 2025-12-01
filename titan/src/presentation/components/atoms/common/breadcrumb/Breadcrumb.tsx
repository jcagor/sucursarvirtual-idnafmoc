import Link from "next/link";

export const Breadcrumb = () => {
  return (
    <nav className="text-sm text-gray-500 mb-4 px-4">
      <ol className="flex gap-2">
        <li>
          <Link href="#" className="hover:underline text-[#003DA5]">
            Servicios Profesionales
          </Link>
        </li>

        <li>/</li>

        <li className="text-[#003DA5] font-semibold">
          Caracterización ALV
        </li>
      </ol>
    </nav>
  );
};
