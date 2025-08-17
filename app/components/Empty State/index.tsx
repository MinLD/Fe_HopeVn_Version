type Props = {
  children: React.ReactNode;
  icons: React.ReactNode;
};
function EmptyState({ children, icons }: Props) {
  return (
    <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
      {children}
    </div>
  );
}

export default EmptyState;
