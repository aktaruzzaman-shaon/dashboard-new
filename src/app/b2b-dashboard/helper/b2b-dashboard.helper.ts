export function formatDateToYYYYMMDD(dateString: any): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return String(`${year}-${month}-${day}`);
}
