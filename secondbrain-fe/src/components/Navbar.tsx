const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-center items-center gap-2 p-4">
        <img className="h-12 text-white" src="logo_white.png" alt="logo" />
        <h1 className="font-poppins text-2xl text-white font-bold">
          Second Brain
        </h1>
      </div>

      <div className="m-4">
        <a href="https://github.com/aniketkadale/secondbrain-v1" target="_blank">
          <img className="h-10" src="/github-mark.png" alt="Github" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
