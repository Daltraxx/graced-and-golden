type FormInfo = {
   name: string, phoneNumber: string, email: string, birthday: string, instagram: string,
   occasion: string, howFound: string, tanHistory: string, desiredResults: string, 
   questionsConcerns: string
}

export default function generateEmailHtml(formInfo : FormInfo): string {
   if (!formInfo.questionsConcerns) formInfo.questionsConcerns = 'N/A';
   
   const html = `
      <h3>Name:</h3>
      <p>${formInfo.name}</p>
      <br>
      <h3>Phone Number:</h3>
      <p>${formInfo.phoneNumber}</p>
      <br>
      <h3>Email:</h3>
      <p>${formInfo.email}</p>
      <br>
      <h3>Birthday:</h3>
      <p>${formInfo.birthday}</p>
      <br>
      <h3>Instagram Handle:</h3>
      <p>${formInfo.instagram}</p>
      <br>
      <h3>What is the occasion and when is it?:</h3>
      <p>${formInfo.occasion}</p>
      <br>
      <h3>How did you find Graced and Golden?:</h3>
      <p>${formInfo.howFound}</p>
      <br>
      <h3>Have you had a spray tan before? If so, when was your last?:</h3>
      <p>${formInfo.tanHistory}</p>
      <br>
      <h3>What are your desired tanning results?:</h3>
      <p>${formInfo.desiredResults}</p>
      <br>
      <h3>List any questions/concerns:</h3>
      <p>${formInfo.questionsConcerns}</p>
   `;

   return html;
}