export default function generateEmailHtml
(
   name: string, phoneNumber: string, email: string, birthday: string, instagram: string,
   occasion: string, howFound: string, tanHistory: string, desiredResults: string, 
   questionsConcerns: string
): string {
   if (!questionsConcerns) questionsConcerns = 'N/A';
   
   let html = `
      <p>Name:</p>
      <p>${name}</p>
      <br>
      <p>Phone Number:</p>
      <p>${phoneNumber}</p>
      <br>
      <p>Email:</p>
      <p>${email}</p>
      <br>
      <p>Birthday:</p>
      <p>${birthday}</p>
      <br>
      <p>Instagram Handle:</p>
      <p>${instagram}</p>
      <br>
      <p>What is the occasion and when is it?:</p>
      <p>${occasion}</p>
      <br>
      <p>How did you find Graced and Golden?:</p>
      <p>${howFound}</p>
      <br>
      <p>Have you had a spray tan before? If so, when was your last?:</p>
      <p>${tanHistory}</p>
      <br>
      <p>What are your desired tanning results?:</p>
      <p>${desiredResults}</p>
      <br>
      <p>List any questions/concerns:</p>
      <p>${questionsConcerns}</p>
   `;

   return html;
}