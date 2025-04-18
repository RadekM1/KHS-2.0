import { FaFacebook, FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export const ContactInFooter = () => (
  <div className="text-sm">
    <div className="mb-5 flex items-center gap-3">
      <IoLocationSharp className="h-8 w-8 text-gray-600" />
      <div>
        <p>Klub horských sportů Zlín, z.s.</p>
        <p>Hradská 854</p>
        <p>760 01 Zlín</p>
      </div>
    </div>

    <hr className="w-2/3 border-gray-300 dark:border-gray-500 my-4" />

    <div className="mb-4 flex items-center gap-3">
      <MdEmail className="h-8 w-8 text-gray-600" />
      <p>info@khszlin.com</p>
    </div>

    <hr className="w-2/3 border-gray-300 dark:border-gray-500 my-4" />

    <div className="mb-4">
      <div className="flex items-center gap-3">
        <FaPhone className="h-7 w-7 text-gray-600" />
        <div>
          <p>Předseda – Mirek Ingr: 737 741 740</p>
          <p>Místopředseda – Filip Kotopulos: 606 647 037</p>
        </div>
      </div>
    </div>

    <hr className="w-2/3 border-gray-300 dark:border-gray-500 my-4" />

    <div className="mb-4">
      <p>IČO: 65823494</p>
      <p>Číslo účtu: 6683137002/5500</p>
      <p>Jsme neplátci DPH.</p>
    </div>

    <hr className="w-2/3 border-gray-300 dark:border-gray-500 my-4" />

    <div className="flex justify-start">
      <a
        aria-label="facebook link"
        href="https://www.facebook.com/khszlin/?locale=cs_CZ"
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebook className="h-8 w-8 text-gray-600" />
      </a>
    </div>
  </div>
);
