import { FiExternalLink } from "react-icons/fi";
import { ImWikipedia } from "react-icons/im";
import { TbBrandTwitter } from "react-icons/tb";

type SocialLinksProps = {
  twitter?: string;
  name: string;
  website: string;
  wikipedia: string;
};

const SocialLinks: React.FC<SocialLinksProps> = ({
  twitter,
  name,
  website,
  wikipedia,
}) => {
  return (
    <ul className="mx-0 flex list-none gap-4 p-0">
      {twitter && (
        <li className="m-0 rounded-full bg-gray-100 p-0 shadow-inner ring-blue-500 focus-within:ring-2 hover:ring-2  focus:outline-none focus:ring-2 dark:bg-gray-900">
          <a
            href={twitter}
            className="rounded-full text-gray-900 hover:outline-none focus:outline-none dark:text-gray-100"
          >
            <TbBrandTwitter
              title={`${name} twitter account`}
              className="h-8 w-8 p-2"
            />
          </a>
        </li>
      )}
      <li className="m-0 rounded-full bg-gray-100 p-0 shadow-inner ring-blue-500 focus-within:ring-2 hover:outline-none hover:ring-2 focus:outline-none focus:ring-2 dark:bg-gray-900">
        <a
          href={wikipedia}
          className="rounded-full text-gray-900 hover:outline-none focus:outline-none dark:text-gray-100"
        >
          <ImWikipedia
            title={`${name} wikipedia article`}
            className="h-8 w-8 p-2"
          />
        </a>
      </li>
      <li className="m-0 rounded-full bg-gray-100 p-0 shadow-inner ring-blue-500 focus-within:ring-2 hover:outline-none hover:ring-2 focus:outline-none focus:ring-2 dark:bg-gray-900">
        <a
          href={website}
          className="rounded-full text-gray-900 hover:outline-none focus:outline-none dark:text-gray-100"
        >
          <FiExternalLink title={name} className="h-8 w-8 p-2" />
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;
