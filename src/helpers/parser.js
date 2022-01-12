export const dateFormaterYYYYMMDD = (date) => {
  if (date) {
    const fechaD = date.split("T")[0].split("-");
    const fechaYYYYMMDD = `${fechaD[0]}-${fechaD[1]}-${fechaD[2]}`;
    return fechaYYYYMMDD;
  }
  return date;
};
