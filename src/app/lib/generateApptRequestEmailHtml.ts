const generateApptRequestEmailHtml = (message: string) => {
  return `
    <!DOCTYPE html >
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Appointment Request</h2>
        <p>${message.replace(/[&<>"']/g, (match) => {
          const escapeMap: { [key: string]: string } = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          };
          return escapeMap[match];
        })}</p>
      </body>
    </html>
  `;
};

export default generateApptRequestEmailHtml;
