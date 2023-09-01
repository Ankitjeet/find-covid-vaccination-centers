const formattedDate = () => {
  const today = new Date();
  const formattedDate = `
                            ${today.getDate()}-
                            ${today.getMonth() + 1}-
                            ${today.getFullYear()}
                        `;

  return formattedDate;
};

export default formattedDate;
