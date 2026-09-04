type HeaderProps = { title: string; tag?: `h${1 | 2}` };

const Header: React.FC<HeaderProps> = ({ title, tag = "h2" }) => {
  return (
    <header className="dark:prose-invert container mx-auto mb-10 prose flex w-full max-w-4xl flex-col items-center justify-center sm:mb-16">
      {tag === "h2" ? (
        <h2
          id="title"
          className="text-center text-4xl text-base-content capitalize md:text-5xl"
        >
          {title}
        </h2>
      ) : (
        <h1
          id="title"
          className="text-center text-5xl leading-tight text-base-content capitalize md:text-6xl"
        >
          {title}
        </h1>
      )}
    </header>
  );
};

export default Header;
