import { format, isToday, isYesterday } from "date-fns";

/**
 * Hàm này nhận một chuỗi thời gian ISO và chuyển đổi nó thành một định dạng thân thiện.
 * Ví dụ:
 * - Nếu là hôm nay -> "08:22"
 * - Nếu là hôm qua -> "Hôm qua"
 * - Nếu là ngày khác -> "06/09/2025"
 * @param isoString - Chuỗi thời gian từ API (ví dụ: "2025-09-06T08:22:22.104308")
 * @returns Một chuỗi thời gian đã được định dạng.
 */
export function formatRelativeTime(
  isoString: string | null | undefined | Date
): string {
  if (!isoString) {
    return ""; // Trả về rỗng nếu không có dữ liệu
  }

  try {
    const date = new Date(isoString);

    if (isToday(date)) {
      // Nếu là ngày hôm nay, chỉ hiển thị giờ và phút
      return format(date, "HH:mm");
    }

    if (isYesterday(date)) {
      // Nếu là ngày hôm qua
      return "Hôm qua";
    }

    // Nếu là các ngày khác
    return format(date, "dd/MM/yyyy");
  } catch (error) {
    console.error("Invalid date string:", isoString, error);
    return "Ngày không hợp lệ";
  }
}

/**
 * Hàm này chỉ lấy giờ và phút.
 * @param isoString
 * @returns ví dụ: "08:22"
 */
export function formatJustTime(isoString: string | null | undefined): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    return format(date, "HH:mm");
  } catch (error) {
    console.error("Invalid date string:", isoString, error);
    return "Ngày không hợp lệ";
  }
}
