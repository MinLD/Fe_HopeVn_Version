type Props = {
  children: React.ReactNode;
  Icons: React.ElementType;
};
function EmptyState({ children, Icons }: Props) {
  return (
    <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
      <Icons
        size={80}
        color="#10B981"
        strokeWidth={1.5}
        className="mb-4 text-emerald-500"
      />
      {children}
    </div>
  );
}

export default EmptyState;
