import Image from "next/image";

type Props = {
  name: string;
  url?: string;
  width?: string;
  height?: string;
};
function AvatarProfile({ name, url, width = "10", height = "10" }: Props) {
  const generateAvatar = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  return (
    <div
      className={`flex items-center justify-center w-${width}  h-${height} bg-[#dcfce7] rounded-full `}
    >
      {url && url ? (
        <Image
          src={url || ""}
          alt={name}
          width={100}
          height={100}
          className="w-full h-full rounded-full"
        />
      ) : (
        <span className="font-medium text-[#16a34a] ">
          {generateAvatar(name)}
        </span>
      )}
    </div>
  );
}

export default AvatarProfile;
