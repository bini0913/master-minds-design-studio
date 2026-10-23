export const BOOK_UPLOAD_LIMIT = 50 * 1024 * 1024;
export function validateBookFile(size: number, name: string) {
 if (size > BOOK_UPLOAD_LIMIT) return "Choose a file no larger than 50 MB.";
 if (!/\.(pdf|txt)$/i.test(name)) return "Choose a PDF or text file.";
 return "";
}
