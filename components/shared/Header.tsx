const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <>
      <h2 className="font-bold text-2xl">{title}</h2>
      {subtitle && <p className="my-2 leading-5 font-normal text-black/65 text-sm">{subtitle}</p>}
    </>
  );
};

export default Header;
