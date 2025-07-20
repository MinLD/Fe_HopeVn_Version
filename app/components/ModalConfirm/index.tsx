type Props = {
  setClose: () => void;
  handle: () => void;
  message?: string;
};

function ModalConfirm({ setClose, handle, message = "người dùng" }: Props) {
  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-20 backdrop-blur-sm z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full h-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-800 ">
            Xác nhận xóa {message}
          </h2>
          <p
            className=" text-gray-600  break-all overflow-x-hidden max-w-full"
            style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
          >
            Bạn có chắc chắn muốn xóa {message} này?
          </p>
          <p
            className="mb-5 text-gray-600  break-all overflow-x-hidden max-w-full"
            style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
          >
            Hành động này không thể hoàn tác.
          </p>

          <div className="flex justify-end space-x-4">
            <button
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              onClick={setClose}
            >
              Hủy
            </button>
            <button
              className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              onClick={handle}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
