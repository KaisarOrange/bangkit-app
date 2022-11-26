const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const month = (n) => {
  return monthNames[n - 1];
};

export default month;
