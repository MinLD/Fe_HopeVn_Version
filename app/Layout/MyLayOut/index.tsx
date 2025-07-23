type Props = {
  children: React.ReactNode;
};
function MyLayout({ children }: Props) {
  // const menuProvider = useContext(MenuContext);
  // if (!menuProvider) return;
  // const { isWindowSize } = menuProvider;

  return (
    <div className="flex justify-center">
      <div className="mx-auto w-[92vw] lg:w-[75vw] xl:w-[65vw]">{children}</div>
    </div>
  );
}

export default MyLayout;
