export function convertDate(
  inputDate: string,
  outputFormat: 'DD/MM/YYYY' | 'YYYY-MM-DD',
): string {
  let day: string, month: string, year: string;

  if (inputDate.includes('/')) {
    [day, month, year] = inputDate.split('/');
  } else if (inputDate.includes('-')) {
    [year, month, day] = inputDate.split('-');
  } else {
    return '';
  }

  if (outputFormat === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`;
  } else if (outputFormat === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else {
    return '';
  }
}
