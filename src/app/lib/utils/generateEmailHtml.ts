type FormInfo = {
   name: string, phoneNumber: string, email: string, birthday: string, instagram: string,
   occasion: string, howFound: string, tanHistory: string, desiredResults: string, 
   questionsConcerns: string
}

export default function generateEmailHtml(formInfo : FormInfo): string {
   if (!formInfo.questionsConcerns) formInfo.questionsConcerns = 'N/A';
   
   let html = `
      <p>Name:</p>
      <p>${formInfo.name}</p>
      <br>
      <p>Phone Number:</p>
      <p>${formInfo.phoneNumber}</p>
      <br>
      <p>Email:</p>
      <p>${formInfo.email}</p>
      <br>
      <p>Birthday:</p>
      <p>${formInfo.birthday}</p>
      <br>
      <p>Instagram Handle:</p>
      <p>${formInfo.instagram}</p>
      <br>
      <p>What is the occasion and when is it?:</p>
      <p>${formInfo.occasion}</p>
      <br>
      <p>How did you find Graced and Golden?:</p>
      <p>${formInfo.howFound}</p>
      <br>
      <p>Have you had a spray tan before? If so, when was your last?:</p>
      <p>${formInfo.tanHistory}</p>
      <br>
      <p>What are your desired tanning results?:</p>
      <p>${formInfo.desiredResults}</p>
      <br>
      <p>List any questions/concerns:</p>
      <p>${formInfo.questionsConcerns}</p>
   `;

   return html;
}