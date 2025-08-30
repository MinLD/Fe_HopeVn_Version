type Props = {
  children: React.ReactNode;
};
function MyLayout({ children }: Props) {
  return (
    <div className="flex justify-center">
      <div className="mx-auto w-[92vw] lg:w-[75vw] xl:w-[70vw] ">
        {children}
      </div>
    </div>
  );
}

export default MyLayout;
